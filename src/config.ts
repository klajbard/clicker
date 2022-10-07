import { IConfig, ProducerID, UpgradeType } from "./types";

// Test config to initially cover different cases
// Global config to hold values for available upgrades, etc.
const config: IConfig = {
  upgrades: [
    // Upgrades multiplying click power
    { id: "ca", multiply: 2, type: UpgradeType.CLICK, price: 50 },
    { id: "cb", multiply: 2, type: UpgradeType.CLICK, price: 700 },
    { id: "cc", multiply: 2, type: UpgradeType.CLICK, price: 5000 },
    { id: "cd", multiply: 3, type: UpgradeType.CLICK, price: 33000 },
    { id: "ce", multiply: 5, type: UpgradeType.CLICK, price: 195000 },
    { id: "cf", multiply: 5, type: UpgradeType.CLICK, price: 1000000 },
    { id: "cg", multiply: 10, type: UpgradeType.CLICK, price: 65000000 },
    // Upgrades multiplying specific producer power
    {
      id: "baa",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 5000,
      producerID: ProducerID.ba,
    },
    {
      id: "bab",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 190000,
      producerID: ProducerID.ba,
    },
    {
      id: "bac",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 2000000,
      producerID: ProducerID.ba,
    },
    // Upgrades multiplying both click power and produce power
    { id: "xaa", multiply: 0.1, type: UpgradeType.ALL, price: 14000 },
    { id: "xab", multiply: 0.1, type: UpgradeType.ALL, price: 678000 },
    { id: "xac", multiply: 0.1, type: UpgradeType.ALL, price: 25000000 },
  ],
  // Producers generating points over time
  producers: [
    { id: "ba", produce: 1, basePrice: 10 },
    { id: "bb", produce: 10, basePrice: 140 },
    { id: "bc", produce: 80, basePrice: 20000 },
    { id: "bd", produce: 500, basePrice: 350000 },
    { id: "be", produce: 2750, basePrice: 5000000 },
  ],
};

export default config;
