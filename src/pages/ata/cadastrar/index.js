import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'
import { Sidebar } from '../../../components/Sidebar/index'
import * as IosIcons from "react-icons/io";

import './style.css'


export function AtaCadastro() {
    const token = localStorage.getItem('token')
    const emissor = localStorage.getItem('emissor')
    const navigate = useNavigate()

    const [tituloReuniao, setTituloReuniao] = useState('')
    const [status, setStatus] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [pauta, setPauta] = useState('')
    const [setor, setSetor] = useState('')
    const [setores, setSetores] = useState([])
    const [descricao, setDescricao] = useState('')
    const [palavrasChave, setPalavrasChave] = useState([''])
    const [ata, setAta] = useState('')
    const [participantes, setParticipantes] = useState([''])
    const [funcionarios, setFuncionarios] = useState([])

    useEffect(() => {
        async function loadFunc() {
            const response = await api.get('/funcionarios', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFuncionarios(response.data)
        }
        loadFunc();
      }, []);

    async function handleCreate(event) {
        event.preventDefault()
        try {
            const response = await api.post( 
                '/atas',
                {
                    emissorId: emissor,
                    tituloReuniao,
                    status,
                    dataInicio,
                    dataFim,
                    pauta,
                    setor,
                    descricao,
                    palavrasChave: palavrasChave.toString(),
                    ata
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            participantes.forEach(p => {
                api.post( 
                    '/atas/participantes',
                    {
                        funcionarioCPF: p,
                        ataId: response.data[0].id
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

            })


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

    const addInputPalavra = (e) => {
        e.preventDefault()
        setPalavrasChave([...palavrasChave, ""])
    }
    const addInputParticipante = (e) => {
        e.preventDefault()
        setParticipantes([...participantes, ""])
    }
    const handleChangePalavras = (e, index) => {
        palavrasChave[index] = e.target.value
        setPalavrasChave([...palavrasChave])
    }
    const handleChangeParticipante = (e, index) => {
        participantes[index] = e.target.value
        setParticipantes([...participantes])
    }
    const handleRemoveInputParticipante = (position) => {
        if(position == 0){
            setParticipantes([...participantes.filter((_, index) => index == position)])
        }else
        setParticipantes([...participantes.filter((_, index) => index !== position)])
    }
    const handleRemoveInputPalavra = (position) => {
        if(position == 0){
            setPalavrasChave([...palavrasChave.filter((_, index) => index == position)])
        }else
        setPalavrasChave([...palavrasChave.filter((_, index) => index !== position)])
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
                        <div className="align-2">
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
                            <div className="status">
                                <p>Status:</p>
                                <label>Publica</label>
                                <input
                                    type="radio"
                                    value="publica"
                                    name="status"
                                    onChange={event => setStatus(event.target.value)}
                                    required
                                />
                                <label>Publica</label>
                                <input
                                    type="radio"
                                    value="privada"
                                    name="status"
                                    onChange={event => setStatus(event.target.value)}
                                />
                            </div>

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
                            <div >
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

                        <div className="align-2">
                            <div className="pauta">
                                <p>Pauta:</p>

                                <textarea
                                    id="ata"
                                    placeholder="Digite aqui as informções tratadas da Reunião"
                                    onChange={event => setPauta(event.target.value)}
                                    rows="5"
                                    cols="40"
                                    autoFocus
                                    spellCheck
                                    wrap='hard'
                                    required>
                                </textarea>
                            </div>

                            <div className="descricao">
                                <p>Descrição:</p>
                                <textarea
                                    id="descricao"
                                    placeholder="Digite aqui a Descrição da Ata"
                                    onChange={event => setDescricao(event.target.value)}
                                    rows="5"
                                    cols="40"
                                    autoFocus
                                    spellCheck
                                    wrap='hard'
                                    required>
                                </textarea>
                            </div>


                        </div>
                        <div className='align-3'>
                        <button className='add' onClick={addInputPalavra}>
                                    <IosIcons.IoIosAddCircleOutline />
                                </button>
                            <div className="palavrachave">
                                
                                
                                
                                

                                {palavrasChave.map((palavrasChave, index) => (
                                    <div key={index} className="palavrasChave">
                                        
                                            <p for={`Palavra-Chave ${index + 1}:`}> {`Palavra-Chave ${index + 1}:`}</p>
                                            <div style={{ display: "flex" }}>
                                            <input
                                                id={`Palavra-Chave${index + 1}:`}
                                                type="text"
                                                placeholder={`Palavra-Chave ${index + 1}:`}
                                                onChange={(e) => handleChangePalavras(e, index)}
                                                required
                                            />
                                            <button
                                               
                                                onClick={() => { handleRemoveInputPalavra(index) }}><IosIcons.IoIosRemoveCircleOutline/></button>
                                        </div>
                                    </div>
                                ))}


                            </div>
                            <div></div>
                            <button className='add' onClick={addInputParticipante}>
                                    <IosIcons.IoIosAddCircleOutline />
                                </button>

                            <div className="participante">
                               

                                {participantes.map((participantes, index) => (

                                    <div key={index} >

                                        <p for={`Participante ${index + 1}:`}> {`Participante ${index + 1}:`}</p>
                                        <div style={{ display: "flex" }}>
                                            <input
                                                id={`Participante${index + 1}:`}
                                                type="text"
                                                list="funcionario"
                                                placeholder={`Participante ${index + 1}:`}
                                                onChange={(e) => handleChangeParticipante(e, index)}
                                                required
                                            />
                                        
                                            
                                            
                                                <button 
                                                    
                                                  onClick={() => { handleRemoveInputParticipante(index) }}><IosIcons.IoIosRemoveCircleOutline/>
                                               </button>
                                           
                                            
                                        </div>
                                    </div>
                                ))}

                                
                                <datalist id="funcionario">
                                    {funcionarios.map(f => {
                                        return (
                                        <option value={f.CPF}>{f.nome}</option>
                                        )
                                    })}
                                </datalist>


                            </div>


                        </div>






                        <div className="ata">
                            <p>Ata:</p>

                            <textarea
                                id="ata"
                                placeholder="Digite aqui as informções tratadas da Reunião"
                                onChange={event => setAta(event.target.value)}
                                rows="10"
                                cols="80"
                                autoFocus
                                spellCheck
                                wrap='hard'
                                required
                            >

                            </textarea>
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
