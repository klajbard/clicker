import styled, { keyframes } from "styled-components";

import { md } from "../../styled";

const pulseRing = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.15);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const clickBounce = keyframes`
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.9);
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const TriggerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  gap: 1.5rem;
`;

export const TriggerButton = styled.button`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.accent.primary};
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.bg.secondary},
    ${({ theme }) => theme.colors.accent.primary}30,
    ${({ theme }) => theme.colors.bg.card}
  );
  color: ${({ theme }) => theme.colors.text.bright};
  font-family: "Fredoka One", cursive;
  font-size: 3rem;
  cursor: pointer;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};
  box-shadow: 0 0 15px ${({ theme }) => theme.colors.accent.primaryGlow},
    0 0 30px ${({ theme }) => theme.colors.accent.primaryGlow},
    inset 0 0 15px ${({ theme }) => theme.colors.accent.primaryGlow};

  ${md(`
    width: 260px;
    height: 260px;
    font-size: 3.6rem;
  `)}

  /* Pulsing ring */
  &::before {
    content: "";
    position: absolute;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -12px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.accent.primary};
    animation: ${pulseRing} 2s ease-out infinite;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -12px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.accent.primary};
    animation: ${pulseRing} 2s ease-out 1s infinite;
    pointer-events: none;
  }

  &:hover {
    box-shadow: 0 0 25px ${({ theme }) => theme.colors.accent.primary},
      0 0 50px ${({ theme }) => theme.colors.accent.primaryGlow},
      0 0 80px ${({ theme }) => theme.colors.accent.primaryGlow},
      inset 0 0 20px ${({ theme }) => theme.colors.accent.primaryGlow};
  }

  &:active {
    animation: ${clickBounce} 0.25s ease;
    box-shadow: 0 0 35px ${({ theme }) => theme.colors.accent.primary},
      0 0 70px ${({ theme }) => theme.colors.accent.primaryGlow},
      0 0 100px ${({ theme }) => theme.colors.accent.primaryGlow},
      inset 0 0 30px ${({ theme }) => theme.colors.accent.primaryGlow};
  }
`;

export const ClickPower = styled.div`
  margin-top: 2.5rem;
  user-select: none;
  font-family: "Comfortaa", cursive;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  letter-spacing: 1px;

  span {
    color: ${({ theme }) => theme.colors.accent.primary};
    text-shadow: ${({ theme }) => theme.shadows.neon};
    font-family: "Fredoka One", cursive;
    font-size: 3.2rem;
  }
`;

export const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ParticleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
`;
