import { Link } from 'react-router-dom'
import { useAuth } from '../contexto/AutenticacaoContexto'

export default function Cabecalho() {
    const {autenticado, deslogar} = useAuth()

    return (
        <header>
            <nav>
                <Link to="/">Feed</Link>
                <Link to="/perfil">Perfil</Link>
            </nav>
            <div>
                {autenticado ? (
                    <button onClick={deslogar}>Sair</button>
                ) : (
                    <Link to="/entrar">Entrar</Link>
                )}
            </div>
        </header>
    )
}