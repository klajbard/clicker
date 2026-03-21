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

const tierMap: Record<string, string> = {
  prdcr1: "#aaaacc",
  prdcr2: "#aaaacc",
  prdcr3: "#00cc66",
  prdcr4: "#00cc66",
  prdcr5: "#3399ff",
  prdcr6: "#3399ff",
  prdcr7: "#aa44ff",
  prdcr8: "#aa44ff",
  prdcr9: "#ff8800",
  prdcr10: "#ff8800",
};

export const getTierColor = (producerId: string): string => {
  return tierMap[producerId] || "#aaaacc";
};
