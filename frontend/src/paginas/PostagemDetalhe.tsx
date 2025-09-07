import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import cliente from '../api/cliente'
import type { Postagem } from '../tipos'
import type { AxiosError } from 'axios'
import ListaComentarios from '../componentes/ListaComentarios'
import { DetalheWrapper, Titulo, Texto } from './PostagemDetalhe.estilo'

export default function PostagemDetalhe() {
    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<Postagem | null>(null)
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    const fetchPost = useCallback(async (signal?: AbortSignal) => {
        if (!id) {
            setPost(null)
            return
        }
        try {
            setErro(null)
            setLoading(true)
            const { data } = await cliente.get<Postagem>(`/post/${id}/`, { signal })
            setPost(data)
        } catch (e: unknown) {
            if (signal?.aborted) return
            const err = e as AxiosError
            const status = err.response?.status
            if (status === 404) setErro('Postagem não encontrada.')
            else if (status === 401) setErro('Não autorizado. Faça login novamente.')
            else setErro('Falha ao carregar a postagem. Tente novamente.')
            setPost(null)
            console.error('Falha ao buscar postagem:', err)
        } finally {
            if (!signal?.aborted) setLoading(false)
        }
    }, [id])

    useEffect(() => {
        const ac = new AbortController()
        fetchPost(ac.signal)
        return () => ac.abort()
    }, [fetchPost])

    if (loading) return <p>Carregando…</p>
    if (erro) return (
        <div>
            <p style={{ color: 'crimson' }}>{erro}</p>
            <button onClick={() => fetchPost()}>Tentar novamente</button>
        </div>
    )
    if (!post) return null

    return (
        <DetalheWrapper>
            <Titulo>@{post.autor_username}</Titulo>
            <Texto>{post.conteudo}</Texto>
            <ListaComentarios postagemId={post.id} />
        </DetalheWrapper>
    )
}
