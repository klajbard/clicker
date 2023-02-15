export enum UpgradeType {
  // Upgrades click power
  CLICK = "click",
  // Upgrades producer power
  PRODUCER = "producer",
  // Upgrades click power based on the power of producers
  PROD2CLICK = "prod2click",
  // Upgrades all damage
  ALL = "all",
}

export interface IUpgradeItem {
  id: string;
  name: string;
  price: number;
  multiply: number;
  type: UpgradeType;
  producerID?: string;
}

export interface IProducerItem {
  id: string;
  name: string;
  basePrice: number;
  produce: number;
}

export interface IConfig {
  upgrades: IUpgradeItem[];
  producers: IProducerItem[];
}

export type TWorkerMessage = {
  data: {
    event: string;
    count?: number;
  };
};
