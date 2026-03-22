import styled, { css, keyframes } from "styled-components";

const MOBILE_RADIUS = 120;
const DESKTOP_RADIUS = 150;

const orbit = keyframes`
  from {
    transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg);
  }
`;

// Glow tiers based on producer count
const glowTier = (count: number, accentGlow: string, accent: string) => {
  if (count >= 50)
    return `drop-shadow(0 0 6px ${accent}) drop-shadow(0 0 14px ${accentGlow}) drop-shadow(0 0 24px ${accentGlow})`;
  if (count >= 25)
    return `drop-shadow(0 0 5px ${accent}) drop-shadow(0 0 10px ${accentGlow})`;
  if (count >= 10)
    return `drop-shadow(0 0 4px ${accentGlow}) drop-shadow(0 0 8px ${accentGlow})`;
  return `drop-shadow(0 0 3px ${accentGlow})`;
};

// Scale based on count
const iconScale = (count: number) => {
  if (count >= 100) return 1.4;
  if (count >= 50) return 1.25;
  if (count >= 25) return 1.15;
  if (count >= 10) return 1.05;
  return 1;
};

export const OrbitContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
  z-index: 10;
`;

export const OrbitIcon = styled.div<{
  $speed: number;
  $delay: number;
  $count: number;
}>`
  --orbit-radius: ${MOBILE_RADIUS}px;

  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  cursor: default;
  user-select: none;
  will-change: transform;
  transition: filter 0.15s ease;

  ${({ $count, theme }) => {
    const scale = iconScale($count);
    const size = Math.round(28 * scale);
    return css`
      width: ${size}px;
      height: ${size}px;
      margin-left: ${-size / 2}px;
      margin-top: ${-size / 2}px;
      font-size: ${1.6 * scale}rem;
      filter: ${glowTier(
        $count,
        theme.colors.accent.primaryGlow,
        theme.colors.accent.primary
      )};
    `;
  }}

  animation: ${orbit} ${({ $speed }) => $speed}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  @media only screen and (min-width: 600px) {
    --orbit-radius: ${DESKTOP_RADIUS}px;

    ${({ $count }) => {
      const scale = iconScale($count);
      const size = Math.round(32 * scale);
      return css`
        width: ${size}px;
        height: ${size}px;
        margin-left: ${-size / 2}px;
        margin-top: ${-size / 2}px;
        font-size: ${1.8 * scale}rem;
      `;
    }}
  }

  &:hover {
    filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.accent.primary})
      drop-shadow(0 0 20px ${({ theme }) => theme.colors.accent.primaryGlow});
  }
`;

export const CountBadge = styled.span`
  position: absolute;
  bottom: -2px;
  right: -8px;
  background: ${({ theme }) => theme.colors.bg.secondary}ee;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-size: 0.8rem;
  font-family: "Fredoka One", cursive;
  padding: 0 4px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.accent.primary}40;
  line-height: 1.3;
  white-space: nowrap;
  text-shadow: ${({ theme }) => theme.shadows.neon};
`;

export const Tooltip = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.bg.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 0.3rem 0.6rem;
  font-size: 1.1rem;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 10000;
  box-shadow: ${({ theme }) => theme.shadows.card};

  .name {
    font-family: "Fredoka One", cursive;
    color: ${({ theme }) => theme.colors.accent.primary};
  }

  .count {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-left: 0.3rem;
  }
`;
