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

    &:first-child { border-top: 0; }

    strong { margin-right: 6px; }
`
