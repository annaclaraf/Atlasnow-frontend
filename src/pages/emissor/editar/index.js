import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'

import './style.css'

import { Sidebar } from '../../../components/Sidebar/index'

export function EmissorEditar() {
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('id')
  const navigate = useNavigate()

  const [emissor, setEmissor] = useState([])
  const [CPF, setCPF] = useState()
  const [dataAdmissao, setDataAdmissao] = useState()
  const [dataFimAdmissao, setDataFimAdmissao] = useState()

  useEffect(() => {
    async function loadEmissor() {
      const response = await api.get(`/emissores/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setEmissor(response.data)
    }
    loadEmissor()
  }, [])

  async function handleUpdate(event) {
    event.preventDefault()

    if(!dataAdmissao && !dataFimAdmissao && !CPF) {
      navigate('/emissor')
      return
    }
    try {
      await api.put(
        `/emissores/${id}`,
        {
          CPF,
          dataAdmissao,
          dataFimAdmissao
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate('/emissor')
    } catch (err) {
        alert(err.response.data.error)
    }
  }

  async function paginaEmissor() {
    navigate('/emissor')
  }
  return (
    <main>
      <Sidebar />

      <section className="cadastro">
        <header>
          <h2>Editar Emissor</h2>
        </header>

        <div className="wrapper-cadastro">
          <h3>Informações do Emissor</h3>
          {emissor.map(emissor => {
            return (
              <form key={emissor.id}>
                <div className="align-1">
                  <div className="cpf">
                    <p>CPF:</p>
                    <input
                      id="CPF"
                      type="text"
                      placeholder={emissor.CPF}
                      value={CPF}
                      onChange={event => setCPF(event.target.value)}
                    />
                  </div>
                </div>

                <div className="align-2">
                  <div className="dataAdmissao">
                    <p>Data de Admissão:</p>

                    <input
                      id="dataAdmissao"
                      type="date"
                      value={
                        dataAdmissao
                          ? dataAdmissao
                          : format(new Date(emissor.dataAdmissao), 'yyyy-MM-dd')
                      }
                      onChange={event => setDataAdmissao(event.target.value)}
                    />
                  </div>
                  <div className="dataFimAdmissao">
                    <p>Data Fim de Admissão:</p>
                    <input
                      id="dataFimAdmissao"
                      type="date"
                      value={
                        dataFimAdmissao
                          ? dataFimAdmissao
                          : emissor.dataFimAdmissao
                          ? format(
                              new Date(emissor.dataFimAdmissao),
                              'yyyy-MM-dd'
                            )
                          : dataFimAdmissao
                      }
                      onChange={event => setDataFimAdmissao(event.target.value)}
                    />
                  </div>
                </div>

                <button className="button" onClick={handleUpdate}>
                  Confirmar Alterações
                </button>
              </form>
            )
          })}
        </div>
        <footer>
          <button className="voltar" onClick={paginaEmissor}>
            <FaIcons.FaRegArrowAltCircleLeft />
          </button>
        </footer>
      </section>
    </main>
  )
}
