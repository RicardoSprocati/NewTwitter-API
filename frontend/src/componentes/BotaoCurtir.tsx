import cliente from '../api/cliente'
import { useState } from 'react'
import { LikeButton } from './BotaoCurtir.estilo'

export default function BotaoCurtir({postagemId, qtd}:{postagemId: number, qtd: number}) {

    const [count, setCount] = useState(qtd)
    const [curtiu, setCurtiu] = useState(false)

    async function alternar() {
        try {
            if (!curtiu) {
                await cliente.post('/likes', {postagem: postagemId})
                setCount((c) => c + 1); setCurtiu(true)
            } else {
                await cliente.delete(`/likes/${postagemId}`)
                setCount((c) => Math.max(0,c - 1)); setCurtiu(false)
            }
        } catch (e) {console.error(e)}
    }

    return <LikeButton onClick={alternar}>{curtiu ? 'Descurtir' : 'Curtir'} ({count})</LikeButton>
}