import { useCallback, useMemo } from "react";

import { storeActions, useProgress } from "../../store/main";
import { IUpgradeItem } from "../../types";
import { toHumanReadable } from "../../utils/calculate";

import * as Styled from "./styled";
import { getDescription } from "./utils";

function UpgradeItem({ item }: { item: IUpgradeItem }) {
  const state = useProgress();
  const { id, name, price, multiply, type, producerID, description, icon } =
    item;

  const handleClick = useCallback(() => {
    if (state.count >= price) {
      storeActions.addUpgrade(id, price);
      storeActions.addCount(-price);
    }
  }, [id, price, state.count]);

  const displayDescription = useMemo(
    () => description || getDescription(type, multiply, producerID),
    [description, multiply, type, producerID]
  );

  const isDisabled = useMemo(() => state.count < price, [state.count, price]);

  const progress = useMemo(
    () => (price > 0 ? Math.min(state.count / price, 1) : 0),
    [state.count, price]
  );

  const humanReadablePrice = useMemo(() => toHumanReadable(price), [price]);

  return (
    <Styled.Container onClick={handleClick} disabled={isDisabled}>
      <Styled.IconArea>{icon || "\u2B06\uFE0F"}</Styled.IconArea>
      <Styled.Title>{name}</Styled.Title>
      <Styled.Price $disabled={isDisabled}>{humanReadablePrice}</Styled.Price>
      <Styled.Description $disabled={isDisabled}>
        {displayDescription}
      </Styled.Description>
      <Styled.ProgressBarBg>
        <Styled.ProgressBarFill $progress={progress} />
      </Styled.ProgressBarBg>
    </Styled.Container>
  );
}

export default UpgradeItem;
