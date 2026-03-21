import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1a1a2e;
  border-radius: 16px;
  max-width: 450px;
  width: 90%;
  padding: 2rem;
  z-index: 1001;
  text-align: center;
  animation: ${slideUp} 0.4s ease-out;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #8888aa;
  margin: 0 0 1.5rem 0;
`;

export const EarnedAmount = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  color: #00d4ff;
  margin: 0 0 2rem 0;
`;

export const CollectButton = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: #00d4ff;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.1s ease;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }
`;
