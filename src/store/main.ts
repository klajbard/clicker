import { proxy, useSnapshot } from "valtio";

import config, { PRESTIGE_BASE, PRODUCER_POW } from "../config";
import { BulkBuyOption, IProducerItem, UpgradeType } from "../types";
import { roundToDecimal } from "../utils/calculate";

import { ISettings, IStore, IStoreRead } from "./types";

const defaultSettings: ISettings = {
  floatingNumbers: true,
  autoSave: true,
  notation: "suffix",
  particleEffects: true,
};

const defaultStatistics = {
  totalClicks: 0,
  totalEarned: 0,
  totalSpent: 0,
  totalPrestiges: 0,
  highestRunEarnings: 0,
  currentRunEarnings: 0,
  timePlayed: 0,
  currentRunStart: Date.now(),
};

const state = proxy<IStore>({
  count: 0,
  clickDps: 1,
  producerDps: 0,
  producers: [],
  sumPurchases: 0,
  upgrades: [],
  achievements: [],
  statistics: { ...defaultStatistics },
  prestige: {
    diamonds: 0,
    totalDiamonds: 0,
    upgrades: {},
  },
  settings: { ...defaultSettings },
  lastSaveTime: Date.now(),
  activeBoost: null,
});

// Get prestige multiplier for a specific upgrade
const getPrestigeBonus = (upgradeId: string): number => {
  const level = state.prestige.upgrades[upgradeId] || 0;
  if (level === 0) return 0;
  const upgrade = config.prestigeUpgrades.find((u) => u.id === upgradeId);
  if (!upgrade) return 0;
  return upgrade.effect * level;
};

// Core logic behind calculating the various dps for both clicking and producers
const calculateDps = () => {
  state.clickDps = 1;
  state.producerDps = 0;

  // Set all producer values to the base produce amount
  state.producers.forEach((producer) => {
    const matchedProducer = config.producers.find(
      (producerItem) => producerItem.id === producer.id
    );
    if (matchedProducer) {
      producer.dps = matchedProducer.produce;
    }
  });

  // Apply all producer based upgrades to update DPS
  state.upgrades.forEach((upgrade) => {
    const matchedUpgrade = config.upgrades.find(({ id }) => upgrade === id);
    if (matchedUpgrade?.type === UpgradeType.PRODUCER) {
      const matchedProducer = state.producers.find(
        (producer) => producer.id === matchedUpgrade.producerID
      );
      if (matchedProducer) {
        matchedProducer.dps = matchedProducer.dps * matchedUpgrade.multiply;
      }
    }
  });

  // Apply ALL-type upgrades multiplier
  let allTypeMultiplier = 1;
  state.upgrades.forEach((upgrade) => {
    const matchedUpgrade = config.upgrades.find(({ id }) => upgrade === id);
    if (matchedUpgrade?.type === UpgradeType.ALL) {
      allTypeMultiplier *= matchedUpgrade.multiply;
    }
  });

  // Calculate summarized DPS
  state.producers.forEach((producer) => {
    state.producerDps += producer.dps * producer.count;
  });

  // Apply ALL multiplier to producer DPS
  state.producerDps *= allTypeMultiplier;

  // Apply prestige production bonus
  const productionBonus = getPrestigeBonus("prestige_prod");
  if (productionBonus > 0) {
    state.producerDps = Math.floor(state.producerDps * (1 + productionBonus));
  }

  // Apply achievement bonus
  const achievementBonus = state.achievements.reduce((total, achId) => {
    const ach = config.achievements.find((a) => a.id === achId);
    return total + (ach?.reward || 0);
  }, 0);
  if (achievementBonus > 0) {
    state.producerDps = Math.floor(state.producerDps * (1 + achievementBonus));
  }

  let allMultiplier = 0;
  let clickMultiplier = 1;

  // Calculate click DPS
  state.upgrades.forEach((upgrade) => {
    const matchedUpgrade = config.upgrades.find(({ id }) => upgrade === id);
    switch (matchedUpgrade?.type) {
      case UpgradeType.CLICK:
        clickMultiplier *= matchedUpgrade.multiply;
        break;
      case UpgradeType.PROD2CLICK:
        allMultiplier += matchedUpgrade.multiply;
        break;
    }
  });

  // Apply prestige click bonus
  const clickBonus = getPrestigeBonus("prestige_click");
  if (clickBonus > 0) {
    clickMultiplier *= 1 + clickBonus;
  }

  state.clickDps = roundToDecimal(
    state.clickDps * clickMultiplier + state.producerDps * allMultiplier,
    0
  );
};

// Get effective click damage including active boosts
const getEffectiveClickDps = (): number => {
  let dps = state.clickDps;
  if (
    state.activeBoost &&
    state.activeBoost.type === "clickFrenzy" &&
    Date.now() < state.activeBoost.endsAt
  ) {
    dps *= state.activeBoost.multiplier;
  }
  return Math.floor(dps);
};

// Get effective producer DPS including active boosts
const getEffectiveProducerDps = (): number => {
  let dps = state.producerDps;
  if (
    state.activeBoost &&
    state.activeBoost.type === "multiplier" &&
    Date.now() < state.activeBoost.endsAt
  ) {
    dps *= state.activeBoost.multiplier;
  }
  return dps;
};

// Calculate the cost discount from prestige
const getCostDiscount = (): number => {
  return 1 - getPrestigeBonus("prestige_cost");
};

// Calculate price for a producer at a given count
const getProducerPrice = (
  basePrice: number,
  currentCount: number,
  amount = 1
): number => {
  const discount = getCostDiscount();
  if (amount === 1) {
    return Math.floor(
      basePrice * Math.pow(PRODUCER_POW, currentCount) * discount
    );
  }
  // Geometric series sum for bulk buy
  const rate = PRODUCER_POW;
  const total =
    basePrice *
    Math.pow(rate, currentCount) *
    ((Math.pow(rate, amount) - 1) / (rate - 1));
  return Math.floor(total * discount);
};

// Calculate max affordable units
const getMaxAffordable = (basePrice: number, currentCount: number): number => {
  const discount = getCostDiscount();
  const rate = PRODUCER_POW;
  const adjustedBase = basePrice * discount;
  const n = Math.floor(
    Math.log(
      (state.count * (rate - 1)) /
        (adjustedBase * Math.pow(rate, currentCount)) +
        1
    ) / Math.log(rate)
  );
  return Math.max(0, n);
};

// Check achievements
const checkAchievements = () => {
  config.achievements.forEach((ach) => {
    if (state.achievements.includes(ach.id)) return;

    const { type, target, producerId } = ach.condition;
    let met = false;

    switch (type) {
      case "totalClicks":
        met = state.statistics.totalClicks >= target;
        break;
      case "totalEarned":
        met = state.statistics.totalEarned >= target;
        break;
      case "producerCount":
        if (producerId) {
          const p = state.producers.find((pr) => pr.id === producerId);
          met = (p?.count || 0) >= target;
        }
        break;
      case "producerOwned":
        met = state.producers.reduce((sum, p) => sum + p.count, 0) >= target;
        break;
      case "upgradeCount":
        met = state.upgrades.length >= target;
        break;
      case "prestigeCount":
        met = state.statistics.totalPrestiges >= target;
        break;
      case "clickDps":
        met = state.clickDps >= target;
        break;
      case "producerDps":
        met = state.producerDps >= target;
        break;
    }

    if (met) {
      state.achievements.push(ach.id);
      // Recalculate DPS since achievement bonuses affect production
      calculateDps();
      // Dispatch event for toast notification
      window.dispatchEvent(
        new CustomEvent("achievement-unlocked", {
          detail: { name: ach.name, icon: ach.icon },
        })
      );
    }
  });
};

// Calculate prestige diamonds to be earned
const calculatePrestigeDiamonds = (): number => {
  return Math.floor(
    Math.sqrt(state.statistics.currentRunEarnings / PRESTIGE_BASE)
  );
};

export const storeActions = {
  init() {
    const localState = localStorage.getItem("game");
    if (localState) {
      try {
        const localStateObj = JSON.parse(
          atob(localState)
        ) as Partial<IStoreRead>;
        let sumPurchases = 0;
        state.count = localStateObj.count || 0;
        state.producers = localStateObj.producers || [];
        state.upgrades = localStateObj.upgrades || [];
        state.achievements = localStateObj.achievements || [];
        state.statistics = {
          ...defaultStatistics,
          ...(localStateObj.statistics || {}),
        };
        state.prestige = {
          diamonds: 0,
          totalDiamonds: 0,
          upgrades: {},
          ...(localStateObj.prestige || {}),
        };
        state.settings = {
          ...defaultSettings,
          ...(localStateObj.settings || {}),
        };
        state.lastSaveTime = localStateObj.lastSaveTime || Date.now();

        // Sum of geometric series
        localStateObj.producers?.forEach((producer) => {
          sumPurchases +=
            (1 - Math.pow(PRODUCER_POW, producer.count)) / (1 - PRODUCER_POW);
        });

        localStateObj.upgrades?.forEach((upgrade) => {
          sumPurchases +=
            config.upgrades.find(
              (configUpgrade) => configUpgrade.id === upgrade
            )?.price || 0;
        });

        state.sumPurchases = Math.floor(sumPurchases);
      } catch {
        console.warn("Failed to load save, starting fresh.");
      }
    }
    calculateDps();
    checkAchievements();
  },

  update() {
    const effectiveDps = getEffectiveProducerDps();
    const gained = 0.1 * effectiveDps;
    state.count = roundToDecimal(state.count + gained);
    state.statistics.totalEarned += gained;
    state.statistics.currentRunEarnings += gained;

    // Clear expired boosts
    if (state.activeBoost && Date.now() >= state.activeBoost.endsAt) {
      state.activeBoost = null;
    }
  },

  saveProgress() {
    const stateToSave: IStoreRead = {
      count: state.count,
      producers: state.producers,
      upgrades: state.upgrades,
      achievements: state.achievements,
      statistics: state.statistics,
      prestige: state.prestige,
      settings: state.settings,
      lastSaveTime: Date.now(),
    };
    state.lastSaveTime = stateToSave.lastSaveTime;
    localStorage.setItem("game", btoa(JSON.stringify(stateToSave)));
  },

  updateCount(count: number) {
    state.count = count;
    storeActions.updateWindowTitle();
  },

  updateWindowTitle() {
    window.document.title = `${roundToDecimal(state.count)} points`;
  },

  addCount(count: number) {
    state.count = roundToDecimal(state.count + count);
    if (count > 0) {
      state.statistics.totalEarned += count;
      state.statistics.currentRunEarnings += count;
    }
  },

  handleClick() {
    const dmg = getEffectiveClickDps();
    storeActions.addCount(dmg);
    state.statistics.totalClicks += 1;
    // Check achievements periodically (every 10 clicks)
    if (state.statistics.totalClicks % 10 === 0) {
      checkAchievements();
    }
    return dmg;
  },

  addUpgrade(upgrade: string, price: number) {
    if (state.upgrades.indexOf(upgrade) === -1) {
      state.upgrades.push(upgrade);
      state.sumPurchases += price;
      state.statistics.totalSpent += price;
    }
    calculateDps();
    checkAchievements();
  },

  hasUpgrade(id: string) {
    return state.upgrades.indexOf(id) !== -1;
  },

  hasProducer(id: string) {
    return state.producers.find((producer) => producer.id === id);
  },

  increaseProducer(
    producer: IProducerItem,
    amount = 1,
    totalPrice: number
  ) {
    const matchedProducer = state.producers.find(
      (_producer) => _producer.id === producer.id
    );
    if (matchedProducer) {
      matchedProducer.count += amount;
    } else {
      state.producers.push({
        id: producer.id,
        count: amount,
        dps: producer.produce,
      });
    }
    state.sumPurchases += totalPrice;
    state.statistics.totalSpent += totalPrice;
    calculateDps();
    checkAchievements();
  },

  buyProducer(producer: IProducerItem, bulkOption: BulkBuyOption) {
    const currentCount =
      state.producers.find((p) => p.id === producer.id)?.count || 0;
    let amount: number;

    if (bulkOption === "max") {
      amount = getMaxAffordable(producer.basePrice, currentCount);
    } else {
      amount = bulkOption;
    }

    if (amount <= 0) return;

    const totalPrice = getProducerPrice(
      producer.basePrice,
      currentCount,
      amount
    );
    if (state.count < totalPrice) return;

    storeActions.addCount(-totalPrice);
    storeActions.increaseProducer(producer, amount, totalPrice);
  },

  getProducerPrice,
  getMaxAffordable,
  getEffectiveClickDps,
  getEffectiveProducerDps,
  getCostDiscount,

  // Prestige system
  calculatePrestigeDiamonds,

  performPrestige() {
    const diamonds = calculatePrestigeDiamonds();
    if (diamonds <= 0) return false;

    state.prestige.diamonds += diamonds;
    state.prestige.totalDiamonds += diamonds;

    // Track highest run
    if (
      state.statistics.currentRunEarnings > state.statistics.highestRunEarnings
    ) {
      state.statistics.highestRunEarnings = state.statistics.currentRunEarnings;
    }
    state.statistics.totalPrestiges += 1;
    state.statistics.currentRunEarnings = 0;
    state.statistics.currentRunStart = Date.now();

    // Reset game state (keep prestige, achievements, settings, stats)
    const startBonus = getPrestigeBonus("prestige_start");
    const startBonusLevel = state.prestige.upgrades["prestige_start"] || 0;
    state.count = startBonusLevel > 0 ? 1000 * startBonusLevel : 0;
    state.producers = [];
    state.upgrades = [];
    state.sumPurchases = 0;

    calculateDps();
    checkAchievements();
    storeActions.saveProgress();
    return true;
  },

  buyPrestigeUpgrade(upgradeId: string) {
    const upgrade = config.prestigeUpgrades.find((u) => u.id === upgradeId);
    if (!upgrade) return false;

    const currentLevel = state.prestige.upgrades[upgradeId] || 0;
    if (currentLevel >= upgrade.maxLevel) return false;

    const cost = Math.floor(
      upgrade.baseCost * Math.pow(upgrade.costScale, currentLevel)
    );
    if (state.prestige.diamonds < cost) return false;

    state.prestige.diamonds -= cost;
    state.prestige.upgrades[upgradeId] = currentLevel + 1;
    calculateDps();
    return true;
  },

  // Golden cookie / active boost
  activateBoost(type: string, multiplier: number, duration: number) {
    if (type === "instantPoints") {
      const instant = state.producerDps * multiplier;
      storeActions.addCount(instant);
      return;
    }
    state.activeBoost = {
      type,
      multiplier,
      endsAt: Date.now() + duration * 1000,
    };
  },

  // Offline progress
  calculateOfflineProgress(): { elapsed: number; earned: number } {
    const now = Date.now();
    const elapsed = (now - state.lastSaveTime) / 1000;
    if (elapsed < 60) return { elapsed: 0, earned: 0 }; // minimum 1 minute

    const maxOfflineSeconds = 8 * 60 * 60; // 8 hours cap
    const effectiveElapsed = Math.min(elapsed, maxOfflineSeconds);

    // 50% efficiency + prestige offline bonus
    const offlineBonus = getPrestigeBonus("prestige_offline");
    const efficiency = 0.5 + offlineBonus;
    const earned = Math.floor(
      state.producerDps * effectiveElapsed * efficiency
    );

    return { elapsed: effectiveElapsed, earned };
  },

  applyOfflineProgress(earned: number) {
    storeActions.addCount(earned);
  },

  // Settings
  updateSetting<K extends keyof ISettings>(key: K, value: ISettings[K]) {
    state.settings[key] = value;
  },

  // Export / import
  exportSave(): string {
    storeActions.saveProgress();
    return localStorage.getItem("game") || "";
  },

  importSave(data: string): boolean {
    try {
      JSON.parse(atob(data));
      localStorage.setItem("game", data);
      storeActions.init();
      return true;
    } catch {
      return false;
    }
  },

  resetGame() {
    localStorage.removeItem("game");
    state.count = 0;
    state.clickDps = 1;
    state.producerDps = 0;
    state.producers = [];
    state.sumPurchases = 0;
    state.upgrades = [];
    state.achievements = [];
    state.statistics = { ...defaultStatistics };
    state.prestige = { diamonds: 0, totalDiamonds: 0, upgrades: {} };
    state.settings = { ...defaultSettings };
    state.lastSaveTime = Date.now();
    state.activeBoost = null;
    calculateDps();
  },

  checkAchievements,

  // For tracking time played
  tickTimePlayed() {
    state.statistics.timePlayed += 1;
  },
};

export const useProgress = () => useSnapshot(state);
