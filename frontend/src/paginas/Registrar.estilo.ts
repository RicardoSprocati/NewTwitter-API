import styled from "styled-components"

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
