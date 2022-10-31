import styled from "styled-components";

import { md } from "../../styled";

export const Container = styled.button`
  display: grid;
  grid-template-areas:
    "title count"
    "price count"
    "descr descr";

  gap: 0.5rem 1rem;
  width: 100%;
  padding: 0.5rem;
  align-items: end;
  background: none;
  border: none;
  outline: none;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.black.normal};
  background-color: ${({ theme }) => theme.colors.secondary.lighter};
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.colors.grey.dark};
    cursor: initial;
    background-color: ${({ theme }) => theme.colors.secondary.light};
  }

  &:not(:disabled) {
    &:hover,
    &:focus-visible {
      background-color: ${({ theme }) => theme.colors.white.light_fade};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.white.lighter_fade};
    }
  }

  ${md(`
    width: 18rem;
  `)}
`;

/** Upgrade/Producer */
export const Title = styled.span`
  grid-area: title;
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Count = styled.span`
  grid-area: count;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.secondary.normal};
  font-weight: bold;
`;

export const Price = styled.span<{ $disabled?: boolean }>`
  grid-area: price;
  display: flex;
  align-items: center;
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.grey.dark : theme.colors.price};

  svg {
    height: 1rem;
    margin-right: 0.5rem;
  }
`;

export const Description = styled.span<{ $disabled?: boolean }>`
  grid-area: descr;
  text-align: left;

  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.grey.dark : theme.colors.description};
  font-weight: bold;
`;
