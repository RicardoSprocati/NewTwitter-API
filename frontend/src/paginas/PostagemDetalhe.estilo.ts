import styled from "styled-components"

export const DetalheWrapper = styled.div`
    background: ${({ theme }) => theme.cores.fundoCard};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    border-radius: ${({ theme }) => theme.raio};
    box-shadow: ${({ theme }) => theme.sombra};
    padding: ${({ theme }) => theme.espaco};
`

export const Titulo = styled.h2`
    margin: 0 0 8px;
`

export const Texto = styled.p`
    margin: 0 0 12px;
`
