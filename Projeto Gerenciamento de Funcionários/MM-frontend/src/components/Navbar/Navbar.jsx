import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Navbar({ autenticado, logout }){
    const navigate = useNavigate();

    const handleLogout = async(e) => {
        e.preventDefault();
        logout();
        navigate('/');
    }

    return (
        <nav>
            <ul>
                { autenticado ? (
                    <>
                        <li>
                            <Link to="/">Início</Link>
                        </li>
                        <li>
                            <Link to="/criarEquipe">Criar Equipe</Link>
                        </li>
                        <li>
                            <Link to="/criarFuncionario">Cadastrar Funcionario</Link>
                        </li>
                        <li>
                            <Link to="/gerenciarFuncionarios">Gerenciar Funcionários</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>  
                ) : (
                    <>
                        <li>
                            <Link to="/">Início</Link>
                        </li>
                        <li>
                            <Link to="/cadastro">Cadastro</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
                
            </ul>
        </nav>
    );
}

export default Navbar;