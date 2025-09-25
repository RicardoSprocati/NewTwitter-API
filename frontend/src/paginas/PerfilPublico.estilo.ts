import styled from "styled-components"

export const Wrapper = styled.div`
    background: ${({ theme }) => theme.cores.fundoCard};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    box-shadow: ${({ theme }) => theme.sombra};
    padding: 16px;
`

export const Linha = styled.div`
    display: grid;
    gap: 10px;
    margin: 8px 0;
`

export const Avatar = styled.img`
    width: 96px; height: 96px;
    border-radius: 999px;
    border: 2px solid ${({ theme }) => theme.cores.borda};
    object-fit: cover;
`
export const Abas = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 16px;
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    overflow: hidden;
`

export const AbaBotao = styled.button<{ ativo?: boolean }>`
    background: ${({ ativo, theme }) => (ativo ? theme.cores.primaria : "transparent")};
    color: ${({ ativo }) => (ativo ? "#fff" : "inherit")};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    padding: 6px 10px;
    border-radius: 999px;
    font-weight: 700;
    &:hover { background: ${({ ativo, theme }) => (ativo ? theme.cores.primariaHover : "rgba(255,255,255,.06)")}; }
`

export const Lista = styled.ul`
    margin-top: 10px;
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    overflow: hidden;
`

export const Item = styled.li`
    display: grid;
    grid-template-columns: 40px 1fr auto;
    gap: 10px;
    align-items: center;
    padding: 10px 12px;
    border-top: 1px solid ${({ theme }) => theme.cores.borda};
    &:first-child { border-top: none; }
`

export const AvatarMini = styled.img`
    width: 40px; height: 40px;
    border-radius: 999px;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.cores.borda};
`

export const NomeLinha = styled.div`
    display: grid;
    line-height: 1.15;
    a { font-weight: 700; }
    small { color: ${({ theme }) => theme.cores.textoSec}; }
`