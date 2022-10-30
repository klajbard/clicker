import styled, { createGlobalStyle } from "styled-components";

const sm = (styles: string) => `
  @media only screen and (max-width: 600px) {
    ${styles}
  }
`;

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 75%;
  }

  body {
    font-family: "Arial, Helvetica, sans-serif";
    margin: 0;
    cursor: default;
    font-size: 1.5rem;
    line-height: 1.5;
    background-color: #efefef;
  }

  ${sm(`
    html {
      font-size: 50%;
    }
  `)}

  a,
  :link {
    color: inherit;
}
`;

export const Wrapper = styled.div`
  box-sizing: border-box;
  margin: 2rem;
  min-height: 62rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 0.5rem;
  border: 1px solid #000;
  box-shadow: 4px 6px #000;
`;

export const Column = styled.div`
  padding: 1rem 0 2rem;
  width: 100%;
  box-shadow: inset 0px 0px 3px #3f3f3f;
`;

export const UpgradesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
`;

export const SectionTitle = styled.h2`
  text-align: center;
`;
