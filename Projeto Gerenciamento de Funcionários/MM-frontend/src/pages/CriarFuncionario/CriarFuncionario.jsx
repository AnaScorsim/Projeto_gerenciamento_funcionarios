import './CriarFuncionario.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FuncionarioDataService from '../../services/FuncionarioDataService';
import EquipeDataService from '../../services/EquipeDataService';
import { IoReturnDownBack } from "react-icons/io5";

const CriarFuncionario = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [equipeId, setEquipeId] = useState("");
    const [equipes, setEquipes] = useState([]);
    const [erros, setErros] = useState({});
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchEquipes = async() => {
            try {
                const response = await EquipeDataService.getAll();
                setEquipes(response.data);
            } catch (error) { 
                console.log(error);
            }
        };

        const fetchFuncionario = async() => {
            if(id){
                try {
                    const response = await FuncionarioDataService.getById(id);
                    const { nome, email, telefone, equipeId } = response.data;
                    setNome(nome);
                    setEmail(email);
                    setTelefone(telefone);
                    setEquipeId(equipeId || "none");
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchEquipes();
        fetchFuncionario();
    }, [id]);

    const validar = () => {
        let novosErros = {};
        
        if(!nome.trim() || nome.length < 3){
            novosErros.nome = "Nome precisa ter pelo menos 3 caracteres.";
        }

        const conferirNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        if (!conferirNome.test(nome)) {
            novosErros.nome = "O nome deve conter apenas letras e espaços.";
        }

        const conferirEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!conferirEmail.test(email)) {
            novosErros.email = "Insira um email válido.";
        }

        const conferirTelefone = /^[0-9]{9,11}$/;
        if (!conferirTelefone.test(telefone)) {
            novosErros.telefone = "Insira um telefone válido (9 ou 11 dígitos, apenas números).";
        }

        if(equipeId === ""){
            novosErros.equipeId = "Selecione uma equipe.";
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    const onChangeNome = (e) => {
        setNome(e.target.value);
        setMensagem(""); 
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setMensagem("");
    };

    const onChangeTelefone = (e) => {
        setTelefone(e.target.value);
        setMensagem("");
    };

    const onChangeEquipeId = (e) => {
        setEquipeId(e.target.value);
        setMensagem("");
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMensagem("");
        
        if(!validar()) return;
        
        const funcionario = { nome, email, telefone, equipeId };
        setCarregando(true);

        try{
            if(id) {
                await FuncionarioDataService.update(id, funcionario);
                setMensagem("Funcionário atualizado com sucesso!");
            } else {
                await FuncionarioDataService.create(funcionario);
                setMensagem("Funcionário cadastrado com sucesso!");
                setNome("");
                setEmail("");
                setTelefone("");
                setEquipeId("");
            }
            setErros({});
        }catch(err){
            if (err.response && err.response.data && err.response.data.error) {
                setMensagem(err.response.data.error);
            } else {
                setMensagem(id ? "Erro ao atualizar funcionário!" : "Erro ao cadastrar funcionário!");
            }
        } finally {
            setCarregando(false);
        }
    };

    return(
        <div className="criarFuncionario-div">
            <h2 className="criarFuncionario-title">{id ? "Editar funcionário" : "Cadastrar Funcionário"}</h2>

            <form onSubmit={handleSubmit} className="form-container">
                <input type="text" className="input-field" placeholder="Nome" value={nome} onChange={onChangeNome}  required />
                {erros.nome && <span className="erro">{erros.nome}</span>}

                <input type="email" className="input-field" placeholder="Email" value={email} onChange={onChangeEmail} required />
                {erros.email && <span className="erro">{erros.email}</span>}

                <input type="text" className="input-field" placeholder="Telefone" value={telefone} onChange={onChangeTelefone} required />
                {erros.telefone && <span className="erro">{erros.telefone}</span>}

                <select className="select-field" value={equipeId} onChange={onChangeEquipeId} required>
                    <option value="" disabled>Escolha a equipe</option>
                    {equipes.map((equipe) => (
                        <option key={equipe._id} value={equipe._id}>{equipe.nome}</option>
                    )) }
                    <option value="none">Sem equipe</option>
                </select>
                {erros.equipeId && <span className="erro">{erros.equipeId}</span>}

                <div className="button-container">
                    <button type="button" className="button voltar" onClick={() => navigate("/gerenciamento")} disabled={carregando}><IoReturnDownBack /> Voltar</button>
                    <button type="submit" className="button" disabled={carregando}>{carregando ? "Processando..." : id ? "Salvar alterações" : "Cadastrar"}</button>
                </div>
                
                {mensagem && <p className={mensagem ==="Funcionário atualizado com sucesso!" || mensagem === "Funcionário cadastrado com sucesso!" ? "mensagem" : "mensagem erro"}>{mensagem}</p>}
            </form>
        </div>
    );
}

export default CriarFuncionario;