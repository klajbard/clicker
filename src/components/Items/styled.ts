import styled from "styled-components";

export const Container = styled.button`
  display: grid;
  grid-template-areas:
    "title title"
    "price count"
    "descr descr";
  padding: 0.5rem;
  background: none;
  cursor: pointer;
  border: 1px solid #000;
  outline: none;
  border-radius: 0.5rem;

  &:hover,
  &:focus-visible {
    box-shadow: inset 1px 1px 0 #000;
  }

  &:active {
    box-shadow: inset 0 0 0 1px #000;
    background-color: #0000000f;
  }
`;

/** Upgrade/Producer */
export const Title = styled.span`
  grid-area: title;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Count = styled.span`
  grid-area: count;
`;

export const Price = styled.span`
  grid-area: price;
`;

export const Description = styled.span`
  grid-area: descr;
`;
