import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { api } from '../../../services/api'

import './style.css'

import { Sidebar } from '../../../components/Sidebar/index'

export function FuncionarioCadastro() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [CPF, setCPF] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [setor, setSetor] = useState("");
    const [rua, setRua] = useState("");
    const [CEP, setCEP] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");


    async function handleCreate(event) {
        event.preventDefault()

        try {
            const response = await api.post('/funcionarios', {
                CPF,
                nome,
                email,
                telefone,
                setor,
                rua,
                CEP,
                numero,
                cidade,
                estado
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            navigate('/funcionarios');

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main>
            <Sidebar />

            <section className="cadastro">
                <header>
                    <h2>FUNCIONÁRIOS</h2>
                </header>

                <div>
                    <form>
                        <section className='form'>
                            <div>
                                <input
                                    id="nome"
                                    type="text"
                                    placeholder="Nome Completo:"
                                    onChange={event => setNome(event.target.value)}
                                    required
                                />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email:"
                                    onChange={event => setEmail(event.target.value)}
                                    required
                                />

                                <input
                                    id="CPF"
                                    type="text"
                                    placeholder="CPF:"
                                    onChange={event => setCPF(event.target.value)}
                                    required
                                />

                                <input
                                    id="telefone"
                                    type="text"
                                    placeholder="Telefone:"
                                    onChange={event => setTelefone(event.target.value)}
                                    required
                                />

                                <input
                                    id="setor"
                                    type="text"
                                    placeholder="Setor:"
                                    onChange={event => setSetor(event.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    id="rua"
                                    type="text"
                                    placeholder="Rua:"
                                    onChange={event => setRua(event.target.value)}
                                    required
                                />

                                <input
                                    id="numero"
                                    type="text"
                                    placeholder="Numero:"
                                    onChange={event => setNumero(event.target.value)}
                                    required
                                />

                                <input
                                    id="CEP"
                                    type="text"
                                    placeholder="CEP:"
                                    onChange={event => setCEP(event.target.value)}
                                    required
                                />

                                <input
                                    id="cidade"
                                    type="text"
                                    placeholder="Cidade:"
                                    onChange={event => setCidade(event.target.value)}
                                    required
                                />

                                <input
                                    id="estado"
                                    type="text"
                                    placeholder="Estado:"
                                    onChange={event => setEstado(event.target.value)}
                                    required
                                />
                            </div>
                        </section>
                    </form>
                </div>

                <footer>
                                 
                <button className="cadastrar" onClick={handleCreate}>Cadastrar</button>
                </footer>
            </section>
        </main>
    );
}