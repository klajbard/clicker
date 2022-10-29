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
  const hitElement = document.createElement("div");
  hitElement.innerText = `+${hit}`;
  hitElement.style.position = "fixed";
  hitElement.style.left = `${positionX}px`;
  hitElement.style.top = `${positionY}px`;
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
    console.log("DMG", state.clickDps);

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
