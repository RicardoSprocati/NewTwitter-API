import cliente from '../api/cliente'
import { useState } from 'react'
import { LikeButton } from './BotaoCurtir.estilo'


export default function BotaoCurtir({postagemId, qtd, curtidoInicial= false}:{postagemId: number, qtd: number, curtidoInicial?:boolean}) {

    const [count, setCount] = useState(qtd)
    const [curtiu, setCurtiu] = useState(curtidoInicial)

    async function alternar() {
        try {
            const { data } = await cliente.post('/likes/', { postagem: postagemId })
            // backend já diz se ficou curtido ou não
            setCurtiu(data.liked)
            setCount((c) => (data.liked ? c + 1 : Math.max(0, c - 1)))
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <LikeButton onClick={alternar}>
            {curtiu ? 'Descurtir' : 'Curtir'} ({count})
        </LikeButton>
    )
}