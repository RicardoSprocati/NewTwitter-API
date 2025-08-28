import type { Postagem } from '../tipos'
import BotaoCurtir from './BotaoCurtir'
import { Link } from 'react-router-dom'

export default function CartaoPost({p}: {p: Postagem}) {
    return (
        <div>
            <div>
                <strong>@{p.autor_username}</strong>
                <small>{new Date(p.criado_em).toLocaleString()}</small>
            </div>
            <p>
                {p.conteudo}
            </p>
            {p.midia && <a href={p.midia} target='_blank'>mídia</a>}
            <div>
                <BotaoCurtir postagemId={p.id} qtd={p.qtd_curtidas}></BotaoCurtir>
                <Link to={`/post/${p.id}`}>Comentários</Link>
            </div>
        </div>
    )
}