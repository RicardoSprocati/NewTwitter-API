import cliente from './cliente'


export async function entrar(username: string, password: string) {
    const { data } = await cliente.post('/auth/login/', { username, password })
    localStorage.setItem('token_acesso', data.access)
    localStorage.setItem('token_refresh', data.refresh)
    return data
}


export async function registrar(payload: { username: string; email: string; display_name?: string; senha: string }) {
    const { data } = await cliente.post('/auth/register/', payload)
    return data
}


export function sair() {
    localStorage.removeItem('token_acesso')
    localStorage.removeItem('token_refresh')
}

export async function trocarSenha(payload: {senha_atual: string; nova_senha: string}) {

    const {data} = await cliente.post('/auth/change-password/', payload)
    return data as {detalhe: string}
}