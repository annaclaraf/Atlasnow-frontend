import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import { api } from '../../services/api'

import { Sidebar } from '../../components/Sidebar/index'

import './style.css'

export function Setor() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [Nome, setNome] = useState('')
  const [setor, setSetor] = useState([])
  const [load, setLoad] = useState([])

  useEffect(() => {
    async function loadSetor() {
      const response = await api.get('/setor', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSetor(response.data)
    }
    loadSetor()
  }, [load])

  async function handleSearch(event) {
    
    event.preventDefault()

    try {
      const response = await api.get(`/setor/nome/${Nome}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSetor(response.data)
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
    navigate('/setor/cadastrar')
  }
  async function Editar(nome,id) {
    await localStorage.setItem('nome', nome)
    await localStorage.setItem('id', id)
    navigate('/setor/editar')
  }
  async function Excluir(id) {
    if(window.confirm("Tem certeza que deseja excluir esse setor?")) {
      const response = await api.delete(`/setor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('O setor foi excluído!')
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
          <h2>SETORES</h2>

          <div id="buscar">
            <input
              type="text"
              placeholder="Buscar Setor"
              onChange={event => setNome(event.target.value)}
              value={Nome}
            />
            <button onClick={handleSearch}>
              <FaIcons.FaSearch />
            </button>
            <button onClick={handleReset}>
              <MdIcons.MdOutlineClear />
            </button>
          </div>
          <button className="button" onClick={paginaCadastro}>
            Cadastrar Setor
          </button>
        </header>

        <div>
          <table id="customers">
            <caption>Lista de Setores:</caption>
            <thead>
              <tr>
                <th>Setor</th>
                <th></th>
              </tr>
            </thead>
            {setor.map(func => {
              return (
                <tbody key={func.id}>
                  <tr>
                    <td className="nome">{func.nome}</td>

                    <td className="icones">
                      <button
                        onClick={() => Editar(func.nome,func.id)}
                        className="icon"
                      >
                        <FaIcons.FaUserEdit />
                        <br></br>
                        Editar
                      </button>
                      <button
                        onClick={() => Excluir(func.id)}
                        className="icon-delete"
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
