import { IConfig, ProducerID, UpgradeType } from "./types";

export const PRODUCER_POW = 1.17;

// Test config to initially cover different cases
// Global config to hold values for available upgrades, etc.
const config: IConfig = {
  upgrades: [
    // Upgrades multiplying click power
    {
      id: "upgrdclck1",
      name: "Upgrade Click 1",
      multiply: 2,
      type: UpgradeType.CLICK,
      price: 50,
    },
    {
      id: "upgrdclck2",
      name: "Upgrade Click 2",
      multiply: 2,
      type: UpgradeType.CLICK,
      price: 700,
    },
    {
      id: "upgrdclck3",
      name: "Upgrade Click 3",
      multiply: 2,
      type: UpgradeType.CLICK,
      price: 5000,
    },
    {
      id: "upgrdclck4",
      name: "Upgrade Click 4",
      multiply: 2.5,
      type: UpgradeType.CLICK,
      price: 33000,
    },
    {
      id: "upgrdclck5",
      name: "Upgrade Click 5",
      multiply: 3,
      type: UpgradeType.CLICK,
      price: 195000,
    },
    {
      id: "upgrdclck6",
      name: "Upgrade Click 6",
      multiply: 3,
      type: UpgradeType.CLICK,
      price: 1000000,
    },
    {
      id: "upgrdclck7",
      name: "Upgrade Click 7",
      multiply: 5,
      type: UpgradeType.CLICK,
      price: 65000000,
    },
    // Upgrades multiplying specific producer power
    {
      id: "upgrdprd1",
      name: "Upgrade Producer 1",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 5000,
      producerID: ProducerID.prdcr1,
    },
    {
      id: "upgrdprd2",
      name: "Upgrade Producer 2",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 190000,
      producerID: ProducerID.prdcr2,
    },
    {
      id: "upgrdprd3",
      name: "Upgrade Producer 3",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 2000000,
      producerID: ProducerID.prdcr3,
    },
    {
      id: "upgrdprd4",
      name: "Upgrade Producer 4",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 10000000,
      producerID: ProducerID.prdcr4,
    },
    // Upgrades multiplying both click power and produce power
    {
      id: "upgrdall1",
      name: "Upgrade All 1",
      multiply: 0.1,
      type: UpgradeType.ALL,
      price: 14000,
    },
    {
      id: "upgrdall2",
      name: "Upgrade All 2",
      multiply: 0.1,
      type: UpgradeType.ALL,
      price: 678000,
    },
    {
      id: "upgrdall3",
      name: "Upgrade All 3",
      multiply: 0.1,
      type: UpgradeType.ALL,
      price: 25000000,
    },
  ],
  // Producers generating points over time
  producers: [
    { id: ProducerID.prdcr1, name: "Producer 1", produce: 1, basePrice: 10 },
    { id: ProducerID.prdcr2, name: "Producer 2", produce: 10, basePrice: 140 },
    {
      id: ProducerID.prdcr3,
      name: "Producer 3",
      produce: 80,
      basePrice: 20000,
    },
    {
      id: ProducerID.prdcr4,
      name: "Producer 4",
      produce: 500,
      basePrice: 350000,
    },
    {
      id: ProducerID.prdcr5,
      name: "Producer 5",
      produce: 2750,
      basePrice: 5000000,
    },
  ],
};

export default config;
