import styled from "styled-components"

export const Wrapper = styled.div`
    background: ${({ theme }) => theme.cores.fundoCard};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    box-shadow: ${({ theme }) => theme.sombra};
    padding: ${({ theme }) => theme.espaco};
`

export const Form = styled.form`
    display: grid;
    gap: 10px;
    margin-bottom: 14px;

    > button { justify-self: end; }
`

export const Lista = styled.ul``

export const Item = styled.li`
    border-top: 1px solid ${({ theme }) => theme.cores.borda};
    padding: 10px 0;
    word-wrap: break-word;     
    overflow-wrap: break-word;
    &:first-child { border-top: 0; }

    strong { margin-right: 6px; }
`
export const LinhaTopo = styled.div`
    display: grid;
    grid-template-columns: 36px 1fr auto; 
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;

    .autor { font-weight: 700; display: block;}
    .tempo { color: ${({ theme }) => theme.cores.textoSec}; font-size: 12px; }
`

export const AvatarMini = styled.img`
    width: 36px; height: 36px;
    border-radius: 999px;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.cores.borda};
`

export const Texto = styled.div`
    margin: 4px 0 8px;
    white-space: pre-wrap;
    word-wrap: break-word;
`

export const Acoes = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const BotaoPequeno = styled.button`
    background: transparent;
    color: ${({ theme }) => theme.cores.texto};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    padding: 6px 10px;
    border-radius: 999px;
    font-weight: 600;
    &:hover { background: rgba(255,255,255,.06); 
`

export const AcoesTopoDireita = styled.div`
    display: flex;
    gap: 6px;
    justify-self: end;
`
