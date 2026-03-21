import { useCallback, useEffect, useRef, useState } from "react";

import * as Styled from "./styled";

type Phase = "saving" | "saved" | "hidden";

const SAVE_DISPLAY_MS = 500;
const SAVED_DISPLAY_MS = 1500;
const EXIT_ANIMATION_MS = 300;

export default function SaveIndicator() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const cleanup = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const handleSave = () => {
      cleanup();
      setExiting(false);
      setPhase("saving");

      timerRef.current = setTimeout(() => {
        setPhase("saved");

        timerRef.current = setTimeout(() => {
          setExiting(true);

          timerRef.current = setTimeout(() => {
            setPhase("hidden");
            setExiting(false);
          }, EXIT_ANIMATION_MS);
        }, SAVED_DISPLAY_MS);
      }, SAVE_DISPLAY_MS);
    };

    window.addEventListener("game-saved", handleSave);
    return () => {
      window.removeEventListener("game-saved", handleSave);
      cleanup();
    };
  }, [cleanup]);

  if (phase === "hidden") return null;

  return (
    <Styled.Indicator $exiting={exiting}>
      {phase === "saving" ? (
        <>
          <Styled.Spinner /> Saving...
        </>
      ) : (
        <>
          <Styled.Checkmark>&#10003;</Styled.Checkmark> Saved
        </>
      )}
    </Styled.Indicator>
  );
}
