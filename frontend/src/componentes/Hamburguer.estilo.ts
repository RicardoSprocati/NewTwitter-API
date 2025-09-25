import styled from "styled-components"

export const BotaoHamburguer = styled.button<{ ativo?: boolean }>`
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.cores.borda};
    background: transparent;
    display: grid;
    place-items: center;

    &:hover {
        background: rgba(255,255,255,.06);
    }

    span {
        position: relative;
        display: block;
        width: 18px;
        height: 2px;
        background: ${({ theme }) => theme.cores.texto};
        transition: transform .2s ease;
    }
    span::before,
    span::after {
        content: "";
        position: absolute;
        left: 0;
        width: 18px;
        height: 2px;
        background: ${({ theme }) => theme.cores.texto};
        transition: transform .2s ease, top .2s ease, opacity .2s ease;
    }
    span::before { top: -6px; }
    span::after { top: 6px; }

    /* animação do X quando ativo */
    ${({ ativo }) => ativo && `
        span { transform: rotate(45deg); }
        span::before { top: 0; transform: rotate(90deg); }
        span::after { top: 0; opacity: 0; }
    `}
`


export const MostrarSomenteMobile = styled.div`
    display: none;
    @media (max-width: 980px) {
        display: block; 
    }
`
