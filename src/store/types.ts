export type TStoreProducer = {
  name: string;
  count: number;
  dps: number;
};

export interface IStore {
  count: number;
  clickDps: number;
  producerDps: number;
  producers: TStoreProducer[];
  upgrades: string[];
}

export type IStoreRead = Pick<IStore, "count" | "upgrades" | "producers">;
