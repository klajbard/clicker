import styled, { keyframes } from "styled-components";

type ToastType = "achievement" | "info" | "boost";

const slideIn = keyframes`
  0% {
    transform: translateX(120%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(120%);
    opacity: 0;
  }
`;

const BORDER_COLORS: Record<ToastType, string> = {
  achievement: "#ffd700",
  info: "#00d4ff",
  boost: "#ff6b35",
};

export const ToastContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  z-index: 10000;
  pointer-events: none;
`;

export const ToastItem = styled.div<{ $type: ToastType; $exiting?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  max-width: 350px;
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-left: 3px solid ${({ $type }) => BORDER_COLORS[$type]};
  border-radius: 8px;
  padding: 1rem 1.2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  pointer-events: auto;

  animation: ${({ $exiting }) => ($exiting ? slideOut : slideIn)} 0.35s ease
    forwards;
`;

export const ToastIcon = styled.div`
  font-size: 2.2rem;
  line-height: 1;
  flex-shrink: 0;
`;

export const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

export const ToastTitle = styled.div`
  font-family: "Fredoka One", cursive;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ToastMessage = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
`;
