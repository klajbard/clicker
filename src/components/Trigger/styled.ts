import styled from "styled-components";

export const TriggerButton = styled.button`
  width: 100%;
  max-width: 50rem;
  height: 15rem;
  font-size: 6rem;
  cursor: pointer;
  border: 2px solid black;
  font-family: "Fredoka One", cursive;
  color: ${({ theme }) => theme.colors.secondary.lighter};
  background: ${({ theme }) => theme.colors.main.normal};
`;
