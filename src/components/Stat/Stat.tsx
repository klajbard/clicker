import React from "react";

import { useProgress } from "../../store/main";
import { toHumanReadable } from "../../utils/calculate";

import * as Styled from "./styled";

const Stat = () => {
  const state = useProgress();

  return (
    <Styled.Stat>
      <div>Score: {toHumanReadable(state.count)}</div>
      <div>Click per sec: {toHumanReadable(state.producerDps)}</div>
    </Styled.Stat>
  );
};

export default Stat;
