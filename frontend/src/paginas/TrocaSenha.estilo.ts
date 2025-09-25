import styled from "styled-components"

export const BlocoSenha = styled.section`
    margin-top: 16px;
    background: ${({ theme }) => theme.cores.fundoCard};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    box-shadow: ${({ theme }) => theme.sombra};
    padding: 16px;
    display: grid;
    gap: 10px;
`

export const Linha = styled.div`
    display: grid;
    gap: 6px;
`

export const Rotulo = styled.label`
    font-weight: 600;
    color: ${({ theme }) => theme.cores.texto};
`

export const Mensagem = styled.p<{ tipo?: "erro" | "ok" }>`
    margin: 6px 0 0;
    font-size: 14px;
    color: ${({ tipo, theme }) =>
        tipo === "ok" ? theme.cores.sucesso : tipo === "erro" ? theme.cores.erro : theme.cores.textoSec};
`

export const Acoes = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
`
