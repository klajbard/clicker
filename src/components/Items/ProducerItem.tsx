import { useCallback, useMemo } from "react";

import { storeActions, useProgress } from "../../store/main";
import { BulkBuyOption, IProducerItem } from "../../types";
import { toHumanReadable } from "../../utils/calculate";

import * as Styled from "./styled";

type TierName = "common" | "uncommon" | "rare" | "epic" | "legendary";

const producerTier: Record<string, TierName> = {
  prdcr1: "common",
  prdcr2: "common",
  prdcr3: "uncommon",
  prdcr4: "uncommon",
  prdcr5: "rare",
  prdcr6: "rare",
  prdcr7: "epic",
  prdcr8: "epic",
  prdcr9: "legendary",
  prdcr10: "legendary",
};

function ProducerItem({
  item,
  bulkBuy,
}: {
  item: IProducerItem;
  bulkBuy: BulkBuyOption;
}) {
  const state = useProgress();
  const { basePrice, id, name, produce, icon } = item;
  const producer = state.producers.find((p) => p.id === id);
  const currentCount = producer?.count || 0;

  const bulkAmount = useMemo(() => {
    if (bulkBuy === "max") {
      return storeActions.getMaxAffordable(basePrice, currentCount);
    }
    return bulkBuy;
  }, [bulkBuy, basePrice, currentCount, state.count]);

  const price = useMemo(
    () =>
      bulkAmount > 0
        ? storeActions.getProducerPrice(basePrice, currentCount, bulkAmount)
        : storeActions.getProducerPrice(basePrice, currentCount, 1),
    [basePrice, currentCount, bulkAmount]
  );

  const isDisabled = useMemo(
    () => state.count < price || bulkAmount <= 0,
    [state.count, price, bulkAmount]
  );

  const progress = useMemo(
    () => (price > 0 ? Math.min(state.count / price, 1) : 0),
    [state.count, price]
  );

  const handleClick = useCallback(() => {
    storeActions.buyProducer(item, bulkBuy);
  }, [item, bulkBuy]);

  const humanReadablePrice = useMemo(() => toHumanReadable(price), [price]);
  const dps = producer?.dps || produce;
  const tier = producerTier[id] || "common";

  const buyLabel =
    bulkBuy === "max"
      ? bulkAmount > 0
        ? `Buy ${bulkAmount}`
        : "Buy max"
      : bulkBuy > 1
      ? `Buy ${bulkBuy}`
      : "";

  return (
    <Styled.Container onClick={handleClick} disabled={isDisabled} $tier={tier}>
      <Styled.IconArea>{icon}</Styled.IconArea>
      <Styled.Title>
        {name}
        {buyLabel && (
          <span
            style={{
              fontSize: "1rem",
              fontWeight: "normal",
              marginLeft: "0.5rem",
              color: "#8888aa",
            }}
          >
            ({buyLabel})
          </span>
        )}
      </Styled.Title>
      <Styled.Count>{currentCount}</Styled.Count>
      <Styled.Price $disabled={isDisabled}>{humanReadablePrice}</Styled.Price>
      <Styled.Description $disabled={isDisabled}>
        {"\u21EA"} {toHumanReadable(dps)}/s
      </Styled.Description>
      <Styled.ProgressBarBg>
        <Styled.ProgressBarFill $progress={progress} />
      </Styled.ProgressBarBg>
    </Styled.Container>
  );
}

export default ProducerItem;
