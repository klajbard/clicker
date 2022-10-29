export enum UpgradeType {
  CLICK = "click",
  PRODUCER = "producer",
  ALL = "all",
}

export enum ProducerID {
  all = "all",
  prdcr1 = "prdcr1",
  prdcr2 = "prdcr2",
  prdcr3 = "prdcr3",
  prdcr4 = "prdcr4",
  prdcr5 = "prdcr5",
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
