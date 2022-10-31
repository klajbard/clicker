import styled, { createGlobalStyle } from "styled-components";

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

export const GlobalStyle = createGlobalStyle<{ theme: ThemeInterface }>`
  html {
    font-size: 67.5%;
  }
  
  body {
    font-family: 'Comfortaa', cursive;
    margin: 0;
    cursor: default;
    font-size: 1.5rem;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.secondary.normal};
    color: ${({ theme }) => theme.colors.secondary.lightest};
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
`;

export const Wrapper = styled.div`
  box-sizing: border-box;
  margin: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  ${lg(`
    display: flex;
    width: 100%;
    box-sizing: border-box;
  `)}
  padding: 1rem 2rem;
`;

export const Column = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

export const UpgradesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2px;
`;

export const SectionTitle = styled.h2`
  text-align: center;
`;
