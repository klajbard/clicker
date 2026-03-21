import { useCallback, useEffect, useState } from "react";

import { storeActions } from "../../store/main";
import { toHumanReadable, formatTime } from "../../utils/calculate";

import * as Styled from "./styled";

const OfflineProgress = () => {
  const [visible, setVisible] = useState(false);
  const [earned, setEarned] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;

    const progress = storeActions.calculateOfflineProgress();
    if (progress.earned > 0) {
      setEarned(progress.earned);
      setElapsed(progress.elapsed);
      setVisible(true);
      setShown(true);
    }
  }, [shown]);

  const handleCollect = useCallback(() => {
    storeActions.applyOfflineProgress(earned);
    setVisible(false);
  }, [earned]);

  if (!visible) return null;

  return (
    <>
      <Styled.Overlay onClick={handleCollect} />
      <Styled.Modal>
        <Styled.Title>Welcome Back!</Styled.Title>
        <Styled.Subtitle>
          You were away for {formatTime(elapsed)}
        </Styled.Subtitle>
        <Styled.EarnedAmount>+{toHumanReadable(earned)}</Styled.EarnedAmount>
        <Styled.CollectButton onClick={handleCollect}>
          Collect
        </Styled.CollectButton>
      </Styled.Modal>
    </>
  );
};

export default OfflineProgress;
