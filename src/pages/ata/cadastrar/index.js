import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'
import { Sidebar } from '../../../components/Sidebar/index'

import './style.css'

export function AtaCadastro() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [tituloReuniao, setTituloReuniao] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [pauta, setPauta] = useState('')
    const [setor, setSetor] = useState('')
    const [setores, setSetores] = useState([])
    const [descricao, setDescricao] = useState('')
    const [palavrasChave, setPalavrasChave] = useState('')
    const [ata, setAta] = useState('')

    async function handleCreate(event) {
        event.preventDefault()
        try {
            await api.post(
                '/atas',
                {
                    tituloReuniao,
                    dataInicio,
                    dataFim,
                    pauta,
                    setor,
                    descricao,
                    palavrasChave,
                    ata
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            navigate('/atas')
        } catch (err) {
            alert(err.response.data.error)
        }
    }

    async function loadSetores() {
        const response = await api.get('/setor', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setSetores(response.data)
    }
    loadSetores()

    async function paginaAta() {
        navigate('/atas')
    }

    return (
        <main>
            <Sidebar />

            <section className="cadastro">
                <header>
                    <h2>ATAS</h2>
                </header>

                <div className="wrapper-cadastro-ata">
                    <h3>Preencha com as informações da Ata</h3>
                    <form>
                        <div className="titulo">
                            <p>Título:</p>
                            <input
                                id="titulo"
                                type="text"
                                placeholder="Título da Reunião"
                                onChange={event => setTituloReuniao(event.target.value)}
                                required
                            />
                        </div>
                        <div className="align-1">
                            <div className="dataInicio">
                                <p>Data Início:</p>

                                <input
                                    id="dataInicio"
                                    type="datetime-local"
                                    placeholder="Data de Início"
                                    onChange={event => setDataInicio(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="dataFim">
                                <p>Data Fim:</p>
                                <input
                                    id="dataFim"
                                    type="datetime-local"
                                    placeholder="Data Fim:"
                                    onChange={event => setDataFim(event.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="align-2">
                            <div className="pauta">
                                <p>Pauta:</p>

                                <input
                                    id="pauta"
                                    type="text"
                                    placeholder="Digite aqui a pauta da reunião"
                                    onChange={event => setPauta(event.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="descricao">
                                <p>Descrição:</p>
                                <input
                                    id="descricao"
                                    type="text"
                                    placeholder="Digite aqui a descrição da Reunião"
                                    onChange={event => setDescricao(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="setor">
                                <p>Setor:</p>
                                <select
                                    id="setor"
                                    onChange={event => setSetor(event.target.value)}
                                >
                                    <option value="">-Selecione-</option>
                                    {setores.map(func => {
                                        return (
                                            <option key={func.id} value={func.nome}>
                                                {func.nome}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>  
                           
                        </div>
                        
                        <div className="align-3">
                            <div className='participantes'>
                                <p>Participantes</p>
                                <input
                                    id="participantes"
                                    type="text"
                                    placeholder="Digite aqui o nome do fúncionário"
                                    onChange={event => setDescricao(event.target.value)}
                                    required
                                />

                            </div>
                            
                            <div className="ata">
                                <p>Ata:</p>

                                <textarea
                                    id="ata"
                                    placeholder="Digite aqui as informções tratadas da Reunião"
                                    onChange={event => setAta(event.target.value)}
                                  
                                    required
                                >

                                </textarea>
                            </div>
                            <div className="palavrasChave">
                                <p>Palavras-Chave:</p>

                                <input
                                    id="palavrasChave"
                                    type="text"
                                    placeholder="Palavras-Chave:"
                                    onChange={event => setPalavrasChave(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button className="button" onClick={handleCreate}>
                            Cadastrar
                        </button>
                    </form>
                </div>

                <footer>
                    <button className="voltar" onClick={paginaAta}>
                        <FaIcons.FaRegArrowAltCircleLeft />
                    </button>
                </footer>
            </section>
        </main>
    )
}
