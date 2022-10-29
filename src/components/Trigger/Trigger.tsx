import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { storeActions, useProgress } from "../../store/main";

const TriggerButton = styled.button`
  width: 100%;
  max-width: 50rem;
  height: 15rem;
  font-size: 6rem;
  cursor: pointer;
  background: none;
  border: 2px solid black;
`;

const createHitElement = (
  hit: number,
  positionX: number,
  positionY: number
) => {
  const offsets = {
    y: 10 * (Math.random() - 0.5 - 1),
    x: 50 * (Math.random() - 0.5 - 0.2),
    // y: 10 * ((0 - 0.5) - 1),
    // x: 50 * ((0 - 0.5) - 0.3),
    // yMax: 10 * ((1 - 0.5) - 1),
    // xMax: 50 * ((1 - 0.5) - 0.3),
  };
  const hitElement = document.createElement("div");
  hitElement.innerText = `+${hit}`;
  hitElement.style.position = "fixed";
  hitElement.style.left = `${positionX + offsets.x}px`;
  hitElement.style.top = `${positionY + offsets.y}px`;
  // hitElement.style.height = `${offsets.yMax - offsets.y}px`;
  // hitElement.style.width = `${offsets.xMax - offsets.x}px`;
  hitElement.style.background = "red";
  hitElement.style.pointerEvents = "none";
  hitElement.style.transition = "all 2s ease-out";

  return hitElement;
};

const Trigger = () => {
  const state = useProgress();
  const timeOuts = useRef<number[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const hitElement = createHitElement(
      state.clickDps,
      event.clientX,
      event.clientY
    );
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
  };

  useEffect(() => {
    return () => {
      timeOuts.current.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <>
      <TriggerButton onClick={handleClick}>Click!</TriggerButton>
      <div>{state.clickDps}</div>
    </>
  );
};

export default Trigger;
