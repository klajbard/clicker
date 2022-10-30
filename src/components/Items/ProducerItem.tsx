import React, { useMemo } from "react";

import { PRODUCER_POW } from "../../config";
import { PriceTag } from "../../icons/icons";
import { storeActions, useProgress } from "../../store/main";
import { IProducerItem } from "../../types";
import { toHumanReadable } from "../../utils/calculate";

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

  const isDisabled = useMemo(() => state.count < price, [state.count, price]);

  return (
    <Styled.Container onClick={handleClick} disabled={isDisabled}>
      <Styled.Title>{name}</Styled.Title>
      <Styled.Count>{producerFromState?.count}</Styled.Count>
      <Styled.Price $disabled={isDisabled}>
        <PriceTag />
        {toHumanReadable(price)}
      </Styled.Price>
      <Styled.Description $disabled={isDisabled}>
        &#x21ea; {producerFromState?.dps || produce}
      </Styled.Description>
    </Styled.Container>
  );
}

export default ProducerItem;
