
import { useState } from 'react'
import { useAuth } from '../contexto/AutenticacaoContexto'
import { Header,Nav,NavLink,Acoes } from './Cabecalho.estilo'
import { BotaoHamburguer, MostrarSomenteMobile } from './Hamburguer.estilo'
import DrawerLateral from './DrawerLateral'
import SidebarFeed from './SidebarFeed'

export default function Cabecalho() {
    const {autenticado, deslogar} = useAuth()
    const [menuAberto, setMenuAberto] = useState(false)

    return (
        <>
            <Header>
                <Nav>
                    <NavLink to="/">Feed</NavLink>
                    <NavLink to="/perfil">Perfil</NavLink>
                </Nav>
                <Acoes>
                    {autenticado ? (
                        <button onClick={deslogar}>Sair</button>
                    ) : (
                        <>
                            <NavLink to="/entrar">Entrar</NavLink>
                            <NavLink to="/registrar">Registrar</NavLink>
                        </>
                    )}

                    <MostrarSomenteMobile>
                        <BotaoHamburguer
                            onClick={() => setMenuAberto((v) => !v)}
                            aria-label="Abrir menu"
                            aria-expanded={menuAberto}
                            ativo={menuAberto}
                        >
                            <span />
                        </BotaoHamburguer>
                    </MostrarSomenteMobile>
                </Acoes>
            </Header>

            <DrawerLateral aberto={menuAberto} onClose={() => setMenuAberto(false)} titulo="Explorar">
                <SidebarFeed />
            </DrawerLateral>
        </>
    )
}