import { Outlet } from 'react-router-dom'
import Cabecalho from './componentes/Cabecalho'

function App() {
  

  return (
    <div>
      <Cabecalho />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
