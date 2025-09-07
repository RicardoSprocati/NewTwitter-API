import styled from "styled-components"
import { Link } from "react-router-dom"

export const Header = styled.header`
    position: sticky;
    top: 0;
    z-index: 20;
    backdrop-filter: blur(10px);
    background: rgba(15,20,25,.65);
    border-bottom: 1px solid ${({ theme }) => theme.cores.borda};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px ${({ theme }) => theme.espaco};
`

export const Nav = styled.nav`
    display: flex;
    gap: 14px;
`

export const NavLink = styled(Link)`
    color: ${({ theme }) => theme.cores.texto};
    font-weight: 600;
    padding: 8px 10px;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
        background: rgba(255,255,255,.06);
        text-decoration: none;
    }
`

export const Acoes = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`
