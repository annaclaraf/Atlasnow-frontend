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
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
              >
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
              </svg>
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
