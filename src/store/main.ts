import { proxy, useSnapshot } from "valtio";

import config from "../config";
import { IProducerItem, UpgradeType } from "../types";

import { IStore, IStoreRead } from "./types";

const state = proxy<IStore>({
  count: 0,
  clickDps: 1,
  producerDps: 0,
  producers: [],
  upgrades: [],
});

const roundToOneDecimal = (num: number) =>
  Math.round((num + Number.EPSILON) * 10) / 10;

const calculateDps = () => {
  let damageFromProducers = 0;

  // Reset dps values
  state.clickDps = 1;
  state.producerDps = 0;

  // Set all producer values to the base produce amount
  state.producers.forEach((producer) => {
    const matchedProducer = config.producers.find(
      (producerItem) => producerItem.name === producer.name
    );
    if (matchedProducer) {
      producer.dps = matchedProducer.produce;
    }
  });

  // Apply all producer based upgrades to update DPS
  state.upgrades.forEach((upgrade) => {
    const matchedUpgrade = config.upgrades.find(({ name }) => upgrade === name);
    if (matchedUpgrade?.type === UpgradeType.PRODUCER) {
      const matchedProducer = state.producers.find(
        (producer) => producer.name === matchedUpgrade.producerName
      );
      if (matchedProducer) {
        matchedProducer.dps = matchedProducer.dps * matchedUpgrade.multiply;
      }
    }
  });

  // Calculate summarized DPS
  state.producers.forEach((producer) => {
    state.producerDps += producer.dps * producer.count;
  });

  // Calculate click DPS
  state.upgrades.forEach((upgrade) => {
    const matchedUpgrade = config.upgrades.find(({ name }) => upgrade === name);
    switch (matchedUpgrade?.type) {
      case UpgradeType.CLICK:
        state.clickDps = state.clickDps * (matchedUpgrade?.multiply || 1);
        break;
      case UpgradeType.ALL:
        damageFromProducers += Math.round(
          state.producerDps * matchedUpgrade.multiply
        );
        break;
    }
  });

  state.clickDps = state.clickDps + damageFromProducers;
};

export const storeActions = {
  init() {
    const localState = localStorage.getItem("clicker.state");
    if (localState) {
      const localStateObj = JSON.parse(localState) as IStoreRead;
      state.count = localStateObj.count;
      state.producers = localStateObj.producers;
      state.upgrades = localStateObj.upgrades;
    }
    calculateDps();
  },
  update() {
    state.count = roundToOneDecimal(state.count + 0.1 * state.producerDps);
  },
  saveProgress() {
    console.log("Saving progress...");
    const stateToSave: IStoreRead = {
      count: state.count,
      producers: state.producers,
      upgrades: state.upgrades,
    };
    localStorage.setItem("clicker.state", JSON.stringify(stateToSave));
  },
  updateCount(count: number) {
    state.count = count;
    storeActions.updateWindowTitle();
  },
  updateWindowTitle() {
    window.document.title = `${state.count} points`;
  },
  addCount(count: number) {
    state.count = roundToOneDecimal(state.count + count);
  },
  increaseDPS(dps: number) {
    state.producerDps += dps;
  },
  addUpgrade(upgrade: string) {
    if (state.upgrades.indexOf(upgrade) === -1) {
      state.upgrades.push(upgrade);
    }
    calculateDps();
  },
  hasUpgrade(name: string) {
    return state.upgrades.indexOf(name) !== -1;
  },
  increaseProducer(producer: IProducerItem) {
    const matchedProducer = state.producers.find(
      (_producer) => _producer.name === producer.name
    );
    if (matchedProducer) {
      matchedProducer.count += 1;
    } else {
      state.producers.push({
        name: producer.name,
        count: 1,
        dps: producer.produce,
      });
    }
    calculateDps();
  },
};

export const useProgress = () => useSnapshot(state);
