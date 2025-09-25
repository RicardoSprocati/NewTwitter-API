import styled from "styled-components"

export const PostCard = styled.div`
    position: relative;
    background: ${({ theme }) => theme.cores.fundoCard};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    box-shadow: ${({ theme }) => theme.sombra};
    padding: ${({ theme }) => theme.espaco};
    margin: 12px 0;
`

export const Topo = styled.div`
    display: grid;
    grid-template-columns: 44px 1fr auto; 
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    margin-right:32px;

    strong { 
        font-size: 15px; 
        display: block;
    }
    small { color: ${({ theme }) => theme.cores.textoSec}; font-size: 12px; }
`

export const AvatarAutor = styled.img`
    width: 44px; height: 44px;
    border-radius: 999px;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.cores.borda};
`

export const CabecalhoTexto = styled.div`
    display: grid;
    gap: 2px;
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

export const BotaoExcluir = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    color: ${({ theme }) => theme.cores.textoSec};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    width: 28px;
    height: 28px;
    border-radius: 8px;
    line-height: 1;
    font-weight: 800;
    display: grid;
    place-items: center;
    padding: 0;

    &:hover {
        background: rgba(255,255,255,.06);
        color: ${({ theme }) => theme.cores.texto};
    }
`
