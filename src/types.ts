export enum UpgradeType {
  CLICK = "click",
  PRODUCER = "producer",
  ALL = "all",
}

export enum ProducerName {
  all = "all",
  ba = "ba",
  bb = "bb",
  bc = "bc",
  bd = "bd",
  be = "be",
}

export interface IUpgradeItem {
  name: string;
  price: number;
  multiply: number;
  type: UpgradeType;
  producerName?: string;
}

export interface IProducerItem {
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
