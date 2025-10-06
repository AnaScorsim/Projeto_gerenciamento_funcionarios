import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Cadastro.css';
import UsuarioDataService from '../../services/UsuarioDataService';
import { IoReturnDownBack } from 'react-icons/io5';
const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erros, setErros] = useState({});
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const validar = () => {
        let novosErros = {};

        if (!nome.trim() || nome.length < 3) {
            novosErros.nome = "Nome precisa ter pelo menos 3 caracteres";
        }

        const conferirNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        if (!conferirNome.test(nome)) {
            novosErros.nome = "O nome deve conter apenas letras e espaços.";
        }

        const conferirEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!conferirEmail.test(email)) {
            novosErros.email = "Insira um email válido.";
        }

        if(!senha || senha.trim().length < 6){
            novosErros.senha = "A senha precisa ter pelo menos 6 caracteres.";
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    const onChangeNome = (e) => {
        setNome(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangeSenha = (e) => {
        setSenha(e.target.value);
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        setMensagem("");

        if(!validar()) return;

        const usuario = { nome, email, senha };
        setCarregando(true);

        try{
            await UsuarioDataService.create(usuario);
            setMensagem('Usuário cadastrado com sucesso!');
            setNome("");
            setEmail("");
            setSenha("");
        }catch(err){
            if(err.response && err.response.data && err.response.data.error){
                setMensagem(err.response.data.error);
            } else {
                setMensagem('Erro ao cadastrar o usuário!');
            }
        } finally {
            setCarregando(false);
        }
    };

    return(
        <div className="cadastro-div">
            <h1 className="cadastro-title">Cadastro</h1>

            <form className="form-container" onSubmit={handleCadastro}>
                <input type="text" className="input-field" placeholder="Nome" value={nome} onChange={onChangeNome} required/>
                {erros.nome && <span className="erro">{erros.nome}</span>}

                <input type="email" className="input-field" placeholder="Email" value={email} onChange={onChangeEmail} required/>
                {erros.email && <span className="erro">{erros.email}</span>}

                <input type="password" className="input-field" placeholder="Senha" value={senha} onChange={onChangeSenha} required/>
                {erros.senha && <span className="erro">{erros.senha}</span>}

                <div className="button-container">
                    <button type="button" className="button voltar" onClick={() => navigate("/")} disabled={carregando}><IoReturnDownBack /> Voltar</button>
                    <button type="submit" className="button" disabled={carregando}>{carregando ? "Processando..." : "Cadastrar-se"}</button>
                </div>
                {mensagem && <p className={mensagem === "Usuário cadastrado com sucesso!"? "mensagem" : "erro"}>{mensagem}</p>}
            </form>
        </div>
        
    );
}

export default Cadastro;