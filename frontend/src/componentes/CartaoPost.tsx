import type { Postagem } from '../tipos'
import BotaoCurtir from './BotaoCurtir'
import { Link } from 'react-router-dom'
import { PostCard, Topo, Conteudo, MidiaLink, Acoes } from './CartaoPost.estilo'

export default function CartaoPost({p}: {p: Postagem}) {
    return (
        <PostCard>
            <Topo>
                <strong>@{p.autor_username}</strong>
                <small>{new Date(p.criado_em).toLocaleString()}</small>
            </Topo>
            <p>
                <Conteudo>{p.conteudo}</Conteudo>
            </p>
            {p.midia && <MidiaLink href={p.midia} target='_blank'>mídia</MidiaLink>}
            <Acoes>
                <BotaoCurtir postagemId={p.id} qtd={p.qtd_curtidas}></BotaoCurtir>
                <Link to={`/post/${p.id}`}>Comentários</Link>
            </Acoes>
        </PostCard>
    )
}