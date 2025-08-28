import { useEffect, useState } from 'react'
import cliente from '../api/cliente'
import type { Usuario } from '../tipos'

export default function Perfil() {
    const [perfil, setPerfil] = useState<Usuario | null>(null)
    const [display_name, setDisplay_name] = useState('')
    const [bio, setBio] = useState('')
    const [avatar, setAvatar] = useState<File | null>(null)

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

    if (!perfil) return null
    return (
        <form onSubmit={salvar}>
            <h1>Meu Perfil</h1>
            {perfil.avatar && <img src={perfil.avatar} width={80}/>}
            <input placeholder='Nome de exibição' value={display_name} onChange={(e) => setDisplay_name(e.target.value)} />
            <textarea placeholder='Sua Bio...' value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            <input type="file" onChange={(e) => setAvatar(e.target.files?.[0] || null)} />
            <button>Salvar</button>
        </form>
    )
}