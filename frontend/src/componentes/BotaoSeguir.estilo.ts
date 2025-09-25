import styled from "styled-components"

export const BotaoSeguir = styled.button<{ seguindo?: boolean }>`
    background: ${({ seguindo, theme }) => (seguindo ? "transparent" : theme.cores.primaria)};
    color: ${({ seguindo }) => (seguindo ? "inherit" : "#fff")};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    padding: 8px 14px;
    border-radius: 999px;
    font-weight: 700;
    cursor: pointer;
    transition: background .15s ease, color .15s ease, transform .06s ease;

    &:hover {
        background: ${({ seguindo, theme }) => (seguindo ? "rgba(255,255,255,.06)" : theme.cores.primariaHover)};
    }
    &:active { transform: translateY(1px); }
    &:disabled { opacity: .6; cursor: not-allowed; }
`
