import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.css';
import UsuarioDataService from '../../services/UsuarioDataService';
import { IoReturnDownBack } from "react-icons/io5"

const Login = () =>{
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erros, setErros] = useState({});
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const validar = () => {
        let novosErros = {};
        
        const conferirEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!conferirEmail.test(email)) {
            novosErros.email = "Insira um email válido.";
        }

        if(!senha || senha.trim().length < 6){
            novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeSenha = (e) => {
        setSenha(e.target.value);
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        setMensagem("");

        if(!validar()) return;

        const usuario = { email, senha };
        setCarregando(true);

        try{
            const response = await UsuarioDataService.login(usuario);
            if(response.token){
                navigate('/gerenciamento');
            }else{
                setMensagem("Email ou senha inválidos");
                return;
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.error){
                setMensagem(err.response.data.error);
            } else {
                setMensagem("Erro ao realizar login!");
            }
        } finally {
            setCarregando(false);
        }
    } 

    return (
        <div className="login-div">
            <h1 className="login-title">Login</h1>

            <form className="form-container" onSubmit={handleLogin}>
                <input type="email" className="input-field" placeholder="Email" value={email} onChange={onChangeEmail} required/>
                {erros.email && <span className="erro">{erros.email}</span>}

                <input type="password" className="input-field" placeholder="Senha" value={senha} onChange={onChangeSenha} required/>
                {erros.senha && <span className="erro">{erros.senha}</span>}

                <div className="button-container">
                    <button type="button" className="button voltar" onClick={() => navigate("/")} disabled={carregando}><IoReturnDownBack /> Voltar</button>
                    <button type="submit" className="button" disabled={carregando}>{carregando ? "Processando..." : "Login"}</button>
                </div>

                {mensagem && <p className="erro">{mensagem}</p>}
            </form>
            
        </div>
    );
}

export default Login;