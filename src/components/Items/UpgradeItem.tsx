import { useCallback, useMemo } from "react";

import { PriceTag } from "../../icons/icons";
import { storeActions, useProgress } from "../../store/main";
import { IUpgradeItem } from "../../types";
import { toHumanReadable } from "../../utils/calculate";

import * as Styled from "./styled";
import { getDescription } from "./utils";

function UpgradeItem({
  item: { id, name, price, multiply, type, producerID },
}: {
  item: IUpgradeItem;
}) {
  const state = useProgress();
  const handleClick = useCallback(() => {
    if (state.count >= price) {
      storeActions.addUpgrade(id, price);
      storeActions.addCount(-price);
    }
  }, [id, price]);

  const description = useMemo(
    () => getDescription(type, multiply, producerID),
    [multiply, type, producerID]
  );
  const isDisabled = useMemo(() => state.count < price, [state.count, price]);
  const humanReadablePrice = useMemo(() => toHumanReadable(price), [price]);

  return (
    <Styled.Container onClick={handleClick} disabled={isDisabled}>
      <Styled.Title>{name}</Styled.Title>
      <Styled.Price $disabled={isDisabled}>
        <PriceTag />
        {humanReadablePrice}
      </Styled.Price>
      <Styled.Description $disabled={isDisabled}>
        {description}
      </Styled.Description>
    </Styled.Container>
  );
}

export default UpgradeItem;
