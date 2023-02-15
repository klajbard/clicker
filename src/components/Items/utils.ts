import config from "../../config";
import { UpgradeType } from "../../types";

export const getDescription = (
  type: UpgradeType,
  multiply: number,
  producerID?: string
) => {
  switch (type) {
    case UpgradeType.CLICK:
      return `Multiplies clicking power by ${multiply}x!`;
    case UpgradeType.PROD2CLICK:
      return `Multiply clicking rate by ${multiply * 100}% of DPS!`;
    case UpgradeType.PRODUCER:
      return `Multiplies produce rate of "${
        config.producers.find((producer) => producer.id === producerID)?.name
      }" by ${multiply}x!`;
    default:
      return "";
  }
};
