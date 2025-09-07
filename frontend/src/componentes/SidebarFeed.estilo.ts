import styled from "styled-components"

export const Caixa = styled.div`
    background: ${({ theme }) => theme.cores.fundoCard};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    box-shadow: ${({ theme }) => theme.sombra};
    padding: 14px;
`

export const BuscaWrap = styled.div`
    display: grid;
    gap: 10px;
    margin-bottom: 14px;
`

export const CampoBusca = styled.input`
    width: 100%;
`

export const Sugestoes = styled.ul`
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: 10px;
    max-height: 260px;
    overflow: auto;
`

export const Sugestao = styled.li`
    padding: 8px 10px;
    border-top: 1px solid ${({ theme }) => theme.cores.borda};
    &:first-child { border-top: 0; }

    a { text-decoration: none; }
    &:hover { background: rgba(255,255,255,.06); }
`

export const Abas = styled.div`
    display: flex;
    gap: 8px;
    margin: 6px 0 10px;
`

export const Aba = styled.button<{ ativa?: boolean }>`
    background: ${({ ativa, theme }) => (ativa ? theme.cores.primaria : "transparent")};
    color: ${({ ativa }) => (ativa ? "#fff" : "inherit")};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    padding: 6px 10px;
    border-radius: 999px;
    font-weight: 700;
    &:hover { background: ${({ ativa, theme }) => (ativa ? theme.cores.primariaHover : "rgba(255,255,255,.06)")}; }
`

export const ListaUsuarios = styled.ul`
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: 10px;
    overflow: hidden;
`

export const ItemUsuario = styled.li`
    padding: 10px 12px;
    border-top: 1px solid ${({ theme }) => theme.cores.borda};
    &:first-child { border-top: 0; }
    a { text-decoration: none; }
    &:hover { background: rgba(255,255,255,.06); }
`

export const Aviso = styled.div`
    color: ${({ theme }) => theme.cores.textoSec};
    text-align: center;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: 10px;
`
