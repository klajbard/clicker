import { useCallback, useEffect, useRef, useState } from "react";

import { storeActions, useProgress } from "../../store/main";
import { IGoldenCookieEvent } from "../../types";

import * as Styled from "./styled";

const EFFECTS: IGoldenCookieEvent[] = [
  {
    type: "multiplier",
    multiplier: 3,
    duration: 30,
    label: "Production Frenzy",
  },
  {
    type: "instantPoints",
    multiplier: 30,
    duration: 0,
    label: "Lucky Points",
  },
  {
    type: "clickFrenzy",
    multiplier: 7,
    duration: 15,
    label: "Click Frenzy",
  },
];

const BASE_MIN_INTERVAL = 120;
const BASE_MAX_INTERVAL = 300;
const VISIBLE_DURATION = 12000;

const getRandomInterval = (hasPrestigeGolden: boolean): number => {
  const reduction = hasPrestigeGolden ? 0.7 : 1;
  const min = BASE_MIN_INTERVAL * reduction;
  const max = BASE_MAX_INTERVAL * reduction;
  return (Math.random() * (max - min) + min) * 1000;
};

const getRandomPosition = () => ({
  x: Math.random() * 70 + 10, // 10% - 80%
  y: Math.random() * 40 + 20, // 20% - 60%
});

const GoldenCookie = () => {
  const state = useProgress();
  const [visible, setVisible] = useState(false);
  const [bursting, setBursting] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 40 });
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasPrestigeGolden = Boolean(state.prestige.upgrades["prestige_golden"]);

  const scheduleSpawn = useCallback(() => {
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);

    const interval = getRandomInterval(hasPrestigeGolden);
    spawnTimerRef.current = setTimeout(() => {
      setPosition(getRandomPosition());
      setBursting(false);
      setVisible(true);

      // Auto-hide after VISIBLE_DURATION
      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
        scheduleSpawn();
      }, VISIBLE_DURATION);
    }, interval);
  }, [hasPrestigeGolden]);

  useEffect(() => {
    if (state.producerDps <= 0) return;

    scheduleSpawn();

    return () => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [state.producerDps > 0, scheduleSpawn]);

  const handleClick = useCallback(() => {
    if (bursting) return;

    // Clear the auto-hide timer
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    // Pick a random effect
    const effect = EFFECTS[Math.floor(Math.random() * EFFECTS.length)];

    // Activate the boost
    storeActions.activateBoost(effect.type, effect.multiplier, effect.duration);

    // Dispatch event for toast system
    window.dispatchEvent(
      new CustomEvent("golden-cookie-clicked", {
        detail: { label: effect.label },
      })
    );

    // Play burst animation then hide
    setBursting(true);
    setTimeout(() => {
      setVisible(false);
      setBursting(false);
      scheduleSpawn();
    }, 400);
  }, [bursting, scheduleSpawn]);

  if (!visible || state.producerDps <= 0) return null;

  return (
    <Styled.CookieContainer
      $x={position.x}
      $y={position.y}
      $bursting={bursting}
      onClick={handleClick}
    >
      {"\uD83C\uDF6A"}
    </Styled.CookieContainer>
  );
};

export default GoldenCookie;
