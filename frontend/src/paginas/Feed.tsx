import { useEffect, useState } from 'react'
import cliente from '../api/cliente'
import type { Postagem } from '../tipos'
import CartaoPost from '../componentes/CartaoPost'

export default function Feed() {
    const [posts, setPosts] = useState<Postagem[]>([])
    const [texto, setTexto] = useState('')

    async function carregar() {
        const { data } = await cliente.get('/feed/')
        setPosts(data)
    }
    useEffect(() => { carregar() }, [])

    async function postar(e:React.FormEvent) {
        e.preventDefault()
        if (!texto.trim()) return
        await cliente.post('/posts/', { conteudo:texto})
        setTexto('')
        await carregar()
    }

    return (
        <div>
            <form onSubmit={postar}>
                <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder='O que está acontecendo?' maxLength={280} />
                <button>Postar</button>
            </form>
            {posts.map((p) => <CartaoPost key={p.id} p={p}/>)}
        </div>
    )
}