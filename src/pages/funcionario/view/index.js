import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'

import { Sidebar } from '../../../components/Sidebar/index'

import './style.css'

export function FuncionarioView() {
  const token = localStorage.getItem('token')
  const cpf = localStorage.getItem('cpf')

  const navigate = useNavigate()

  const [funcionario, setFuncionario] = useState([])

  useEffect(() => {
    async function loadFuncionario() {
      const response = await api.get(`/funcionarios/${cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setFuncionario(response.data)
    }
    loadFuncionario()
  }, [])

  async function Voltar() {
    navigate('/funcionarios')
  }

  return (
    <main>
      <Sidebar />

      <section id="view">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <header id="busca">
          <h2>FUNCIONÁRIO</h2>
        </header>

        <div className="borda">
          <table id="customers">
            <caption>Dados do Funcionário</caption>

            <div className="centro">
              <thead>
                <tr className="esquerda">
                  <th>Nome: </th>
                  <th>E-mail: </th>
                  <th>CPF: </th>
                  <th>Telefone: </th>
                  <th>Cidade:</th>
                  <th>CEP: </th>
                  <th>Estado: </th>
                  <th>Rua: </th>
                  <th>Número: </th>
                  <th>Setor: </th>
                </tr>
              </thead>
              {funcionario.map(func => {
                return (
                  <tbody key={func.CPF}>
                    <tr className="direita">
                      <td>{func.nome}</td>
                      <td>{func.email}</td>
                      <td>{func.CPF}</td>
                      <td>{func.telefone}</td>
                      <td>{func.cidade}</td>
                      <td>{func.CEP}</td>
                      <td>{func.estado}</td>
                      <td>{func.rua}</td>
                      <td>{func.numero}</td>
                      <td>{func.setor}</td>
                    </tr>
                  </tbody>
                )
              })}
            </div>
          </table>
        </div>
        <footer>
          <button className="voltar" onClick={Voltar}>
            <FaIcons.FaRegArrowAltCircleLeft />
          </button>
        </footer>
      </section>
    </main>
  )
}
