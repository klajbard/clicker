import React from "react";

import { storeActions, useProgress } from "../../store/main";

const Trigger = () => {
  const state = useProgress();

  const handleClick = () => {
    console.log("DMG", state.clickDps);
    storeActions.addCount(state.clickDps);
  };

  return <button onClick={handleClick}>Click!</button>;
};

export default Trigger;
