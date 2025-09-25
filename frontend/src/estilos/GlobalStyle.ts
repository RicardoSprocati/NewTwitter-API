import { createGlobalStyle } from "styled-components"
import type { Tema } from "./tema"

export const GlobalStyle = createGlobalStyle<{ theme: Tema }>`
    *, *::before, *::after { box-sizing: border-box; }
    html, body, #root { height: 100%; }

    body {
    margin: 0;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    background: ${({ theme }) => theme.cores.fundo};
    color: ${({ theme }) => theme.cores.texto};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    a {
    color: ${({ theme }) => theme.cores.primaria};
    text-decoration: none;
    }

    a:hover { text-decoration: underline; }

    main {
        margin: 0 auto;
        padding: ${({ theme }) => theme.espaco};
        max-width: ${({ theme }) => theme.colunaMax};
    }

    button {
        background: ${({ theme }) => theme.cores.primaria};
        color: #fff;
        border: 0;
        padding: 10px 14px;
        border-radius: 999px;
        font-weight: 700;
        cursor: pointer;
        transition: background .15s ease, transform .06s ease;
    }

    button:hover { background: ${({ theme }) => theme.cores.primariaHover}; }
    button:active { transform: translateY(1px); }
    button:disabled { opacity: .6; cursor: not-allowed; }

    input, textarea {
        width: 100%;
        background: transparent;
        color: ${({ theme }) => theme.cores.texto};
        border: 1px solid ${({ theme }) => theme.cores.borda};
        padding: 12px 14px;
        border-radius: 12px;
        outline: none;
        transition: border-color .15s ease, box-shadow .15s ease;
    }

    textarea { min-height: 96px; resize: vertical; }
    input::placeholder, textarea::placeholder { color: ${({ theme }) => theme.cores.textoSec}; }
    input:focus, textarea:focus {
        border-color: ${({ theme }) => theme.cores.primaria};
        box-shadow: 0 0 0 3px rgba(29,155,240,.18);
    }

    ul { list-style: none; padding: 0; margin: 0; }

    :focus-visible {
        outline: 2px solid ${({ theme }) => theme.cores.primaria};
        outline-offset: 2px;
    }

    /* Scrollbar (opcional) */
    *::-webkit-scrollbar { width: 10px; height: 10px; }
    *::-webkit-scrollbar-thumb { background: #2a2f36; border-radius: 999px; }
    *::-webkit-scrollbar-track { background: transparent; }

    @media (max-width: 700px) {
        main { padding: 10px; }
    }
`
