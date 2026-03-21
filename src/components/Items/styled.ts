import styled, { css } from "styled-components";

import { md } from "../../styled";

type TierName = "common" | "uncommon" | "rare" | "epic" | "legendary";

const tierColors: Record<TierName, string> = {
  common: "#aaaacc",
  uncommon: "#00cc66",
  rare: "#3399ff",
  epic: "#aa44ff",
  legendary: "#ff8800",
};

export const Container = styled.button<{ $tier?: TierName }>`
  display: grid;
  grid-template-columns: 3.5rem 1fr auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "icon title  count"
    "icon price  count"
    "icon descr  count"
    "prog prog   prog";
  gap: 0.2rem 1rem;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #2a2a4e;
  border-radius: 10px;
  border-left: 3px solid ${({ $tier }) => tierColors[$tier || "common"]};
  background-color: #1a1a2e;
  color: #e0e0ff;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  overflow: hidden;
  transition: background-color 0.25s ease, box-shadow 0.25s ease,
    transform 0.25s ease, border-color 0.25s ease;

  &:not(:disabled):hover {
    background-color: #222244;
    box-shadow: 0 0 12px rgba(0, 212, 255, 0.2), 0 4px 16px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  &:not(:disabled):active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #111122;
    color: #555577;
    cursor: default;
    border-left-color: #333344;
  }

  ${md(`
    width: 22rem;
  `)}
`;

export const IconArea = styled.span`
  grid-area: icon;
  font-size: 3rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.span`
  grid-area: title;
  text-align: left;
  font-size: 1.4rem;
  font-weight: bold;
  color: #e0e0ff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Count = styled.span`
  grid-area: count;
  font-size: 2.6rem;
  font-weight: bold;
  color: #00d4ff;
  text-align: right;
  min-width: 2.5rem;
  line-height: 1;
  align-self: center;
`;

export const Price = styled.span<{ $disabled?: boolean }>`
  grid-area: price;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ $disabled }) => ($disabled ? "#555577" : "#ff6b35")};
  transition: color 0.2s ease;
`;

export const Description = styled.span<{ $disabled?: boolean }>`
  grid-area: descr;
  text-align: left;
  font-size: 1.1rem;
  color: ${({ $disabled }) => ($disabled ? "#444466" : "#8888aa")};
  transition: color 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProgressBarBg = styled.div`
  grid-area: prog;
  width: 100%;
  height: 3px;
  background-color: #111122;
  border-radius: 2px;
  margin-top: 0.4rem;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => Math.min(Math.max($progress, 0), 1) * 100}%;
  background-color: #00d4ff;
  border-radius: 2px;
  transition: width 0.3s ease;
`;
