import React from 'react'
import ReactDOM from 'react-dom/client'
import { ProvedorAutenticacao } from './contexto/AutenticacaoContexto.tsx'
import { RouterProvider } from 'react-router-dom'
import rotas from './rotas.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProvedorAutenticacao>
      <RouterProvider router={rotas} />
    </ProvedorAutenticacao>
  </React.StrictMode>,
)
