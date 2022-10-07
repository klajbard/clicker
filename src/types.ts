export enum UpgradeType {
  CLICK = "click",
  PRODUCER = "producer",
  ALL = "all",
}

export enum ProducerID {
  all = "all",
  ba = "ba",
  bb = "bb",
  bc = "bc",
  bd = "bd",
  be = "be",
}

export interface IUpgradeItem {
  id: string;
  price: number;
  multiply: number;
  type: UpgradeType;
  producerID?: string;
}

export interface IProducerItem {
  id: string;
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
