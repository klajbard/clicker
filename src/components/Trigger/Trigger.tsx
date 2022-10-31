import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

import { storeActions, useProgress } from "../../store/main";
import { toHumanReadable } from "../../utils/calculate";

const TriggerButton = styled.button`
  width: 100%;
  max-width: 50rem;
  height: 15rem;
  font-size: 6rem;
  cursor: pointer;
  border: 2px solid black;
  font-family: "Fredoka One", cursive;
  color: ${({ theme }) => theme.colors.secondary.lighter};
  background: ${({ theme }) => theme.colors.main.normal};
`;

const createHitElement = (
  hit: string,
  positionX: number,
  positionY: number
) => {
  const offsets = {
    y: 10 * (Math.random() - 0.5 - 1),
    x: 50 * (Math.random() - 0.5 - 0.2),
  };
  const hitElement = document.createElement("div");
  hitElement.innerText = `+${hit}`;
  hitElement.style.position = "fixed";
  hitElement.style.left = `${positionX + offsets.x}px`;
  hitElement.style.top = `${positionY + offsets.y}px`;
  hitElement.style.pointerEvents = "none";
  hitElement.style.transition = "all 2s ease-out";
  hitElement.style.color = "#4f4f4f";

  return hitElement;
};

const Trigger = () => {
  const state = useProgress();
  const timeOuts = useRef<number[]>([]);
  const hit = useMemo(() => toHumanReadable(state.clickDps), [state.clickDps]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const hitElement = createHitElement(hit, event.clientX, event.clientY);
      document.body.appendChild(hitElement);

      const removeTimeout = window.setTimeout(() => {
        hitElement.remove();
      }, 2000);
      window.setTimeout(() => {
        hitElement.style.transform = "translateY(-300%)";
        hitElement.style.opacity = "0";
      }, 0);
      timeOuts.current.push(removeTimeout);

      storeActions.addCount(state.clickDps);
    },
    [hit, state.clickDps]
  );

  useEffect(() => {
    return () => {
      timeOuts.current.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <>
      <TriggerButton onClick={handleClick}>Click!</TriggerButton>
      <div>{hit}</div>
    </>
  );
};

export default Trigger;
