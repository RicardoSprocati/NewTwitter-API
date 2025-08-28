import { useState } from 'react'
import { registrar } from '../api/auth'

export default function Registrar() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [display_name, setDisplay_name] = useState('')
    const [senha, setSenha] = useState('')

    async function enviar(e:React.FormEvent) {
        e.preventDefault()
        await registrar({username, email, display_name, senha})
        alert('Registrado! agora faça login.')
    }

    return (
        <form onSubmit={enviar}>
            <h1>Registrar</h1>
            <input placeholder='Usuário' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Nome de exibição" value={display_name} onChange={(e) => setDisplay_name(e.target.value)} />
            <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button>Registrar</button>
        </form>
    )
}