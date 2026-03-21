import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 15px ${`#ffd70060`},
                0 0 30px ${`#ffd70040`},
                0 0 45px ${`#ffd70020`};
  }
  50% {
    box-shadow: 0 0 25px ${`#ffd70080`},
                0 0 50px ${`#ffd70060`},
                0 0 75px ${`#ffd70040`};
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const burst = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.6);
    opacity: 0.7;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
`;

export const CookieContainer = styled.div<{
  $x: number;
  $y: number;
  $bursting: boolean;
}>`
  position: fixed;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 35%,
    #fff8dc,
    ${({ theme }) => theme.colors.golden.primary} 40%,
    #daa520 100%
  );
  background-size: 200% auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9000;
  user-select: none;

  font-size: 4rem;
  line-height: 1;

  animation: ${({ $bursting }) => ($bursting ? burst : float)}
      ${({ $bursting }) => ($bursting ? "0.4s" : "3s")}
      ${({ $bursting }) =>
        $bursting ? "ease-out forwards" : "ease-in-out infinite"},
    ${glow} 2s ease-in-out infinite, ${shimmer} 4s linear infinite;

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    filter: brightness(1.4);
  }
`;
