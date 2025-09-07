import styled from "styled-components"

export const PostCard = styled.div`
    background: ${({ theme }) => theme.cores.fundoCard};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    box-shadow: ${({ theme }) => theme.sombra};
    padding: ${({ theme }) => theme.espaco};
    margin: 12px 0;
`

export const Topo = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;

    strong { font-size: 15px; }
    small { color: ${({ theme }) => theme.cores.textoSec}; font-size: 12px; }
`

export const Conteudo = styled.p`
    margin: 8px 0 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
`

export const MidiaLink = styled.a`
    display: inline-block;
    padding: 6px 10px;
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: 10px;
    font-size: 12px;
`

export const Acoes = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`
