import styled from "styled-components"

export const Grade = styled.div`
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 16px;

    @media (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`

export const ColunaPrincipal = styled.div``

export const ColunaLateral = styled.aside`
    position: sticky;
    top: 64px; /* abaixo do header */
    align-self: start;
    height: fit-content;
`
