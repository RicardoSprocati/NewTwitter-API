import axios from 'axios'

// cria uma const que armazena a URL base
const cliente = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://ec2-18-118-173-210.us-east-2.compute.amazonaws.com/api'
})

// pega a senha e adiciona na requisição 
cliente.interceptors.request.use((config) => {
    const token = localStorage.getItem('token_acesso')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})


cliente.interceptors.response.use(
    // callback de sucesso 
    (r) => r,
    // callback de erro 
    async (erro) => {
        const original = erro.config
        // verifica se é falta de autorização e anula refreh infinito
        if (erro.response?.status === 401 && !original._tentouRefresh) {
            original._tentouRefresh = true
            const refresh = localStorage.getItem('token_refresh')
            // verifica se tem token_refresh
            if (refresh) {
                try {
                    // data contém a resposta da API, com as chaves access e refresh
                    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh/`, { refresh })

                    // grava o token access no localStorage
                    localStorage.setItem('token_acesso', data.access)

                    //substitui token velho pelo novo 
                    original.headers.Authorization = `Bearer ${data.access}`

                    return cliente(original)
                } catch (e) {
                    console.warn("Falha ao tentar refresh do token:", e)
                }
            }
        }
        return Promise.reject(erro)
    }
)


export default cliente