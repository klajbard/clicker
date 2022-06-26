import React, { useMemo } from "react";

import { storeActions, useProgress } from "../../store/main";
import { IProducerItem } from "../../types";

import * as Styled from "./styled";

function ProducerItem({ item }: { item: IProducerItem }) {
  const state = useProgress();
  const { basePrice, name, produce } = item;
  const producerFromState = state.producers.find(
    (_producer) => _producer.name === item.name
  );

  const price = useMemo(
    () => Math.floor(basePrice * Math.pow(1.17, producerFromState?.count || 0)),
    [producerFromState?.count]
  );

  const handleClick = () => {
    if (state.count >= price) {
      storeActions.increaseProducer(item);
      storeActions.addCount(-price);
    }
  };

  return (
    <Styled.Container onClick={handleClick}>
      <Styled.Title>{name}</Styled.Title>
      <Styled.Price>{price}</Styled.Price>
      <Styled.Count>{producerFromState?.count}</Styled.Count>
      <Styled.Description>
        Helps with {producerFromState?.dps || produce} additional power!
      </Styled.Description>
    </Styled.Container>
  );
}

export default ProducerItem;
