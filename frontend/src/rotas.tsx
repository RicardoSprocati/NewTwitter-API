import { createBrowserRouter } from 'react-router-dom'
import Feed from './paginas/Feed'
import Entrar from './paginas/Entrar'
import Registrar from './paginas/Registrar'
import Perfil from './paginas/Perfil'
import PostagemDetalhe from './paginas/PostagemDetalhe'
import RotaProtegida from './componentes/RotaProtegida'
import App from './App'

const rotas = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {index: true, element: <RotaProtegida><Feed/></RotaProtegida> },
            {path: 'perfil', element: <RotaProtegida><Perfil/></RotaProtegida>},
            { path: 'post/:id', element: <RotaProtegida><PostagemDetalhe/></RotaProtegida> },
            { path: 'entrar', element: <Entrar/> },
            { path: 'registrar', element: <Registrar/> }
        ]
    }
])

export default rotas