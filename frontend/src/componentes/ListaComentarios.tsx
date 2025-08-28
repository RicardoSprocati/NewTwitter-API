import { useCallback, useEffect, useState } from 'react'
import cliente from '../api/cliente'
import type { Comentario } from '../tipos'

export default function ListaComentarios({postagemId}: {postagemId: number}) {

    const [comentarios, setComentarios] = useState<Comentario[]>([])
    const [texto,setTexto] = useState('')

    const carregar = useCallback(async () => {
        const { data } = await cliente.get(`/post/${postagemId}/comentarios/`)
        setComentarios(data)
    }, [postagemId])

    useEffect(() => {
        carregar()
    }, [carregar])
    

    async function enviar(e: React.FormEvent) {
        e.preventDefault()
        if (!texto.trim()) return 
        await cliente.post(`/post/${postagemId}/comentarios`, { conteudo: texto })
        setTexto('')
        await carregar()
    }

    return (
        <div>
            <form onSubmit={enviar}>
                <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder='Escreva um comentario' />
                <button>Comentar</button>
            </form>
            <ul>
                {comentarios.map((c) => (
                    <li key={c.id}>
                        <strong>@{c.autor_username}</strong>: {c.conteudo}
                    </li>
                ))}
            </ul>
        </div>
    )
}