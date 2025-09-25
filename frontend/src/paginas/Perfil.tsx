import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import cliente from '../api/cliente'
import type { Usuario } from '../tipos'
import { FormPerfil, Avatar } from './Perfil.estilo'
import { trocarSenha } from '../api/auth'
import { useAuth } from '../contexto/AutenticacaoContexto'
import { BlocoSenha, Linha, Rotulo, Mensagem, Acoes } from './TrocaSenha.estilo'

export default function Perfil() {
    const {deslogar} = useAuth()
    const navigate = useNavigate()

    const [perfil, setPerfil] = useState<Usuario | null>(null)
    const [display_name, setDisplay_name] = useState('')
    const [bio, setBio] = useState('')
    const [avatar, setAvatar] = useState<File | null>(null)

    const [senhaAtual, setSenhaAtual] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const [confirma, setConfirma] = useState('')
    const [msg, setMsg] = useState<{ tipo: 'ok' | 'erro'; texto: string } | null>(null)
    const [senhaOcupada, setSenhaOcupada] = useState(false)
    const [sairDepois, setSairDepois] = useState(true) 



    useEffect(() => {
        cliente.get('/users/me/').then(({data}) => {
            setPerfil(data)
            setDisplay_name(data.display_name || '')
            setBio(data.bio || '')
        })
    }, [])

    async function salvar(e:React.FormEvent) {
        e.preventDefault()
        const form = new FormData()
        if (display_name !== undefined) form.append('display_name', display_name)
        if(bio !== undefined) form.append('bio', bio)
        if (avatar) form.append('avatar', avatar)
        await cliente.patch('/users/me/', form, { headers: { 'Content-Type': 'multipart/form-data'} })
        alert('Perfil atualizado')
    }

    async function enviarTrocaSenha(e: React.FormEvent) {
        e.preventDefault()
        setMsg(null)
        if (!senhaAtual || !novaSenha || !confirma) {
            setMsg({tipo: 'erro', texto: 'Preencha todos os campos de senha.'})
            return
        }
        if (novaSenha !== confirma) {
            setMsg({tipo:'erro', texto:'A confirmação não corresponde à nova senha.'})
            return
        }

        setSenhaOcupada(true)

        try {
            const { detalhe } = await trocarSenha({senha_atual: senhaAtual,nova_senha: novaSenha})
            setMsg({ tipo: 'ok', texto: detalhe || 'Senha alterada com sucesso.' })
            setSenhaAtual('')
            setNovaSenha('')
            setConfirma('')

            if (sairDepois) {
                deslogar()
                navigate('/entrar', {replace:true})
            }
        } catch (e: any) {
            const data = e?.response?.data
            let texto = 'Não foi possível alterar a senha.'

            if (typeof data ==='object' && data) {
                const parts: string[] = []
                for (const k of Object.keys(data)) {
                    const v = Array.isArray(data[k]) ? data[k].join(' ') : String(data[k])
                    parts.push(`${k}: ${v}`)
                }
                if (parts.length) texto = parts.join(' | ')
            }
            setMsg({ tipo:'erro', texto})
        } finally {
            setSenhaOcupada(false)
        }
    }

    if (!perfil) return null

    return (
        <>
            <FormPerfil onSubmit={salvar}>
                <h1>Meu Perfil</h1>
                {perfil.avatar && <Avatar src={perfil.avatar} width={80}/>}
                <input placeholder='Nome de exibição' value={display_name} onChange={(e) => setDisplay_name(e.target.value)} />
                <textarea placeholder='Sua Bio...' value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                <input type="file" onChange={(e) => setAvatar(e.target.files?.[0] || null)} />
                <button>Salvar</button>
            </FormPerfil>

            <BlocoSenha as="form" onSubmit={enviarTrocaSenha}>
                <h2>Trocar senha</h2>
                <Linha>
                    <Rotulo htmlFor='senha-atual'>Senha-atual</Rotulo>
                    <input id='senha_atual'
                    type='password'
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                    autoComplete='current-password'/>
                </Linha>
                <Linha>
                    <Rotulo htmlFor="nova-senha">Nova senha</Rotulo>
                    <input
                        id="nova-senha"
                        type="password"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        autoComplete="new-password"
                    />
                </Linha>

                <Linha>
                    <Rotulo htmlFor="confirma-senha">Confirmar nova senha</Rotulo>
                    <input
                        id="confirma-senha"
                        type="password"
                        value={confirma}
                        onChange={(e) => setConfirma(e.target.value)}
                        autoComplete="new-password"
                    />
                </Linha>
                <Linha>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                        type="checkbox"
                        checked={sairDepois}
                        onChange={(e) => setSairDepois(e.target.checked)}
                        />
                        Sair após trocar a senha (recomendado)
                    </label>
                </Linha>

                {msg && <Mensagem tipo={msg.tipo}>{msg.texto}</Mensagem>}

                <Acoes>
                    <button type='submit' disabled={senhaOcupada}>
                        {senhaOcupada ? 'Salvando...' : 'Atualizar senha'}
                    </button>
                </Acoes>
            </BlocoSenha>
        </>
    )
}