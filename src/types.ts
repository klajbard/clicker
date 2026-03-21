export enum UpgradeType {
  CLICK = "click",
  PRODUCER = "producer",
  PROD2CLICK = "prod2click",
  ALL = "all",
}

export enum Tab {
  PRODUCERS = "producers",
  UPGRADES = "upgrades",
  ACHIEVEMENTS = "achievements",
  STATS = "stats",
  SETTINGS = "settings",
}

export type BulkBuyOption = 1 | 10 | 100 | "max";

export enum AchievementCategory {
  CLICKING = "clicking",
  PRODUCTION = "production",
  PURCHASING = "purchasing",
  PRESTIGE = "prestige",
}

export interface IUpgradeItem {
  id: string;
  name: string;
  price: number;
  multiply: number;
  type: UpgradeType;
  producerID?: string;
  description?: string;
  icon?: string;
}

export interface IProducerItem {
  id: string;
  name: string;
  basePrice: number;
  produce: number;
  icon: string;
}

export interface IAchievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  reward: number;
  condition: {
    type:
      | "totalClicks"
      | "totalEarned"
      | "producerCount"
      | "producerOwned"
      | "upgradeCount"
      | "prestigeCount"
      | "clickDps"
      | "producerDps";
    target: number;
    producerId?: string;
  };
}

export interface IPrestigeUpgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costScale: number;
  effect: number;
  maxLevel: number;
  icon: string;
}

export interface IConfig {
  upgrades: IUpgradeItem[];
  producers: IProducerItem[];
  achievements: IAchievement[];
  prestigeUpgrades: IPrestigeUpgrade[];
}

export type TWorkerMessage = {
  data: {
    event: string;
    count?: number;
  };
};

export type GoldenCookieEffect = "multiplier" | "instantPoints" | "clickFrenzy";

export interface IGoldenCookieEvent {
  type: GoldenCookieEffect;
  multiplier: number;
  duration: number;
  label: string;
}
