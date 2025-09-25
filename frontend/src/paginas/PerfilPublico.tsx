import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import cliente from "../api/cliente"
import { Wrapper, Linha, Avatar, Abas, AbaBotao, Lista, Item, NomeLinha, AvatarMini } from "./PerfilPublico.estilo"
import type { AbaTipo, SeguirItem, Usuario } from "../tipos"
import { BotaoSeguir } from "../componentes/BotaoSeguir.estilo"

export default function PerfilPublico() {
    const {username} = useParams()
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [eu, setEu] = useState<{username: string} | null>(null)

    const [seguindo, setSeguindo] = useState<boolean>(false)
    const [ocupado, setOcupado] = useState(false)
    const [carregando, setCarregando] = useState(true)

    const [aba, setAba] = useState<AbaTipo>("seguindo")
    const [listaSeguindo, setListaSeguindo] = useState<SeguirItem[]>([])
    const [listaSeguidores, setListaSeguidores] = useState<SeguirItem[]>([])
    const [meusSeguindo, setMeusSeguindo] = useState<Set<string>>(new Set())

    const souEu = useMemo(() => eu?.username && username && eu.username === username, [eu?.username, username])

    useEffect(() => {
        let ativo = true
        async function carregar() {
            if (!username) return
            setCarregando(true)
            try {
                const [{data: alvo}, {data:me}] = await Promise.all([
                    cliente.get(`/users/${username}/`),
                    cliente.get(`/users/me/`),
                ])
                if (!ativo) return
                setUsuario(alvo)
                setEu(me)

                const { data: euSigo } = await cliente.get(`/following/${me.username}/`)
                
                const setUsernames = new Set<string>(
                    (euSigo || [])
                        .map((r: any) => r.seguido_username)
                        .filter((v: any) => typeof v === 'string')
                )
                setMeusSeguindo(setUsernames)

                // estado "eu sigo o ALVO?"
                setSeguindo(setUsernames.has(username))

                // carregar listas do perfil público
                const [seg, sed] = await Promise.all([
                    cliente.get(`/following/${username}/`), // quem o alvo segue
                    cliente.get(`/followers/${username}/`), // quem segue o alvo
                ])
                setListaSeguindo(seg.data || [])
                setListaSeguidores(sed.data || [])
            } finally {
                if (ativo) setCarregando(false)
            }
        }
        carregar()
        return () => { ativo = false}
    }, [username])

    async function alternarSeguimento() {
        if (!usuario || !eu || ocupado || souEu) return
        setOcupado(true)

        try {
            if (!seguindo) {
                await cliente.post(`/follow/`, { seguido: usuario.id})
                setSeguindo(true)
            } else {
                await cliente.delete(`/unfollow/${usuario.username}/`)
                setSeguindo(false)
            }
        } catch (e) {
            console.error(e)
            alert("Não foi possível atualizar o seguimento.")
        } finally {
            setOcupado(false)
        }
    }

    async function seguirUsername(uname: string, idPossivel?: number) {
        let id = idPossivel
        if (!id) {
            const { data } = await cliente.get(`/users/${uname}/`)
            id = data.id
        }
        await cliente.post(`/follow/`, { seguido: id })
        setMeusSeguindo((s) => new Set([...s, uname])) 
    }

        async function deixarDeSeguirUsername(uname: string) {
        await cliente.delete(`/unfollow/${uname}/`)
        setMeusSeguindo((s) => {
            const n = new Set(s); n.delete(uname); return n
        })
        
        if (uname === username) setSeguindo(false)
    }

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

                {!souEu && (
                    <BotaoSeguir seguindo={seguindo}
                        onClick={alternarSeguimento}
                        disabled={ocupado}
                        aria-pressed={seguindo}>
                            {seguindo ? "Deixar de seguir" : "Seguir"}
                    </BotaoSeguir>
                )}
            </Linha>

            {usuario.bio && (
                <Linha>
                    <strong>Bio</strong>
                    <div>{usuario.bio}</div>
                </Linha>
            )}

            <Abas>
                <AbaBotao ativo={aba === "seguindo"} onClick={() => setAba("seguindo")}>
                    Seguindo ({listaSeguindo.length})
                </AbaBotao>
                <AbaBotao ativo={aba === "seguidores"} onClick={() => setAba("seguidores")}>
                    Seguidores ({listaSeguidores.length})
                </AbaBotao>
            </Abas>

            <Lista>
                {(aba === "seguindo" ? listaSeguindo : listaSeguidores).map((r) => {
                    const uname = aba === "seguindo" ? r.seguido_username : r.seguidor_username
                    const avatar = aba === "seguindo" ? r.seguido_avatar : r.seguidor_avatar
                    const idDoAlvo = aba === "seguindo" ? r.seguido : r.seguidor

                    if (!uname) return null

                    const souEuMesmo = eu?.username === uname                     
                    const jaSigo = meusSeguindo.has(uname)   

                    async function toggle() {
                        try {
                            if (jaSigo) {
                                await deixarDeSeguirUsername(uname!)
                            } else {
                                await seguirUsername(uname!, idDoAlvo)
                            }
                        } catch (e) {
                            console.error(e)
                            alert("Não foi possível atualizar o seguimento.")
                        }
                    }

                    return (
                        <Item key={r.id}>
                            <Link to={`/u/${uname}`} aria-label={`Ver perfil de @${uname}`}>
                                <AvatarMini src={avatar || "/avatar-placeholder.png"} alt={uname} loading="lazy" />
                            </Link>
                            <NomeLinha>
                                <Link to={`/u/${uname}`}>@{uname}</Link>
                            </NomeLinha>
                            <div>
                                {!souEuMesmo && (
                                    <button onClick={toggle}>
                                        {jaSigo ? "Deixar de seguir" : "Seguir"}
                                    </button>
                                )}
                            </div>
                        </Item>
                    )
                })}
            </Lista>
        </Wrapper>
    )
}