import styled, { keyframes } from "styled-components";

const sparkle = keyframes`
  0%, 100% {
    text-shadow: 0 0 8px #aa77ff, 0 0 20px #aa77ff40;
    filter: brightness(1);
  }
  50% {
    text-shadow: 0 0 16px #aa77ff, 0 0 40px #aa77ff80, 0 0 60px #aa77ff40;
    filter: brightness(1.2);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const PrestigeContainer = styled.section`
  background: ${({ theme }) => theme.colors.prestige.bg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.prestige.primary}30;

  h2 {
    font-family: "Fredoka One", cursive;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.prestige.primary};
    text-shadow: 0 0 12px ${({ theme }) => theme.colors.prestige.glow},
      0 0 30px ${({ theme }) => theme.colors.prestige.glow};
    margin: 0;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
`;

export const DiamondDisplay = styled.div`
  font-family: "Fredoka One", cursive;
  font-size: 3.2rem;
  color: ${({ theme }) => theme.colors.prestige.primary};
  display: flex;
  align-items: center;
  gap: 0.6rem;
  animation: ${sparkle} 2s ease-in-out infinite;

  .icon {
    font-size: 3.6rem;
  }
`;

export const PrestigeButton = styled.button<{ disabled?: boolean }>`
  font-family: "Fredoka One", cursive;
  font-size: 1.8rem;
  padding: 1.2rem 3rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ theme }) => theme.colors.text.bright};
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;

  background: ${({ disabled }) =>
    disabled
      ? "linear-gradient(135deg, #333355 0%, #222244 100%)"
      : "linear-gradient(135deg, #7733cc 0%, #aa77ff 50%, #7733cc 100%)"};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  box-shadow: ${({ disabled }) =>
    disabled ? "none" : "0 0 20px #aa77ff40, 0 4px 16px rgba(0, 0, 0, 0.4)"};

  &:not(:disabled):hover {
    box-shadow: 0 0 30px #aa77ff80, 0 0 60px #aa77ff40,
      0 6px 24px rgba(0, 0, 0, 0.5);
    transform: translateY(-2px) scale(1.02);
  }

  &:not(:disabled):active {
    transform: translateY(0) scale(0.98);
  }
`;

export const PreviewText = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.prestige.primary};
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

export const UpgradeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const UpgradeCard = styled.div<{ $maxed?: boolean }>`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid
    ${({ $maxed, theme }) =>
      $maxed
        ? theme.colors.status.success + "60"
        : theme.colors.prestige.primary + "40"};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ $maxed, theme }) =>
      $maxed ? theme.colors.status.success : theme.colors.prestige.primary};
    box-shadow: 0 0 12px
      ${({ $maxed, theme }) =>
        $maxed
          ? theme.colors.status.success + "30"
          : theme.colors.prestige.glow};
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .card-icon {
    font-size: 2rem;
  }
`;

export const UpgradeName = styled.span`
  font-family: "Fredoka One", cursive;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: 1px;
`;

export const UpgradeDesc = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
`;

export const UpgradeLevel = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-weight: bold;
`;

export const UpgradeCost = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.prestige.primary};
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const BuyButton = styled.button<{ disabled?: boolean }>`
  font-family: "Fredoka One", cursive;
  font-size: 1.2rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.prestige.primary}60;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ theme }) => theme.colors.text.bright};
  transition: all ${({ theme }) => theme.transitions.normal};
  margin-top: auto;

  background: ${({ disabled }) =>
    disabled
      ? "linear-gradient(135deg, #222244 0%, #1a1a2e 100%)"
      : "linear-gradient(135deg, #5522aa 0%, #7733cc 100%)"};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};

  &:not(:disabled):hover {
    background: linear-gradient(135deg, #6633bb 0%, #8844dd 100%);
    box-shadow: 0 0 12px ${({ theme }) => theme.colors.prestige.glow};
    border-color: ${({ theme }) => theme.colors.prestige.primary};
  }

  &:not(:disabled):active {
    transform: scale(0.96);
  }
`;

export const MaxedBadge = styled.span`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  background: ${({ theme }) => theme.colors.status.success}25;
  color: ${({ theme }) => theme.colors.status.success};
  font-family: "Fredoka One", cursive;
  font-size: 1rem;
  padding: 0.2rem 0.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.status.success}50;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.prestige.primary}60;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2.4rem;
  max-width: 480px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-shadow: 0 0 40px ${({ theme }) => theme.colors.prestige.glow},
    0 8px 32px rgba(0, 0, 0, 0.6);
  animation: ${scaleIn} 0.25s ease;
  z-index: 1001;
`;

export const ModalTitle = styled.h3`
  font-family: "Fredoka One", cursive;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.prestige.primary};
  margin: 0;
  text-align: center;
  letter-spacing: 2px;
`;

export const ModalText = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  text-align: center;
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.prestige.primary};
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 0.5rem;
`;

export const ModalButton = styled.button<{ $variant?: "confirm" | "cancel" }>`
  font-family: "Fredoka One", cursive;
  font-size: 1.4rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  letter-spacing: 1px;
  transition: all ${({ theme }) => theme.transitions.normal};
  min-width: 120px;

  background: ${({ $variant }) =>
    $variant === "confirm"
      ? "linear-gradient(135deg, #7733cc 0%, #aa77ff 100%)"
      : "linear-gradient(135deg, #333355 0%, #222244 100%)"};
  color: ${({ $variant, theme }) =>
    $variant === "confirm"
      ? theme.colors.text.bright
      : theme.colors.text.secondary};
  border: 1px solid
    ${({ $variant, theme }) =>
      $variant === "confirm"
        ? theme.colors.prestige.primary + "80"
        : theme.colors.border.subtle};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $variant }) =>
      $variant === "confirm"
        ? "0 0 20px #aa77ff40, 0 4px 16px rgba(0, 0, 0, 0.3)"
        : "0 4px 12px rgba(0, 0, 0, 0.3)"};
  }

  &:active {
    transform: translateY(0);
  }
`;
