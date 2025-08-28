import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexto/AutenticacaoContexto'

export default function RotaProtegida({children}: {children: React.ReactNode}) {
    const {autenticado} = useAuth()
    if (!autenticado) return <Navigate to="/entrar" replace/>
    return <>{children}</>
}