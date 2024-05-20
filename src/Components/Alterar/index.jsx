import { useParams } from "react-router-dom"; // Para acessar parâmetros da rota
import { useEffect, useState } from "react";
import axios from 'axios'; // Para requisições HTTP
import Menu from "../Menu"; // Um menu para navegação no aplicativo

function Alterar() {
    const { produtoId } = useParams(); // Recupera o ID do parâmetro da rota
    const [produto, setProduto] = useState({
        produto: "",
        valor: "",
        quantidade: "",
        foto: ""
    });

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/produto/${produtoId}`);
                setProduto(response.data); // Define o estado com as informações do produto
            } catch (error) {
                console.error("Erro ao carregar o produto:", error);
            }
        };

        fetchProduto();
    }, [produtoId]); // Executa quando o produtoId muda

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede recarregamento do formulário
        try {
            const response = await axios.put(`http://localhost:3000/produto/${produtoId}`, produto);
            console.log("Produto atualizado:", response.data);
            // Lógica para redirecionar ou notificar sucesso
        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            // Lógica para tratar erros
        }
    };

    return (
        <div className="container">
            <Menu />
            <h1 className='mt-5 mb-5 text-center'>Alterar Produto</h1>
            {/* Formulário para alteração do produto */}
            <form onSubmit={handleSubmit} className='mb-5'>
                {/* Campos do formulário */}
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            value={produto.produto}
                            placeholder='Nome do Produto'
                            className='form-control'
                            onChange={(e) => setProduto({ ...produto, produto: e.target.value })}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            value={produto.valor}
                            placeholder='Valor'
                            className='form-control'
                            onChange={(e) => setProduto({ ...produto, valor: e.target.value })}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            value={produto.quantidade}
                            placeholder='Quantidade'
                            className='form-control'
                            onChange={(e) => setProduto({ ...produto, quantidade: e.target.value })}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            value={produto.foto}
                            placeholder='URL da Imagem'
                            className='form-control'
                            onChange={(e) => setProduto({ ...produto, foto: e.target.value })}
                        />
                    </div>
                </div>
                <button type='submit' className='btn btn-outline-success'>Alterar</button>
            </form>
        </div>
    );
}

export default Alterar;
