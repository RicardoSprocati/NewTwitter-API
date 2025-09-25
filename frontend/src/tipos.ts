export type Usuario = {
    id: number
    username: string
    email?: string
    display_name?: string
    avatar?: string
    bio?: string
}


export type Postagem = {
    id: number
    autor: number
    autor_username: string
    conteudo: string
    midia?: string
    criado_em: string
    qtd_curtidas: number
    curtido_por_mim:boolean
    pode_comentar?: boolean
    autor_avatar?: string 
}


export type Comentario = {
    id: number
    autor: number
    autor_username: string
    postagem: number
    conteudo: string
    criado_em: string
    qtd_curtidas: number
    curtido_por_mim:boolean
    autor_avatar?: string 
}

export type UsuarioBasico = { 
    username: string
    display_name?: string
    avatar?: string
}

export type SeguirItem = {
    id: number
    seguidor: number
    seguido: number
    seguidor_username?: string
    seguido_username?: string
    seguidor_avatar?: string
    seguido_avatar?: string
}

export type FormInputs = {
    username: string
    email: string
    display_name?: string
    senha: string
}

export type AbaTipo = "seguindo" | "seguidores"