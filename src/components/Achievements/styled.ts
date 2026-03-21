import styled from "styled-components";

import { md, lg } from "../../styled";

export const StatsBar = styled.div`
  text-align: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.3rem;
  letter-spacing: 0.5px;

  span {
    color: ${({ theme }) => theme.colors.accent.primary};
    font-family: "Fredoka One", cursive;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1.2rem;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.accent.primary : theme.colors.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent.primary + "20" : theme.colors.bg.secondary};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accent.primary : theme.colors.text.secondary};
  font-family: "Fredoka One", cursive;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  ${md(`
    grid-template-columns: repeat(2, 1fr);
  `)}

  ${lg(`
    grid-template-columns: repeat(3, 1fr);
  `)}

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const AchievementCard = styled.div<{ $unlocked?: boolean }>`
  background: ${({ $unlocked, theme }) =>
    $unlocked ? theme.colors.bg.card : theme.colors.bg.cardDisabled};
  border: 2px solid
    ${({ $unlocked, theme }) =>
      $unlocked
        ? theme.colors.achievement.unlocked
        : theme.colors.achievement.locked};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.4rem;
  transition: all ${({ theme }) => theme.transitions.normal};

  ${({ $unlocked, theme }) =>
    $unlocked &&
    `
    box-shadow: 0 0 12px ${theme.colors.achievement.glow},
                inset 0 0 12px ${theme.colors.achievement.glow};
  `}

  ${({ $unlocked }) =>
    !$unlocked &&
    `
    opacity: 0.6;
  `}
`;

export const CardIcon = styled.div`
  font-size: 3rem;
  line-height: 1;
`;

export const CardName = styled.div`
  font-family: "Fredoka One", cursive;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardDesc = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.muted};
  line-height: 1.4;
`;

export const CardReward = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.status.success};
  font-family: "Fredoka One", cursive;
  margin-top: auto;
  padding-top: 0.3rem;
`;
