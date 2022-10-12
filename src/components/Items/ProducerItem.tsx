import React, { useMemo } from "react";

import { storeActions, useProgress } from "../../store/main";
import { IProducerItem } from "../../types";

import * as Styled from "./styled";

function ProducerItem({ item }: { item: IProducerItem }) {
  const state = useProgress();
  const { basePrice, id, produce } = item;
  const producerFromState = state.producers.find(
    (_producer) => _producer.id === item.id
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
    <Styled.Container onClick={handleClick} disabled={state.count < price}>
      <Styled.Title>{id}</Styled.Title>
      <Styled.Price>{price}</Styled.Price>
      <Styled.Count>{producerFromState?.count}</Styled.Count>
      <Styled.Description>
        Helps with {producerFromState?.dps || produce} additional power!
      </Styled.Description>
    </Styled.Container>
  );
}

export default ProducerItem;
