import React, { createContext, useContext, useEffect, useState } from 'react'
import { entrar, sair } from '../api/auth'


type Ctx = {
    autenticado: boolean
    logar: (u: string, s: string) => Promise<void>
    deslogar: () => void
}

const AutenticacaoContexto = createContext<Ctx>({ autenticado: false, logar: async () => {}, deslogar: () => {} })


export const ProvedorAutenticacao: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [autenticado, setAutenticado] = useState(false)


    useEffect(() => { setAutenticado(!!localStorage.getItem('token_acesso')) }, [])


    async function logar(username: string, senha: string) {
        await entrar(username, senha)
        setAutenticado(true)
    }
    function deslogar() {
        sair(); setAutenticado(false)
    }


    return (
        <AutenticacaoContexto.Provider value={{ autenticado, logar, deslogar }}>
            {children}
        </AutenticacaoContexto.Provider>
    )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AutenticacaoContexto)