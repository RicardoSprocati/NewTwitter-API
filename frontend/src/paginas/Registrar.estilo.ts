import styled, { css } from "styled-components"

export const FormRegistro = styled.form`
    background: ${({ theme }) => theme.cores.fundoCard};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    box-shadow: ${({ theme }) => theme.sombra};
    padding: ${({ theme }) => theme.espacoLg};
    margin: 18px auto;
    max-width: 520px;
    display: grid;
    gap: 10px;

    h1 { margin: 0 0 8px; font-size: 22px; }
`
export const Campo = styled.div`
    display: grid;
    gap: 6px;
`

export const Rotulo = styled.label`
    font-weight: 600;
`

export const Entrada = styled.input<{ invalido?: boolean }>`
    width: 100%;
    background: transparent;
    color: ${({ theme }) => theme.cores.texto};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    padding: 12px 14px;
    border-radius: 12px;
    outline: none;
    transition: border-color .15s ease, box-shadow .15s ease;

    ${({ invalido, theme }) =>
        invalido
        ? css`
            border-color: ${theme.cores.erro};
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.16);
            `
        : css`
            &:focus {
                border-color: ${theme.cores.primaria};
                box-shadow: 0 0 0 3px rgba(29, 155, 240, 0.18);
            }
            `}
`

export const MsgErro = styled.span`
    color: ${({ theme }) => theme.cores.erro};
    font-size: 13px;
`