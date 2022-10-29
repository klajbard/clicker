import React, { useMemo } from "react";

import config from "../../config";
import { storeActions, useProgress } from "../../store/main";
import { IUpgradeItem, UpgradeType } from "../../types";

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
    } else if (type === UpgradeType.ALL) {
      return `Multiply clicking rate by ${multiply * 100}% of DPS!`;
    } else if (type === UpgradeType.PRODUCER) {
      return `Multiplies produce rate of "${
        config.producers.find((producer) => producer.id === producerID)?.name
      }" by ${multiply}x!`;
    }
  }, [type]);

  return (
    <Styled.Container onClick={handleClick} disabled={state.count < price}>
      <Styled.Title>{name}</Styled.Title>
      <Styled.Price>{price}</Styled.Price>
      <Styled.Description>{description}</Styled.Description>
    </Styled.Container>
  );
}

export default UpgradeItem;
