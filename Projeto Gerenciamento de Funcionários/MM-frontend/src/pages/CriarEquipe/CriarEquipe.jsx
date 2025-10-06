import './CriarEquipe.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EquipeDataService from '../../services/EquipeDataService';
import FuncionarioDataService from '../../services/FuncionarioDataService';
import { IoReturnDownBack } from "react-icons/io5";

const CriarEquipe = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [liderId, setLiderId] = useState("");
    const [funcionarios, setFuncionarios] = useState([]);
    const [erros, setErros] = useState({});
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchFuncionarios = async() => {
            try {
                const response = await FuncionarioDataService.getAll();
                const funcionarios = response.data;
                setFuncionarios(funcionarios.filter((funcionario) => funcionario.equipeId === id));
            } catch (error) { 
                console.log(error);
            }
        };

        const fetchEquipe = async () => {
            if (id) {
                try {
                    const response = await EquipeDataService.getById(id);
                    const { nome, descricao, liderId } = response.data;
                    setNome(nome);
                    setDescricao(descricao);
                    setLiderId(liderId || "none");
                } catch(error) {
                    console.log(error);
                }
            }
        }
 
        fetchFuncionarios();
        fetchEquipe();
    }, [id]);

    const validar = () => {
        let novosErros = {};

        if(!nome.trim() || nome.length < 3){
            novosErros.nome = "Nome precisa ter pelo menos 3 caracteres.";
        }

        if(!descricao.trim() || descricao.length < 10){
            novosErros.descricao = "Descrição precisa ter pelo menos 10 caracteres";
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    const onChangeNome = (e) => {
        setNome(e.target.value);
    };

    const onChangeDescricao = (e) => {
        setDescricao(e.target.value);
    };

    const onChangeLiderId = (e) => {
        setLiderId(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMensagem("");

        if(!validar()) return;
        
        let equipe = { nome, descricao, liderId };
        setCarregando(true);

        try{

            if (id) {
                await EquipeDataService.update(id, equipe);
                setMensagem("Equipe atualizada com sucesso!");
            } else {
                equipe.liderId = null;
                await EquipeDataService.create(equipe);
                setMensagem("Equipe cadastrada com sucesso!");
                setNome("");
                setDescricao("");
                setLiderId("");
            }
            setErros({});
        }catch(err){
            if(err.response && err.response.data && err.response.data.error) {
                setMensagem(err.response.data.error);
            } else {
                setMensagem(id ? "Erro ao atualizar equipe!" : "Erro ao cadastrar equipe!");
            }
        } finally {
            setCarregando(false);
        }
    };

    return(
        <div className="criarEquipe-div">
            <h2 className="criarEquipe-title">{id ? "Editar Equipe" : "Cadastrar Equipe"}</h2>

            <form onSubmit={handleSubmit} className="form-container">
                <input type="text" className="input-field" placeholder="Nome" value={nome} onChange={onChangeNome} required />
                {erros.nome && <span className="erro">{erros.nome}</span>}

                <textarea className="input-field" placeholder="Descrição" value={descricao} onChange={onChangeDescricao} required></textarea>
                {erros.descricao && <span className="erro">{erros.descricao}</span>}

                {id ? <select className="select-field" value={liderId} onChange={onChangeLiderId} required>
                    <option value="" disabled>Escolha o líder</option>
                    {funcionarios.map((funcionario) => (
                        <option key={funcionario._id} value={funcionario._id}>{funcionario.nome}</option>
                    )) }
                    <option value="none">Sem líder</option>
                </select> : null}

                <div className="button-container">
                    <button type="button" className="button voltar" onClick={() => navigate("/gerenciamento")} disabled={carregando}><IoReturnDownBack /> Voltar</button>
                    <button type="submit" className="button" disabled={carregando}>{carregando ? "Processando..." : id ? "Salvar Alterações" : "Cadastrar"}</button>
                </div>
        
                {mensagem && <p className={mensagem === "Equipe atualizada com sucesso!" || mensagem === "Equipe cadastrada com sucesso!" ? "mensagem" : "mensagem erro"}>{mensagem}</p>}
            </form>
        </div>
    );
}

export default CriarEquipe;