import type { Postagem } from '../tipos'
import BotaoCurtir from './BotaoCurtir'
import { Link } from 'react-router-dom'
import { PostCard, Topo, Conteudo, MidiaLink, Acoes, BotaoExcluir, AvatarAutor, CabecalhoTexto } from './CartaoPost.estilo'
import cliente from '../api/cliente'

type Props = {
    p: Postagem
    meuId?: number | null
    onExcluida?: (id: number) => void
}

export default function CartaoPost({p, meuId, onExcluida}: Props) {
    const souAutor = typeof meuId === 'number' && meuId === p.autor

    async function excluir() {
        const ok = confirm('Tem certeza que deseja excluir esta postagem?')
        if (!ok) return
        try {
            await cliente.delete(`/posts/${p.id}/`)
            onExcluida?.(p.id)
        } catch (e) {
            console.error(e)
            alert('Não foi possível excluir a postagem.')
        }
    }

    return (
        <PostCard>
            {souAutor && (
                <BotaoExcluir aria-label='Excluir postagem' title='Excluir' onClick={excluir}>
                    x
                </BotaoExcluir>
            )}
            <Topo>
                <Link to={`/u/${p.autor_username}`} aria-label={`Ver perfil de @${p.autor_username}`}>
                    <AvatarAutor
                    src={p.autor_avatar || '/avatar-placeholder.png'}
                    alt={p.autor_username}
                    loading="lazy"
                />
                </Link>
                <CabecalhoTexto>
                    <strong>
                        <Link to={`/u/${p.autor_username}`}>@{p.autor_username}</Link>
                    </strong>
                    <small>{new Date(p.criado_em).toLocaleString()}</small>
                </CabecalhoTexto>
            </Topo>
            
            <Conteudo>{p.conteudo}</Conteudo>

            {p.midia && <MidiaLink href={p.midia} target='_blank'>mídia</MidiaLink>}
            <Acoes>
                <BotaoCurtir key={p.id} postagemId={p.id} qtd={p.qtd_curtidas} curtidoInicial={p.curtido_por_mim}></BotaoCurtir>
                <Link to={`/post/${p.id}`}>Comentários</Link>
            </Acoes>
        </PostCard>
    )
}