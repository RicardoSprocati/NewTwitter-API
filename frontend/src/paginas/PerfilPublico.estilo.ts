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
