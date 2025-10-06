import "./AdicionarFuncionarios.css"
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FuncionarioDataService from '../../services/FuncionarioDataService';
import EquipeDataService from '../../services/EquipeDataService';
import { IoReturnDownBack } from "react-icons/io5";

const AdicionarFuncionarios = () => {
    const [funcionariosFiltrados, setFuncionariosFiltrados] = useState([]);
    const [equipes, setEquipes] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchFuncionarios = async () => {
        try {
            const response = await FuncionarioDataService.getAll();
            const funcionarios = response.data;
            setFuncionariosFiltrados(funcionarios.filter((funcionario) => funcionario.equipeId !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFuncionarios();

        const fetchEquipes = async () => {
            try {
                const response = await EquipeDataService.getAll();
                setEquipes(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchEquipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleCheckboxChange = (funcionarioId) => {
        setSelecionados((prevSelecionados) => 
            prevSelecionados.includes(funcionarioId) ? prevSelecionados.filter((id) => id !== funcionarioId) : [...prevSelecionados, funcionarioId]
        );
    };

    const handleSalvar = async () => {
        try {
            for (const funcionarioId of selecionados) {
                await FuncionarioDataService.update(funcionarioId, {equipeId: id});
            }

            alert("Funcionários adicionados à equipe com sucesso!");
            setSelecionados([]);

            await fetchFuncionarios();
        } catch(err) {
            console.log(err);
            alert("Erro ao adicionar os funcionários à equipe.");
        }
    };

    return (
        <div className="adicionar-div">
            <div className="adicionar-conteudo">
                <div className="adicionar-tabela">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Equipe atual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funcionariosFiltrados.map((funcionario) => (
                                <tr key={funcionario._id} className="adicionarFuncionarios">
                                    <td className="checkbox"><input type="checkbox" checked={selecionados.includes(funcionario._id)} onChange={() => handleCheckboxChange(funcionario._id)}/></td>
                                    <td>{funcionario.nome}</td>
                                    <td>{funcionario.email}</td>
                                    <td>{funcionario.telefone}</td>
                                    <td>{(equipes.find((equipe) => equipe._id === funcionario.equipeId) || {nome: "Sem equipe"}).nome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="adicionar-button-container">
                    <button className="adicionar-button" onClick={() => navigate(`/gerenciamento`)}><IoReturnDownBack /> Voltar</button>
                    <button className="adicionar-button" onClick={handleSalvar} disabled={selecionados.length === 0}>Salvar</button>
                </div>
            </div>
        </div>
    )
}

export default AdicionarFuncionarios;
