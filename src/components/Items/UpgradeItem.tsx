import React, { useMemo } from "react";

import { storeActions, useProgress } from "../../store/main";
import { IUpgradeItem, UpgradeType } from "../../types";

import * as Styled from "./styled";

function UpgradeItem({ item }: { item: IUpgradeItem }) {
  const state = useProgress();
  const { id, price, multiply, type, producerID } = item;
  const handleClick = () => {
    if (state.count > price) {
      storeActions.addUpgrade(id);
      storeActions.addCount(-price);
    }
  };

  const description = useMemo(() => {
    if (type === UpgradeType.CLICK) {
      return `Multiplies clicking power by ${multiply}x!`;
    } else if (type === UpgradeType.ALL) {
      return `Multiply clicking rate by ${multiply * 100}% of DPS!`;
    } else if (type === UpgradeType.PRODUCER) {
      return `Multiplies produce rate of ${producerID} by ${multiply}x!`;
    }
  }, [type]);

  return (
    <Styled.Container onClick={handleClick} disabled={state.count < price}>
      <Styled.Title>{id}</Styled.Title>
      <Styled.Price>{price}</Styled.Price>
      <Styled.Description>{description}</Styled.Description>
    </Styled.Container>
  );
}

export default UpgradeItem;
