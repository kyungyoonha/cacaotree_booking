import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
    }

    html {
        scroll-behavior: smooth;
        width: 100%;
        height: 100%;
    }

    ul {
        list-style:none;
    }
    a {
        text-decoration: none;
        color: inherit;
    }

    li {
        list-style: none;
    }
`;

export default GlobalStyles;
