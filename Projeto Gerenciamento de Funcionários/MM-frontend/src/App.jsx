import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio';
import Cadastro from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import CriarEquipe from './pages/CriarEquipe/CriarEquipe';
import CriarFuncionario from './pages/CriarFuncionario/CriarFuncionario';
import Gerenciamento from './pages/Gerenciamento/Gerenciamento';
import AdicionarFuncionarios from './pages/AdicionarFuncionarios/AdicionarFuncionarios';

const App = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criarEquipe" element={<CriarEquipe />} />
          <Route path="/criarFuncionario" element={<CriarFuncionario />} />
          <Route path="/gerenciamento" element={<Gerenciamento />} />
          <Route path="/editarEquipe/:id" element={<CriarEquipe />} />
          <Route path="/editarFuncionario/:id" element={<CriarFuncionario />} />
          <Route path="/adicionarFuncionarios/:id" element={<AdicionarFuncionarios />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
