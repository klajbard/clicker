import { proxy, useSnapshot } from "valtio";

import config, { PRODUCER_POW } from "../config";
import { IProducerItem, UpgradeType } from "../types";
import { roundToDecimal } from "../utils/calculate";

import { IStore, IStoreRead } from "./types";

const state = proxy<IStore>({
  count: 0,
  clickDps: 1,
  producerDps: 0,
  producers: [],
  sumPurchases: 0,
  upgrades: [],
});

// Core logic behind calculating the various dps for both clicking and producers
const calculateDps = () => {
  // Reset dps values
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

  // Calculate summarized DPS
  state.producers.forEach((producer) => {
    state.producerDps += producer.dps * producer.count;
  });

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

  state.clickDps = roundToDecimal(
    state.clickDps * clickMultiplier + state.producerDps * allMultiplier,
    0
  );
};

export const storeActions = {
  init() {
    const localState = localStorage.getItem("game");
    if (localState) {
      const localStateObj = JSON.parse(atob(localState)) as IStoreRead;
      let sumPurchases = 0;
      state.count = localStateObj.count;
      state.producers = localStateObj.producers;
      state.upgrades = localStateObj.upgrades;
      // Sum of geometric series
      // https://en.wikipedia.org/wiki/Geometric_series
      localStateObj.producers.forEach((producer) => {
        sumPurchases +=
          (1 - Math.pow(PRODUCER_POW, producer.count)) / (1 - PRODUCER_POW);
      });

      localStateObj.upgrades.forEach((upgrade) => {
        sumPurchases +=
          config.upgrades.find((configUpgrade) => configUpgrade.id === upgrade)
            ?.price || 0;
      });

      state.sumPurchases = Math.floor(sumPurchases);
    }
    calculateDps();
  },
  update() {
    state.count = roundToDecimal(state.count + 0.1 * state.producerDps);
  },
  saveProgress() {
    console.log("Saving progress...");
    const stateToSave: IStoreRead = {
      count: state.count,
      producers: state.producers,
      upgrades: state.upgrades,
    };
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
  },
  increaseDPS(dps: number) {
    state.producerDps += dps;
  },
  addUpgrade(upgrade: string, price: number) {
    if (state.upgrades.indexOf(upgrade) === -1) {
      state.upgrades.push(upgrade);
      state.sumPurchases += price;
    }
    calculateDps();
  },
  hasUpgrade(id: string) {
    return state.upgrades.indexOf(id) !== -1;
  },
  hasProducer(id: string) {
    return state.producers.find((producer) => producer.id === id);
  },
  increaseProducer(producer: IProducerItem, price: number) {
    const matchedProducer = state.producers.find(
      (_producer) => _producer.id === producer.id
    );
    if (matchedProducer) {
      matchedProducer.count += 1;
    } else {
      state.producers.push({
        id: producer.id,
        count: 1,
        dps: producer.produce,
      });
    }
    state.sumPurchases += price;
    calculateDps();
  },
};

export const useProgress = () => useSnapshot(state);
