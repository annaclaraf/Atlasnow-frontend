import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api'

import { Sidebar } from '../../components/Sidebar/index'

import './style.css'

export function Funcionario() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [CPF, setCPF] = useState("");
    const [funcionario, setFuncionario] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/funcionarios', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFuncionario(response.data)
        }
        loadProducts()
    }, []);

    async function handleSearch(event) {
        event.preventDefault()

        try {
            const response = await api.get(`/funcionarios/${CPF}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setFuncionario(response.data)

            setCPF('')
        } catch (err) {
            console.log(err);
        }
    }

    async function paginaCadastro() {
        navigate('/funcionarios/cadastro')
    }

    return (
        <main>
            <Sidebar />

            <section>
                <header>
                    <h2>FUNCIONÁRIOS</h2>

                    <div>
                        <input
                            type="text"
                            placeholder="Buscar Funcionário"
                            onChange={event => setCPF(event.target.value)}
                            value={CPF}
                        />
                        <button onClick={handleSearch}>
                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>
                        </button>
                    </div>

                    <button onClick={paginaCadastro}>Cadastrar Funcionario</button>
                </header>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Setor</th>
                                <th></th>
                            </tr>
                        </thead>
                        {funcionario.map(func => {
                            return (
                                <tbody key={func.CPF}>
                                    <tr>
                                        <td>{func.nome}</td>
                                        <td>{func.setor}</td>
                                        <td>
                                            <button>Visualizar</button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
            </section>
        </main>
    );
}