import { useState } from 'react'
import { useAuth } from '../contexto/AutenticacaoContexto'
import { FormAuth } from './Entrar.estilo'
import { useNavigate } from 'react-router-dom'

export default function Entrar() {
    const {logar} = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [senha, setSenha] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    async function enviar(e:React.FormEvent) {
        e.preventDefault()
        setErro(null)
        setCarregando(true)

        try {
            await logar(username, senha)
            navigate('/', {replace:true})
        } catch (err) {
            setErro('Usuário ou senha inválidos.')
            console.error(err)
        } finally {
            setCarregando(false)
        }
    }

    return (
        <FormAuth onSubmit={enviar}>
            <h1>Entrar </h1>
            <input placeholder='Usuário' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder='Senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)}/>
            {erro && <span className='erro'>{erro}</span>}
            <button disabled={carregando}>{carregando ? 'Entrando...' : 'Entrar'}</button>
        </FormAuth>
    )
}