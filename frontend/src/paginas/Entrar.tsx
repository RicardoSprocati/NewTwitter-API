import { useState } from 'react'
import { useAuth } from '../contexto/AutenticacaoContexto'

export default function Entrar() {
    const {logar} = useAuth()
    const [username, setUsername] = useState('')
    const [senha, setSenha] = useState('')

    async function enviar(e:React.FormEvent) {
        e.preventDefault()
        await logar(username, senha)
    }

    return (
        <form onSubmit={enviar}>
            <h1>Entrar </h1>
            <input placeholder='Usuário' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder='Senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)}/>
            <button>Entrar</button>
        </form>
    )
}