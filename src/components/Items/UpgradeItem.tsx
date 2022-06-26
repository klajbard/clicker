import React, { useMemo } from "react";

import { storeActions, useProgress } from "../../store/main";
import { IUpgradeItem, UpgradeType } from "../../types";

import * as Styled from "./styled";

function UpgradeItem({ item }: { item: IUpgradeItem }) {
  const state = useProgress();
  const { name, price, multiply, type, producerName } = item;
  const handleClick = () => {
    if (state.count > price) {
      storeActions.addUpgrade(name);
      storeActions.addCount(-price);
    }
  };

  const description = useMemo(() => {
    if (type === UpgradeType.CLICK) {
      return `Multiplies clicking power by ${multiply}x!`;
    } else if (type === UpgradeType.ALL) {
      return `Multiply clicking rate by ${multiply}x of DPS!`;
    } else if (type === UpgradeType.PRODUCER) {
      return `Multiplies produce rate of ${producerName} by ${multiply}x!`;
    }
  }, [type]);

  return (
    <Styled.Container onClick={handleClick}>
      <Styled.Title>{name}</Styled.Title>
      <Styled.Price>{price}</Styled.Price>
      <Styled.Description>{description}</Styled.Description>
    </Styled.Container>
  );
}

export default UpgradeItem;
