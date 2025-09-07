import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ProvedorAutenticacao } from './contexto/AutenticacaoContexto'
import rotas from './rotas'
import { tema } from './estilos/tema'
import { GlobalStyle } from './estilos/GlobalStyle'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={tema}>
      <GlobalStyle theme={tema} />
      <ProvedorAutenticacao>
        <RouterProvider router={rotas} />
      </ProvedorAutenticacao>
    </ThemeProvider>
  </React.StrictMode>
)

