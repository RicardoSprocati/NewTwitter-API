import styled from "styled-components"

export const LikeButton = styled.button`
    background: transparent;
    color: ${({ theme }) => theme.cores.texto};
    border: 1px solid ${({ theme }) => theme.cores.borda};
    padding: 8px 12px;
    border-radius: 999px;
    font-weight: 600;

    &:hover {
        background: rgba(255,255,255,.06);
    }
`
