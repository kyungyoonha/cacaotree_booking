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

    .placeholder {
        & input::placeholder { 
            color: black;
        }
    }
    
    .ant-input {
        border-radius: 0;
        width: 100%;
    }

    .ant-form-item{
        width: 100%;
    }

    .ant-input-number-group-addon {
            border-radius: 0 !important;
        }

    .input-radius {
        border-radius: 0 !important;
    }

    
    
    @keyframes animation-arrow {
        0% {
            transform: translateX(0px);
        }

        50% {
            transform: translateX(5px);
        }

        100% {
            transform: translateX(0px);
        }
    }
`;

export default GlobalStyles;
