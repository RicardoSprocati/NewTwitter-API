import styled from "styled-components"

export const Grade = styled.div`
    display: grid;
    grid-template-columns: 540px 320px;
    gap: 16px;
    
    @media (max-width: 980px) {
        grid-template-columns:  90%;
    }
`

export const ColunaPrincipal = styled.div``

export const ColunaLateral = styled.aside`
    position: sticky;
    top: 64px; /* abaixo do header */
    align-self: start;
    height: fit-content;

    @media (max-width: 980px) { 
        display: none; 
    }
`

export const FormPost = styled.form`
    display: grid;
    gap: 10px;
    margin-bottom: 14px;

    > button { justify-self: end; }
`
