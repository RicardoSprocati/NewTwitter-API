import { Outlet } from 'react-router-dom'
import Cabecalho from './componentes/Cabecalho'
import { AppWrapper } from './App.estilo'

export default function App() {
  return (
    <AppWrapper>
      <Cabecalho />
      <main>
        <Outlet />
      </main>
    </AppWrapper>
  )
}

