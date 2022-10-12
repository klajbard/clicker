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

const Trigger = () => {
  const state = useProgress();
  const timeOuts = useRef<number[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const hit = document.createElement("div");
    hit.innerText = `+${state.clickDps}`;
    hit.style.position = "fixed";
    hit.style.left = `${event.clientX}px`;
    hit.style.top = `${event.clientY}px`;
    hit.style.pointerEvents = "none";
    hit.style.transition = "all 2s ease-out";
    console.log("DMG", state.clickDps);
    document.body.appendChild(hit);

    const removeTimeout = window.setTimeout(() => {
      hit.remove();
    }, 2000);
    window.setTimeout(() => {
      hit.style.transform = "translateY(-300%)";
      hit.style.opacity = "0";
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
