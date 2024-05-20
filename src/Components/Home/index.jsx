import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../Menu'
import axios from 'axios'

function Home() {

    const url = "http://localhost:3000/produto"

    const [produto, setProduto] = useState('')
    const [valor, setValor] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [foto, setFoto] = useState('')

    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    const Inserir = () => {
        axios.post(url, {
            produto, valor, quantidade, foto
        })
        window.location.reload();

    }
    const deletar = (id) => {
        axios
            .delete(url + "/" + id)
            .then(() => {
                setData(data.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.log(error.message);
            });

    }

    const cadastrar = (e) => {
        e.preventDefault()

        if (produto === "") {
            alert("Por favor preencha o campo nome do produto")
        } else if (valor === "") {
            alert("Por favor preencha o campo valor do produto")
        } else if (quantidade === "") {
            alert("Por favor preencha o campo quantidade do produto")
        } else if (foto === "") {
            alert("Por favor preencha o campo foto do produto")
        } else {
            alert("Produto cadastrado com sucesso!")
            Inserir()
            setProduto('')
            setValor('')
            setQuantidade('')
            setFoto('')
        }

    }

    return (
        <div className='container'>
            <Menu />
            <h1 className='mt-5 mb-5 text-center'>Cadastro de Produtos</h1>
            <form onSubmit={cadastrar} className='mb-5'>

                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            value={produto}
                            placeholder='nome do Produto'
                            className='form-control'
                            onChange={(e) => setProduto(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            value={valor}
                            placeholder='valor'
                            className='form-control'
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            value={quantidade}
                            placeholder='Quantidade'
                            className='form-control'
                            onChange={(e) => setQuantidade(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            value={foto}
                            placeholder='Url da imagem'
                            className='form-control'
                            onChange={(e) => setFoto(e.target.value)}
                        />
                    </div>
                </div>


                <button type='submit' className={`btn btn-outline-success`}>Inserir</button>

            </form>

            <table className='table table'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Nome do Produto</th>
                        <th scope='col'>Valor</th>
                        <th scope='col'>Quantidade</th>
                        <th scope='col'>Imagem</th>
                        <th scope='col' className='text-center'>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {data.map((item) => (
                        <tr key={item.id}>
                            <th scope='row'>{item.id}</th>
                            <td>{item.produto}</td>
                            <td> R$ {item.valor}</td>
                            <td>{item.quantidade}</td>
                            <td>
                                <img width="50px" src={item.foto} alt="imagem do produto" />
                            </td>
                            <td>
                                <div className="btn-group d-flex gap-1">
                                    <Link
                                        to={`/alterar/${item.id}`} // Passa o ID como parte da URL
                                        className="btn btn-outline-primary fa-solid fa-pen-to-square"
                                    />
                                    <button onClick={() => deletar(item.id)} className='btn btn-outline-success'>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>

    )
}

export default Home