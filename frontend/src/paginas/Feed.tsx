import { useEffect, useState } from 'react'
import cliente from '../api/cliente'
import type { Postagem } from '../tipos'
import CartaoPost from '../componentes/CartaoPost'
import SidebarFeed from '../componentes/SidebarFeed'
import { ColunaLateral, ColunaPrincipal, FormPost, Grade } from './FeedLayout.estilo'

export default function Feed() {
    const [posts, setPosts] = useState<Postagem[]>([])
    const [texto, setTexto] = useState('')
    const [meuId, setMeuId] = useState<number | null>(null)

    async function carregar() {
        const { data } = await cliente.get('/feed/')
        setPosts(data)
    }
    useEffect(() => { carregar() }, [])

    useEffect(() => {
        cliente.get('/users/me/').then(({data}) => setMeuId(data.id)).catch(() => setMeuId(null))
    }, [])

    async function postar(e:React.FormEvent) {
        e.preventDefault()
        if (!texto.trim()) return
        await cliente.post('/posts/', { conteudo:texto})
        setTexto('')
        await carregar()
    }

    function onExcluida(id: number) {
        setPosts((post) => post.filter((p) => p.id !== id))
    }

    return (
        <Grade>
            <ColunaPrincipal>
                <FormPost onSubmit={postar}>
                    <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder='O que está acontecendo?' maxLength={280} />
                    <button>Postar</button>
                </FormPost>

                {posts.map((p) => <CartaoPost key={p.id} p={p} meuId={meuId} onExcluida={onExcluida}/>)}
            </ColunaPrincipal>

            <ColunaLateral>
                <SidebarFeed />
            </ColunaLateral>
        </Grade>
    )
}