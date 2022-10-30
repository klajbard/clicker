import React, { useMemo } from "react";

import config from "../../config";
import { PriceTag } from "../../icons/icons";
import { storeActions, useProgress } from "../../store/main";
import { IUpgradeItem, UpgradeType } from "../../types";
import { toHumanReadable } from "../../utils/calculate";

import * as Styled from "./styled";

function UpgradeItem({
  item: { id, name, price, multiply, type, producerID },
}: {
  item: IUpgradeItem;
}) {
  const state = useProgress();
  const handleClick = () => {
    if (state.count >= price) {
      storeActions.addUpgrade(id, price);
      storeActions.addCount(-price);
    }
  };

  const description = useMemo(() => {
    if (type === UpgradeType.CLICK) {
      return `Multiplies clicking power by ${multiply}x!`;
    } else if (type === UpgradeType.PROD2CLICK) {
      return `Multiply clicking rate by ${multiply * 100}% of DPS!`;
    } else if (type === UpgradeType.PRODUCER) {
      return `Multiplies produce rate of "${
        config.producers.find((producer) => producer.id === producerID)?.name
      }" by ${multiply}x!`;
    }
  }, [type]);

  const isDisabled = useMemo(() => state.count < price, [state.count, price]);

  return (
    <Styled.Container onClick={handleClick} disabled={isDisabled}>
      <Styled.Title>{name}</Styled.Title>
      <Styled.Price $disabled={isDisabled}>
        <PriceTag />
        {toHumanReadable(price)}
      </Styled.Price>
      <Styled.Description $disabled={isDisabled}>
        {description}
      </Styled.Description>
    </Styled.Container>
  );
}

export default UpgradeItem;
