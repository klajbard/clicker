import { useCallback } from "react";

import { storeActions } from "../../store/main";

import * as Styled from "./styled";

const SaveProgress = () => {
  const handleClick = useCallback(() => {
    storeActions.saveProgress();
  }, []);

  return <Styled.Button onClick={handleClick}>Save progress</Styled.Button>;
};

export default SaveProgress;
