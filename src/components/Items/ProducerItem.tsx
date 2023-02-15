import { useCallback, useMemo } from "react";

import { PRODUCER_POW } from "../../config";
import { PriceTag } from "../../icons/icons";
import { storeActions, useProgress } from "../../store/main";
import { IProducerItem } from "../../types";
import { toHumanReadable } from "../../utils/calculate";

import * as Styled from "./styled";

function ProducerItem({ item }: { item: IProducerItem }) {
  const state = useProgress();
  const { basePrice, id, name, produce } = item;
  const producer = state.producers.find((producer) => producer.id === id);

  const price = useMemo(
    () => Math.floor(basePrice * Math.pow(PRODUCER_POW, producer?.count || 0)),
    [producer?.count]
  );

  const handleClick = useCallback(() => {
    if (state.count >= price) {
      storeActions.increaseProducer(item, price);
      storeActions.addCount(-price);
    }
  }, [item, price]);

  const isDisabled = useMemo(() => state.count < price, [state.count, price]);
  const humanReadablePrice = useMemo(() => toHumanReadable(price), [price]);

  return (
    <Styled.Container onClick={handleClick} disabled={isDisabled}>
      <Styled.Title>{name}</Styled.Title>
      <Styled.Count>{producer?.count}</Styled.Count>
      <Styled.Price $disabled={isDisabled}>
        <PriceTag />
        {humanReadablePrice}
      </Styled.Price>
      <Styled.Description $disabled={isDisabled}>
        &#x21ea; {producer?.dps || produce}
      </Styled.Description>
    </Styled.Container>
  );
}

export default ProducerItem;
