import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import cliente from "../api/cliente"
import { Wrapper, Linha, Avatar } from "./PerfilPublico.estilo"
import type { Usuario } from "../tipos"

export default function PerfilPublico() {
    const {username} = useParams()
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        if (!username) return
        setCarregando(true)
        cliente.get(`/users/${username}/`)
            .then(({data}) => setUsuario(data))
            .finally(() => setCarregando(false))
    }, [username])

    if (carregando) return <Wrapper>Carregando...</Wrapper>
    if (!usuario) return <Wrapper>Usuário não encontrado.</Wrapper>

    return (
        <Wrapper>
            <Linha>
                {usuario.avatar && <Avatar src={usuario.avatar} alt={usuario.username}/>}
                <div>
                    <h2>@{usuario.username}</h2>
                    {usuario.display_name && <div>{usuario.display_name}</div>}
                </div>
            </Linha>

            {usuario.bio && (
                <Linha>
                    <strong>Bio</strong>
                    <div>{usuario.bio}</div>
                </Linha>
            )}
        </Wrapper>
    )
}