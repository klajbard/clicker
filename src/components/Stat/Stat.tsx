import { useMemo } from "react";

import { useProgress } from "../../store/main";
import { toHumanReadable } from "../../utils/calculate";

import * as Styled from "./styled";

const Stat = () => {
  const state = useProgress();

  const humanReadableScore = useMemo(
    () => toHumanReadable(state.count),
    [state.count]
  );
  const humanReadableDps = useMemo(
    () => toHumanReadable(state.producerDps),
    [state.producerDps]
  );

  return (
    <Styled.Stat>
      <div>Score: {humanReadableScore}</div>
      <div>Click per sec: {humanReadableDps}</div>
    </Styled.Stat>
  );
};

export default Stat;
