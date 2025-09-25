import { useCallback, useEffect, useState } from 'react'
import cliente from '../api/cliente'
import type { Comentario } from '../tipos'
import { Wrapper, Form, Lista, Item, LinhaTopo, Texto, Acoes, BotaoPequeno, AvatarMini, AcoesTopoDireita } from './ListaComentarios.estilo'
import { Link } from 'react-router-dom';

export default function ListaComentarios({postagemId, podeComentar= false}: {postagemId: number; podeComentar?: boolean}) {

    const [comentarios, setComentarios] = useState<Comentario[]>([])
    const [texto,setTexto] = useState('')
    const [erro, setErro] = useState<string | null>(null)
    const [enviando, setEnviando] = useState(false)
    const [me, setMe] = useState<{ username: string } | null>(null)

    const carregar = useCallback(async () => {
        const { data } = await cliente.get(`/posts/${postagemId}/comentarios/`)
        setComentarios(data)
    }, [postagemId])

    useEffect(() => {
        carregar()
    }, [carregar])

useEffect(() => {
    cliente
        .get('/users/me/')
        .then(({ data }) => setMe({ username: data.username }))
        .catch(() => setMe(null))
    }, [])
    

    async function enviar(e: React.FormEvent) {
        e.preventDefault()
        if (!texto.trim()) return 
        setErro(null)
        setEnviando(true)

        try {
            await cliente.post(`/posts/${postagemId}/comentarios/`, { conteudo: texto })
            setTexto('')
            await carregar()
        } catch (e: any) {
            if (e?.response?.status === 403) {
                setErro('Você precisa seguir o autor para comentar.')
            } else {
                setErro('Não foi possível enviar o comentário.')
            }
        } finally {
            setEnviando(false)
        }
    }

    async function excluirComentario(id: number) {
        const ok = confirm('Excluir este comentário?')
        if (!ok) return
        try {
            await cliente.delete(`/posts/${postagemId}/comentarios/${id}/`)
            setComentarios((cs) => cs.filter((c) => c.id !== id))
        } catch (e) {
            alert('Falha ao excluir o comentário.')
        }
    }

    async function alternarLike(c: Comentario) {
        try {
            const { data } = await cliente.post("/comentarios/like-toggle/", { comentario: c.id })
            setComentarios((cs) =>
                cs.map((x) =>
                    x.id === c.id
                    ? {
                        ...x,
                        curtido_por_mim: data.liked,
                        qtd_curtidas: data.liked ? (x.qtd_curtidas || 0) + 1 : Math.max(0, (x.qtd_curtidas || 0) - 1),
                        }
                    : x
                )
            )
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <Wrapper>
            {podeComentar ? (
                <Form onSubmit={enviar}>
                    <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder='Escreva um comentario' />
                    <button disabled={enviando}>{enviando ? 'Enviando...' : 'Comentar'}</button>
                </Form>
            ): (
                <p className="muted">Siga o autor para comentar neste post.</p>
            )}
                {erro && <p className="erro">{erro}</p>}
            <Lista>
                {comentarios.map((c) => {
                    const souAutor = me?.username && c.autor_username === me.username
                    return (
                        <Item key={c.id}>
                            <LinhaTopo>
                                <Link to={`/u/${c.autor_username}`} aria-label={`Ver perfil de @${c.autor_username}`}>
                                    <AvatarMini
                                        src={c.autor_avatar || '/avatar-placeholder.png'}
                                        alt={c.autor_username}
                                        loading="lazy"
                                        />
                                </Link>
                                <div>
                                    <span className="autor">
                                        <Link to={`/u/${c.autor_username}`}>@{c.autor_username}</Link>
                                    </span>
                                    <span className="tempo">{new Date(c.criado_em).toLocaleString()}</span>
                                </div>
                                <AcoesTopoDireita>
                                </AcoesTopoDireita>
                            </LinhaTopo>

                            <Texto>{c.conteudo}</Texto>

                            <Acoes>
                                <BotaoPequeno onClick={() => alternarLike(c)}>
                                    {c.curtido_por_mim ? 'Descurtir' : 'Curtir'} ({c.qtd_curtidas ?? 0})
                                </BotaoPequeno>

                                {souAutor && (
                                    <BotaoPequeno onClick={() => excluirComentario(c.id)}>
                                    Excluir
                                </BotaoPequeno>
                                )}
                            </Acoes>
                        </Item>
                    )
                })}
            </Lista>
        </Wrapper>
    )
}