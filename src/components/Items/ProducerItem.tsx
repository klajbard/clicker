import React, { useMemo } from "react";

import { PRODUCER_POW } from "../../config";
import { storeActions, useProgress } from "../../store/main";
import { IProducerItem } from "../../types";

import * as Styled from "./styled";

function ProducerItem({ item }: { item: IProducerItem }) {
  const state = useProgress();
  const { basePrice, id, name, produce } = item;
  const producerFromState = state.producers.find(
    (_producer) => _producer.id === id
  );

  const price = useMemo(
    () =>
      Math.floor(
        basePrice * Math.pow(PRODUCER_POW, producerFromState?.count || 0)
      ),
    [producerFromState?.count]
  );

  const handleClick = () => {
    if (state.count >= price) {
      storeActions.increaseProducer(item, price);
      storeActions.addCount(-price);
    }
  };

  return (
    <Styled.Container onClick={handleClick} disabled={state.count < price}>
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
