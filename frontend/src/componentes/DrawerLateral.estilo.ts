import styled, { keyframes } from "styled-components"

const aparecer = keyframes`
    from { opacity: 0; } to { opacity: 1; }
`
const deslizar = keyframes`
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
`

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.5);
    z-index: 90;
    animation: ${aparecer} .15s ease;
    `

    export const Painel = styled.aside`
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: min(92vw, 360px);
    background: ${({ theme }) => theme.cores.fundoCard};
    border-left: 1px solid ${({ theme }) => theme.cores.borda};
    z-index: 100;
    padding: 14px;
    overflow: auto;
    animation: ${deslizar} .18s ease;

    header {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 10px;
    }
`

export const BotaoFechar = styled.button`
    width: 36px; height: 36px;
    border-radius: 10px;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.cores.borda};
    font-weight: 800;
    line-height: 1;
    display: grid; place-items: center;

    &:hover { background: rgba(255,255,255,.06); }
`
