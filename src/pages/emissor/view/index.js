import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'

import { Sidebar } from '../../../components/Sidebar/index'

import './style.css'

export function EmissorView() {
  const id = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [emissor, setEmissor] = useState([])

  async function loadEmissor() {
    const response = await api.get(`/emissores/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setEmissor(response.data)
  }
  loadEmissor()

  async function Voltar() {
    navigate('/emissor')
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
          <h2>EMISSOR</h2>
        </header>

        <div className="borda">
          <table id="customers">
            <caption>Dados do Emissor</caption>

            <div className="centro">
              <thead>
                <tr className="esquerda">
                  <th>Nome: </th>
                  <th>CPF: </th>
                  <th>Data de Admissão</th>
                  <th>Data Fim de Admissão</th>
                </tr>
              </thead>
              {emissor.map(emissor => {
                return (
                  <tbody key={emissor.id}>
                    <tr className="direita">
                      <td>{emissor.nome}</td>
                      <td>{emissor.CPF}</td>
                      <td>
                        {format(new Date(emissor.dataAdmissao), 'dd-MM-yyyy')}
                      </td>
                      <td>
                        {emissor.dataFimAdmissao
                          ? format(
                              new Date(emissor.dataFimAdmissao),
                              'dd-MM-yyyy'
                            )
                          : null}
                      </td>
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
