import './Inicio.css';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
    const navigate = useNavigate();

    return(
        <div className="inicio-div">
            <h1 className="inicio-title">Projeto: Sistema de Gerenciamento de Funcionários</h1>
            <div className="inicio-text">
                <p>Este é um sistema de gerenciamento de funcionários que permite armazenar nome, email e telefone dos funcionários, além de permitir ligá-los a equipes.</p>
                <p>Para usar esse sistema é preciso criar um cadastro e então fazer login. Após fazer isso é possível acessar as páginas de cadastro, listagem, edição e deleção de funcionários e de equipes.</p>
            </div>
            <button className="inicio-button" onClick={() => navigate("/cadastro")}>Cadastrar-se</button>
            <button className="inicio-button" onClick={() => navigate("/login")}>Login</button>
        </div>
    );
}

export default Inicio;