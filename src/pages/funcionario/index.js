import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../services/api'

import { Sidebar } from '../../components/Sidebar/index'

import './style.css'

export function Funcionario() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [CPF, setCPF] = useState('')
  const [funcionario, setFuncionario] = useState([])

  useEffect(() => {
    async function loadFuncionarios() {
      const response = await api.get('/funcionarios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setFuncionario(response.data)
    }
    loadFuncionarios()
  }, [])

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
      console.log(err)
    }
  }

  async function paginaInicial() {
    navigate('/home')
  }
  async function paginaCadastro() {
    navigate('/funcionarios/cadastro')
  }
  async function Visualizar(cpf) {
    await localStorage.setItem('cpf', cpf)
    navigate('/funcionarios/view')
  }
  async function Editar(cpf) {
    await localStorage.setItem('cpf', cpf)
    navigate('/funcionarios/editar')
  }
  async function Excluir(cpf) {
    await api.delete(`/funcionarios/${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    alert('O funcionarios foi excluído!')
    navigate('/funcionarios')
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
          <h2>FUNCIONÁRIOS</h2>

          <div id="buscar">
            <input
              type="text"
              placeholder="Buscar Funcionário"
              onChange={event => setCPF(event.target.value)}
              value={CPF}
            />
            <button onClick={handleSearch}>
            <FaIcons.FaSearch />
            </button>
          </div>
          <button className="button" onClick={paginaCadastro}>
            Cadastrar funcionario
          </button>
        </header>

        <div>
          <table id="customers">
            <caption>Lista de Funcionários:</caption>
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
                    <td className="nome">{func.nome}</td>
                    <td className="setor">{func.setor}</td>

                    <td className="icones">
                      <button
                        onClick={() => Visualizar(func.CPF)}
                        className="icon"
                      >
                        <FaIcons.FaRegEye />
                        <br></br>
                        Visualizar
                      </button>
                      <button onClick={() => Editar(func.CPF)} className="icon">
                        <FaIcons.FaUserEdit />
                        <br></br>
                        Editar
                      </button>
                      <button
                        onClick={() => Excluir(func.CPF)}
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
