import React from "react";

import { useProgress } from "../../store/main";

import * as Styled from "./styled";

const Stat = () => {
  const state = useProgress();

  return (
    <Styled.Stat>
      <div>Score: {state.count.toFixed(1)}</div>
      <div>Click per sec: {state.producerDps.toFixed(1)}</div>
    </Styled.Stat>
  );
};

export default Stat;
