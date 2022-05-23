import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { api } from '../../../services/api'

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
            alert(err.response.data.error);
        }
    }

    async function paginaFuncionario() {
        navigate('/funcionarios')
    }

    return (
        <main>
            <Sidebar />

            <section className="cadastro">
                <header>
                    <h2>FUNCIONÁRIOS</h2>
                </header>

                <div className="wrapper-cadastro">
                    <h3>Preencha com as informações do Funcionário</h3>
                    <form>
                        <div className="nome">
                            <p>NOME:</p>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Nome Completo:"
                                onChange={event => setNome(event.target.value)}
                                required
                            />
                        </div>
                        <div className="align-1">
                            <div className="email">
                                <p>E-mail:</p>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email:"
                                    onChange={event => setEmail(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="cpf">
                                <p>CPF:</p>
                                <input
                                    id="CPF"
                                    type="text"
                                    placeholder="CPF:"
                                    onChange={event => setCPF(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="telefone">
                                <p>Telefone:</p>

                                <input
                                    id="telefone"
                                    type="text"
                                    placeholder="Telefone:"
                                    onChange={event => setTelefone(event.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="align-2">
                            <div className="cidade">
                                <p>Cidade:</p>

                                <input
                                    id="cidade"
                                    type="text"
                                    placeholder="Cidade:"
                                    onChange={event => setCidade(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="cep">
                                <p>CEP:</p>
                                <input
                                    id="CEP"
                                    type="text"
                                    placeholder="CEP:"
                                    onChange={event => setCEP(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="estado">
                                <p>Estado</p>

                                <input
                                    id="estado"
                                    type="text"
                                    placeholder="Estado:"
                                    onChange={event => setEstado(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="align-3">
                            <div className="rua">
                                <p>Rua:</p>

                                <input
                                    id="rua"
                                    type="text"
                                    placeholder="Rua:"
                                    onChange={event => setRua(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="numero">
                                <p>Número:</p>

                                <input
                                    id="numero"
                                    type="text"
                                    placeholder="Número:"
                                    onChange={event => setNumero(event.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="setor">
                            <p>Setor:</p>
                            <input
                                id="setor"
                                type="text"
                                placeholder="Setor:"
                                onChange={event => setSetor(event.target.value)}
                                required
                            />
                        </div>
                        <button className="button" onClick={handleCreate}>
                            Cadastrar
                        </button>
                    </form>
                </div>

                <footer>
                    <button className="button" onClick={paginaFuncionario}>
                        Voltar
                    </button>
                </footer>
            </section>
        </main>
    );
}