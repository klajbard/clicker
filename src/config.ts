import { IConfig, ProducerName, UpgradeType } from "./types";

// Test config to initially cover different cases
const config: IConfig = {
  upgrades: [
    { name: "ca", multiply: 2, type: UpgradeType.CLICK, price: 50 },
    { name: "cb", multiply: 2, type: UpgradeType.CLICK, price: 700 },
    { name: "cc", multiply: 2, type: UpgradeType.CLICK, price: 5000 },
    { name: "cd", multiply: 3, type: UpgradeType.CLICK, price: 32500 },
    { name: "ce", multiply: 5, type: UpgradeType.CLICK, price: 195000 },
    { name: "cf", multiply: 5, type: UpgradeType.CLICK, price: 1057000 },
    { name: "cg", multiply: 10, type: UpgradeType.CLICK, price: 65750000 },
    { name: "xaa", multiply: 0.1, type: UpgradeType.ALL, price: 13750 },
    { name: "xab", multiply: 0.1, type: UpgradeType.ALL, price: 678400 },
    { name: "xac", multiply: 0.1, type: UpgradeType.ALL, price: 25785000 },
    {
      name: "baa",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 4550,
      producerName: ProducerName.ba,
    },
    {
      name: "bab",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 189700,
      producerName: ProducerName.ba,
    },
    {
      name: "bac",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 2185900,
      producerName: ProducerName.ba,
    },
  ],
  producers: [
    { name: "ba", produce: 1, basePrice: 10 },
    { name: "bb", produce: 10, basePrice: 140 },
    { name: "bc", produce: 80, basePrice: 20000 },
    { name: "bd", produce: 500, basePrice: 350000 },
    { name: "be", produce: 2750, basePrice: 5000000 },
  ],
};

export default config;
