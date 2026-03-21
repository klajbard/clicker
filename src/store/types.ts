export type TStoreProducer = {
  id: string;
  count: number;
  dps: number;
};

export interface IStatistics {
  totalClicks: number;
  totalEarned: number;
  totalSpent: number;
  totalPrestiges: number;
  highestRunEarnings: number;
  currentRunEarnings: number;
  timePlayed: number;
  currentRunStart: number;
}

export interface IPrestigeState {
  diamonds: number;
  totalDiamonds: number;
  upgrades: Record<string, number>; // upgradeId -> level
}

export interface ISettings {
  floatingNumbers: boolean;
  autoSave: boolean;
  notation: "suffix" | "scientific";
  particleEffects: boolean;
}

export interface IStore {
  count: number;
  clickDps: number;
  producerDps: number;
  producers: TStoreProducer[];
  sumPurchases: number;
  upgrades: string[];
  achievements: string[];
  statistics: IStatistics;
  prestige: IPrestigeState;
  settings: ISettings;
  lastSaveTime: number;
  activeBoost: {
    type: string;
    multiplier: number;
    endsAt: number;
  } | null;
}

export type IStoreRead = Pick<
  IStore,
  | "count"
  | "upgrades"
  | "producers"
  | "achievements"
  | "statistics"
  | "prestige"
  | "settings"
  | "lastSaveTime"
>;
