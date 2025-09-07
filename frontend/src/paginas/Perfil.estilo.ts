import styled from "styled-components"

export const FormPerfil = styled.form`
    background: ${({ theme }) => theme.cores.fundoCard};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    box-shadow: ${({ theme }) => theme.sombra};
    padding: ${({ theme }) => theme.espacoLg};
    display: grid;
    gap: 10px;
`

export const Avatar = styled.img`
    border-radius: 999px;
    border: 2px solid ${({ theme }) => theme.cores.borda};
    width: 80px;
    height: 80px;
    object-fit: cover;
    display: block;
    margin-bottom: 10px;
`
