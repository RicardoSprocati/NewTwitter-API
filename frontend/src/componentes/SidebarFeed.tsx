import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import cliente from "../api/cliente"
import {
    Caixa, BuscaWrap, CampoBusca, Sugestoes, Sugestao,
    Abas, Aba, ListaUsuarios, ItemUsuario, Aviso
} from "./SidebarFeed.estilo"
import type { AbaTipo, SeguirItem, UsuarioBasico } from "../tipos"



export default function SidebarFeed() {
    const [eu, setEu] = useState<UsuarioBasico | null>(null)
    const [aba, setAba] = useState<AbaTipo>("seguindo")
    const [seguindo, setSeguindo] = useState<SeguirItem[]>([])
    const [seguidores, setSeguidores] = useState<SeguirItem[]>([])

    const [q, setQ] = useState("")
    const [sugestao, setSugestao] = useState<UsuarioBasico[]>([])
    const [carregandoSugestao, setCarregandoSugestao] = useState(false)

    useEffect(() => {
        cliente.get("/users/me/").then(({data}) => setEu(data))
    }, [])

    useEffect(() => {
        if(!eu?.username) return
        cliente.get(`/following/${eu.username}/`).then(({data}) => setSeguindo(data))
        cliente.get(`/followers/${eu.username}/`).then(({ data }) => setSeguidores(data))
    }, [eu?.username])

    useEffect(() => {
        if (!q.trim()) {setSugestao([]); return}

        const t = setTimeout(async () => {
            try {
                setCarregandoSugestao(true)
                const {data} = await cliente.get(`/users/search/`, {params: {q}})
                setSugestao(data)
            } finally {
                setCarregandoSugestao(false)
            }
        }, 300)
        return () => clearTimeout(t)
    }, [q])

    const ListaAba = useMemo(() => (aba ==="seguindo" ? seguindo : seguidores), [aba, seguindo, seguidores])

    return (
        <Caixa>
            <BuscaWrap>
                <CampoBusca placeholder="Pesquisar usuários" value={q} onChange={(e) => setQ(e.target.value)}/>
                {q && (
                    sugestao.length > 0 ? (
                        <Sugestoes>
                            {sugestao.map((u) => (
                                <Sugestao key={u.username}>
                                    <Link to={`/u/${u.username}`}>
                                        @{u.username}{u.display_name ? ` — ${u.display_name}` : ""}
                                    </Link>
                                </Sugestao>
                            ))}
                        </Sugestoes>
                    ) : (
                        !carregandoSugestao && <Aviso>Nenhum usuário encontrado.</Aviso>
                    )
                )}
            </BuscaWrap>

            <Abas>
                <Aba ativa={aba === "seguindo"} onClick={() => setAba("seguindo")}>Seguindo</Aba>
                <Aba ativa={aba === "seguidores"} onClick={() => setAba("seguidores")}>Seguidores</Aba>
            </Abas>

            {ListaAba.length === 0 ? (
                <Aviso>
                    {aba === "seguindo" ? "Você ainda não segue ninguém." : "Ainda não há seguidores."}
                </Aviso>
            ) : (
                <ListaUsuarios>
                    {ListaAba.map((item) => {
                        const username = aba === "seguindo" ? item.seguido_username : item.seguidor_username
                        if (!username) return null
                        return (
                            <ItemUsuario key={item.id}>
                                <Link to={`/u/${username}`}>@{username}</Link>
                            </ItemUsuario>
                        )
                    })}
                </ListaUsuarios>
            )}
        </Caixa>
    )
}