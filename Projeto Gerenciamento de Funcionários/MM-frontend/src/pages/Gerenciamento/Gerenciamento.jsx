import "./Gerenciamento.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EquipeDataService from "../../services/EquipeDataService";
import FuncionarioDataService from "../../services/FuncionarioDataService";
import { FaUsers, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

const Gerenciamento = () => {
    const [ abaAtiva, setAbaAtiva ] = useState("equipes");
    const [ equipes, setEquipes ] = useState([]);
    const [ funcionarios, setFuncionarios ] = useState([]);
    const [ buscaEquipe, setBuscaEquipe ] = useState("");
    const [ buscaFuncionario, setBuscaFuncionario ] = useState("");
    const [ equipesFiltradas, setEquipesFiltradas ] = useState([]);
    const [ funcionariosFiltrados, setFuncionariosFiltrados ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEquipes = async () => {
            try {
                const response = await EquipeDataService.getAll();
                const equipesOrdenadas = (response.data || []).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
                setEquipes(equipesOrdenadas);
                setEquipesFiltradas(equipesOrdenadas);
            } catch (error) {
                console.error(error);
                setEquipes([]);
                setEquipesFiltradas([]);
            }
        };

        const fetchFuncionarios = async () => {
            try {
                const response = await FuncionarioDataService.getAll();
                const funcionariosOrdenados = (response.data || []).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
                setFuncionarios(funcionariosOrdenados);
                setFuncionariosFiltrados(funcionariosOrdenados);
            } catch (error) {
                console.error(error);
                setFuncionarios([]);
                setFuncionariosFiltrados([]);
            }
        };

        fetchEquipes();
        fetchFuncionarios();
    }, []);

    const onChangeBuscaEquipe = (e) => {
        setBuscaEquipe(e.target.value);
    };

    const onChangeBuscaFuncionario = (e) => {
        setBuscaFuncionario(e.target.value);
    };

    const handlePesquisarEquipe = () => {
        if (buscaEquipe.trim()) {
            const resultado = equipes.filter((equipe) =>
                equipe.nome?.toLowerCase().includes(buscaEquipe.toLowerCase())
            );
            setEquipesFiltradas(resultado);
        } else {
            setEquipesFiltradas(equipes);
        }
    };

    const handlePesquisarFuncionario = () => {
        if (buscaFuncionario.trim()) {
            const resultado = funcionarios.filter((funcionario) =>
                funcionario.nome?.toLowerCase().includes(buscaFuncionario.toLowerCase())
            );
            setFuncionariosFiltrados(resultado);
        } else {
            setFuncionariosFiltrados(funcionarios);
        }
    }

    const handleExcluirEquipe = async (equipeId) => {
        const confirmarExclusao = window.confirm("Tem certeza que deseja excluir esta equipe?");

        if(confirmarExclusao){
            try {
                await EquipeDataService.delete(equipeId);
                const novasEquipes = equipes.filter((equipe) => equipe._id!== equipeId);
                setEquipes(novasEquipes);
                setEquipesFiltradas(novasEquipes);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleExcluirFuncionario = async (funcionarioId) => {
        const confirmarExclusao = window.confirm("Tem certeza que deseja excluir este funcionário?");

        if(confirmarExclusao){
            try {
                console.log(confirmarExclusao);
                await FuncionarioDataService.delete(funcionarioId);
                const novosFuncionarios = funcionarios.filter((funcionario) => funcionario._id!== funcionarioId);
                setFuncionarios(novosFuncionarios)
                setFuncionariosFiltrados(novosFuncionarios);
            } catch (err) {
                console.error(err);
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="gerenciamento-div">
            <div className="abas">
                <button className={abaAtiva === "equipes" ? "aba ativa" : "aba"} onClick={() => setAbaAtiva("equipes")}>Equipes</button>
                <button className={abaAtiva === "funcionarios" ? "aba ativa" : "aba"} onClick={() => setAbaAtiva("funcionarios")}>Funcionários</button>
            </div>
            <div className="conteudo">
                {abaAtiva === "equipes" ? (
                    <>
                        <div className="search-container">
                            <input className="search-input" type="text" placeholder="Digite o nome de uma equipe..." value={buscaEquipe} onChange={onChangeBuscaEquipe}/>
                            <button className="search-button" onClick={handlePesquisarEquipe}>Pesquisar</button>
                        </div>
                        <div className="tabela">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Líder</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipesFiltradas.map((equipe) => (
                                        <tr key={equipe._id}>
                                            <td>{equipe.nome}</td>
                                            <td>{equipe.descricao}</td>
                                            <td>{(funcionarios.find((funcionario) => funcionario._id === equipe.liderId) || { nome: "Sem líder" }).nome}</td>
                                            <td className="acoes">
                                                    <button className="botao-acao adicionar" onClick={() => {navigate(`/adicionarFuncionarios/${equipe._id}`)}}>Adicionar funcionários</button>
                                                    <button className="botao-acao editar" onClick={() => {navigate(`/editarEquipe/${equipe._id}`)}}>Editar</button>
                                                    <button className="botao-acao excluir" onClick={() => {handleExcluirEquipe(equipe._id)}}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="botoes-container">
                            <button className="botao cadastrar" onClick={() => navigate("/criarEquipe")}><FaUsers /> Cadastrar Equipes</button>
                            <button className="botao logout" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="search-container">
                            <input className="search-input" type="text" placeholder="Digite o nome de um funcionário..." value={buscaFuncionario} onChange={onChangeBuscaFuncionario}/>
                            <button className="search-button" onClick={handlePesquisarFuncionario}>Pesquisar</button>
                        </div>
                        <div className="tabela">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Equipe</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {funcionariosFiltrados.map((funcionario) => (
                                        <tr key={funcionario._id}>
                                            <td>{funcionario.nome}</td>
                                            <td>{funcionario.email}</td>
                                            <td>{funcionario.telefone}</td>
                                            <td>{(equipes.find((equipe) => equipe._id === funcionario.equipeId) || { nome: "Sem equipe" }).nome}</td>
                                            <td className="acoes">
                                                <button className="botao-acao editar" onClick={() => {navigate(`/editarFuncionario/${funcionario._id}`)}}>Editar</button>
                                                <button className="botao-acao excluir" onClick={() => {handleExcluirFuncionario(funcionario._id)}}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="botoes-container">
                            <button type="button" className="botao cadastrar" onClick={() => navigate("/criarFuncionario")}><FaUserPlus /> Cadastrar Funcionários</button>
                            <button type="button" className="botao logout" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Gerenciamento;

