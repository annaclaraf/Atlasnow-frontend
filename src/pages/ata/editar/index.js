import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'
import { Sidebar } from '../../../components/Sidebar/index'

import './style.css'

export function AtaEditar() {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')

    const navigate = useNavigate()

    const [tituloReuniao, setTituloReuniao] = useState()
    const [dataInicio, setDataInicio] = useState()
    const [dataFim, setDataFim] = useState()
    const [pauta, setPauta] = useState()
    const [setor, setSetor] = useState()
    const [setores, setSetores] = useState([])
    const [descricao, setDescricao] = useState()
    const [palavrasChave, setPalavrasChave] = useState()
    const [ata, setAta] = useState()
    const [atas, setAtas] = useState([])

    useEffect(() => {
        async function loadAta() {
            const response = await api.get(`/atas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAtas(response.data)
        }
        loadAta()
    }, [])

    async function handleUpdate(event) {
        event.preventDefault()
        if (
            tituloReuniao == '' ||
            pauta == '' ||
            descricao == '' ||
            palavrasChave == '' ||
            ata == ''
        ) {
            alert("Nenhum campo pode ficar em branco")
            return
        }

        if (
            !tituloReuniao && 
            !dataInicio &&
            !dataFim &&
            !pauta &&
            !setor &&
            !descricao &&
            !palavrasChave &&
            !ata
        ) {
            navigate('/atas')
            return
        }

        
        try {
            await api.put(
                `/atas/${id}`,
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
                    <h2>Editar Ata</h2>
                </header>

                <div className="wrapper-cadastro">
                    <h3>Altere as informações da Ata</h3>

                    {atas.map(a => {
                        return (
                            <form key={a.id}>
                                <div className="titulo">
                                    <p>Titulo:</p>
                                    <input
                                        id="titulo"
                                        type="text"
                                        value={tituloReuniao || tituloReuniao == '' ? tituloReuniao : a.tituloReuniao}
                                        onChange={event => setTituloReuniao(event.target.value)}
                                    />
                                </div>
                                <div className="align-1">
                                    <div className="dataInicio">
                                        <p>Data Início:</p>

                                        <input
                                            id="dataInicio"
                                            type="datetime-local"
                                            value={
                                                dataInicio
                                                ? dataInicio
                                                : format(
                                                    new Date(a.dataInicio),
                                                        "yyyy-MM-dd'T'HH:mm"
                                                )
                                            }
                                            onChange={event => setDataInicio(event.target.value)}
                                        />
                                    </div>

                                    <div className="dataFim">
                                        <p>Data Fim:</p>
                                        <input
                                            id="dataFim"
                                            type="datetime-local"
                                            value={
                                                dataFim
                                                ? dataFim
                                                : format(
                                                    new Date(a.dataFim),
                                                        "yyyy-MM-dd'T'HH:mm"
                                                )
                                            }
                                            onChange={event => setDataFim(event.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="align-2">
                                    <div className="pauta">
                                        <p>Pauta:</p>

                                        <input
                                            id="pauta"
                                            type="text"
                                            value={pauta || pauta == '' ? pauta : a.pauta}
                                            onChange={event => setPauta(event.target.value)}
                                        />
                                    </div>
                                    <div className="setor">
                                        <p>Setor:</p>
                                        <select
                                            id="setor"
                                            onChange={event => setSetor(event.target.value)}
                                        >
                                            <option value="" disabled></option>
                                            {setores.map(set => {
                                                return (
                                                    <option key={set.id} value={set.nome} selected={set.nome == a.setor ? true : false}>
                                                        {set.nome}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="descricao">
                                        <p>Descrição:</p>
                                        <input
                                            id="descricao"
                                            type="text"
                                            value={descricao || descricao == '' ? descricao : a.descricao}
                                            onChange={event => setDescricao(event.target.value)}
                                        />
                                    </div>
                                    <div className="palavrasChave">
                                        <p>Palavras-Chave</p>

                                        <input
                                            id="palavrasChave"
                                            type="text"
                                            value={palavrasChave || palavrasChave == '' ? palavrasChave : a.palavrasChave}
                                            onChange={event => setPalavrasChave(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="align-3">
                                    <div className="ata">
                                        <p>Ata:</p>

                                        <textarea
                                            id="ata"
                                            value={ata || ata == '' ? ata : a.ata}
                                            onChange={event => setAta(event.target.value)}
                                            rows="10"
                                            cols="50"
                                        >

                                        </textarea>
                                    </div>
                                </div>
                                <button className="button" onClick={handleUpdate}>
                                    Confirmar Edição
                                </button>
                            </form>
                        )
                    })}
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
