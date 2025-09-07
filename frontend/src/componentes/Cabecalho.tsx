
import { useAuth } from '../contexto/AutenticacaoContexto'
import { Header,Nav,NavLink,Acoes } from './Cabecalho.estilo'

export default function Cabecalho() {
    const {autenticado, deslogar} = useAuth()

    return (
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
            </Acoes>
        </Header>
    )
}