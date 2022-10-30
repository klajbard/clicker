import styled from "styled-components";

export const Container = styled.button`
  display: grid;
  grid-template-areas:
    "title count"
    "price count"
    "descr descr";

  gap: 0.5rem 1rem;
  width: 18rem;
  padding: 0.5rem;
  background: none;
  cursor: pointer;
  border: 1px solid #000;
  outline: none;
  border-radius: 0.5rem;

  &:not(:disabled) {
    &:hover,
    &:focus-visible {
      box-shadow: inset 1px 1px 0 #000;
    }

    &:active {
      box-shadow: inset 0 0 0 1px #000;
      background-color: #0000000f;
    }
  }
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
  color: #afafaf;
  font-weight: bold;
`;

export const Price = styled.span<{ $disabled?: boolean }>`
  grid-area: price;
  display: flex;
  align-items: center;
  color: ${({ $disabled }) => ($disabled ? "#8b7070" : "#8b0000")};

  svg {
    height: 1rem;
    margin-right: 0.5rem;
  }
`;

export const Description = styled.span<{ $disabled?: boolean }>`
  grid-area: descr;
  text-align: left;

  color: ${({ $disabled }) => ($disabled ? "#70708b" : "#00008b")};
  font-weight: bold;
`;
