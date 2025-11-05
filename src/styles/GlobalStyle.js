// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* 전역 초기화 스타일 */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden; /* 가로 스크롤 방지 */
    overflow-y: auto; /* 세로 스크롤 허용 */
  }

  #root {
    height: 100%;
    width: 100%;
    overflow-x: hidden; /* 가로 스크롤 방지 */
  }
`;

export default GlobalStyle;
