import styled, { createGlobalStyle, keyframes } from "styled-components";

import { ThemeInterface } from "./theme";

export const md = (styles: string) => `
  @media only screen and (min-width: 600px) {
    ${styles}
  }
`;

export const lg = (styles: string) => `
  @media only screen and (min-width: 900px) {
    ${styles}
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

export const GlobalStyle = createGlobalStyle<{ theme: ThemeInterface }>`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 67.5%;
  }

  body {
    font-family: 'Comfortaa', cursive;
    margin: 0;
    cursor: default;
    font-size: 1.5rem;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.bg.primary};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h1, h2 {
    font-family: 'Fredoka One', cursive;
    letter-spacing: 2px;
  }

  ${md(`
    html {
      font-size: 75%;
    }
  `)}

  a,
  :link {
    color: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg.primary};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.normal};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.border.bright};
  }
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.bg.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const HeaderStats = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const HeaderStat = styled.div`
  text-align: center;

  .label {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .value {
    font-family: "Fredoka One", cursive;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.accent.primary};
    text-shadow: ${({ theme }) => theme.shadows.neon};
  }
`;

export const ScoreDisplay = styled.div`
  text-align: center;

  .label {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .value {
    font-family: "Fredoka One", cursive;
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.text.bright};
    text-shadow: 0 0 10px ${({ theme }) => theme.colors.accent.primaryGlow};
  }
`;

export const PrestigeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.prestige.primary};

  .icon {
    font-size: 1.6rem;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;

  ${lg(`
    padding: 0 2rem;
  `)}
`;

export const TabBar = styled.nav`
  display: flex;
  gap: 2px;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md}
    ${({ theme }) => theme.borderRadius.md} 0 0;
  overflow-x: auto;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-bottom: none;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  min-width: 100px;
  padding: 1rem 1.5rem;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.bg.card : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accent.primary : theme.colors.text.secondary};
  font-family: "Fredoka One", cursive;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  white-space: nowrap;

  ${({ $active, theme }) =>
    $active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: ${theme.colors.accent.primary};
      box-shadow: ${theme.shadows.neon};
    }
  `}

  &:hover {
    color: ${({ theme }) => theme.colors.accent.primary};
    background: ${({ theme }) => theme.colors.bg.cardHover};
  }
`;

export const TabBadge = styled.span`
  background: ${({ theme }) => theme.colors.accent.secondary};
  color: ${({ theme }) => theme.colors.text.bright};
  font-size: 1rem;
  padding: 0.1rem 0.5rem;
  border-radius: 10px;
  margin-left: 0.5rem;
  font-family: "Comfortaa", cursive;
`;

export const TabContent = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.md}
    ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  min-height: 400px;
  margin-bottom: 2rem;
`;

export const Container = styled.div`
  ${lg(`
    display: flex;
    width: 100%;
  `)}
  padding: 1rem 0;
`;

export const Column = styled.div`
  width: 100%;
`;

export const UpgradesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.8rem;
  margin: 0.5rem 0 1rem;
`;

export const BulkBuyBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 1rem;
`;

export const BulkBuyButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1.2rem;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.accent.primary : theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent.primary + "20" : theme.colors.bg.secondary};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accent.primary : theme.colors.text.secondary};
  font-family: "Fredoka One", cursive;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const BoostIndicator = styled.div`
  background: ${({ theme }) => theme.colors.golden.primary}20;
  border: 1px solid ${({ theme }) => theme.colors.golden.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 0.4rem 1rem;
  color: ${({ theme }) => theme.colors.golden.primary};
  font-size: 1.2rem;
  animation: ${pulse} 1s ease-in-out infinite;
  text-align: center;
`;
