export type Usuario = {
    username: string
    email: string
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
}


export type Comentario = {
    id: number
    autor: number
    autor_username: string
    postagem: number
    conteudo: string
    criado_em: string
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
}