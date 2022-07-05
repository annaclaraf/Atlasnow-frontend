import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import { api } from '../../services/api'

import { Sidebar } from '../../components/Sidebar/index'

import './style.css'

export function Emissor() {
  const token = localStorage.getItem('token')

  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [emissor, setEmissor] = useState([])
  const [load, setLoad] = useState([])

  useEffect(() => {
    async function loadEmissores() {
      const response = await api.get('/emissores', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setEmissor(response.data)
    }
    loadEmissores()
  }, [load])

  async function handleSearch(event) {
    event.preventDefault()

    try {
      const response = await api.get(`/emissores/nome/${nome}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setEmissor(response.data)
    } catch (err) {
      alert(err.response.data.error)
    }
  }

  async function handleReset(event) {
    event.preventDefault()
    setNome('')
    setLoad()
  }

  async function paginaInicial() {
    navigate('/home')
  }
  async function paginaCadastro() {
    const response = await api.get('/funcionarios', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if(response.data.length == 0){
      alert('Nenhum funcionario cadastrado no sistema.')
      return
    }
    navigate('/emissor/cadastrar')
  }
  async function Visualizar(id) {
    await localStorage.setItem('id', id)
    navigate('/emissor/view')
  }
  async function Editar(id) {
    await localStorage.setItem('id', id)
    navigate('/emissor/editar')
  }
  async function Excluir(id) {
    if(window.confirm("Tem certeza que deseja excluir esse emissor?")) {
      const response = await api.delete(`/emissores/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('O emissor foi excluído!')
      setLoad(response)
    }
  }

  return (
    <main>
      <Sidebar />

      <section>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        <header id="busca">
          <h2>EMISSORES</h2>

          <div id="buscar">
            <input
              type="text"
              placeholder="Buscar Emissor"
              onChange={event => setNome(event.target.value)}
              value={nome}
            />
            <button onClick={handleSearch}>
              <FaIcons.FaSearch />
            </button>

            <button onClick={handleReset}>
              <MdIcons.MdOutlineClear />
            </button>
          </div>

          <button className="button" onClick={paginaCadastro}>
            Cadastrar Emissor
          </button>
        </header>

        <div>
          <table id="customers">
            <caption>Lista de Emissores:</caption>
            <thead>
              <tr>
                <th className="nome">Nome</th>
                <th>Data Admissão</th>
                <th></th>
              </tr>
            </thead>
            {emissor.map(emissor => {
              return (
                <tbody key={emissor.id}>
                  <tr>
                    <td className="nome">{emissor.nome}</td>
                    <td className="admissao">
                      {format(new Date(emissor.dataAdmissao), 'dd/MM/yyyy')}
                    </td>
                    <td className="icones">
                      <button
                        className="icon"
                        onClick={() => Visualizar(emissor.id)}
                      >
                        {' '}
                        <FaIcons.FaRegEye />
                        <br></br>
                        Visualizar
                      </button>
                      <button
                        className="icon"
                        onClick={() => Editar(emissor.id)}
                      >
                        <FaIcons.FaUserEdit />
                        <br></br>
                        Editar
                      </button>
                      <button
                        className="icon-delete"
                        onClick={() => Excluir(emissor.id)}
                      >
                        <FaIcons.FaUserTimes />
                        <br></br>
                        Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
        <footer>
          <button className="voltar" onClick={paginaInicial}>
            <FaIcons.FaRegArrowAltCircleLeft />
          </button>
        </footer>
      </section>
    </main>
  )
}
