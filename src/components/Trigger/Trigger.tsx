import React from "react";
import styled, { keyframes } from "styled-components";

import { storeActions, useProgress } from "../../store/main";

const animateHit = keyframes`
  0% {}
  80% {visibility: 1;}
  99% {visibility: 0;}
  100% {display: none;}
`;

const HitContainer = styled.div`
  position: fixed;
  left: 150px;
  display: flex;
  flex-direction: column;
  max-height: 10rem;
  overflow: hidden;
`;

const StyledHit = styled.span`
  height: 2rem;
  /* animation: ${animateHit} 5s linear;
  animation-fill-mode: forwards; */
`;
const Hit: React.FC = ({ children }) => {
  return <StyledHit>{children}</StyledHit>;
};

const Trigger = () => {
  const state = useProgress();

  const handleClick = () => {
    console.log("DMG", state.clickDps);
    storeActions.addCount(state.clickDps);
  };

  return (
    <>
      <button onClick={handleClick}>Click!</button>
      <Hit>{state.clickDps}</Hit>
    </>
  );
};

export default Trigger;
