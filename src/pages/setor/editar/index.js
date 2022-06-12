import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'

import './style.css'
import { Sidebar } from '../../../components/Sidebar/index'

export function SetorEditar() {
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('nome')
  const navigate = useNavigate()

  const [nome, setNome] = useState()
 
  const [setor, setSetor] = useState([])

  useEffect(() => {
    async function loadSetor() {
      const response = await api.get(`/setor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSetor(response.data)
    }
    loadSetor()
  }, [])

  async function handleUpdate(event) {
    event.preventDefault()

    try {
      await api.put(
        `/setor/${id}`,
        {
          nome
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate('/setor')
    } catch (err) {
      alert(err.response.data.error)
    }
  }

  async function voltar() {
    navigate('/setor')
  }

  return (
    <main>
      <Sidebar />

      <section className="cadastro">
        <header>
          <h2>Editar Setor</h2>
        </header>

        <div className="wrapper-cadastro">
          <h3>Altere as informações do Setor</h3>
          {setor.map(func => {
            return (
              <form key={func.CPF}>
                <div className="nome">
                  <p>NOME DO SETOR:</p>
                  <input
                    id="nome"
                    type="text"
                    placeholder={func.nome}
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                  />
                </div>
              
                <button onClick={handleUpdate} className="button">
                  Confirmar Edição
                </button>
              </form>
            )
          })}
        </div>
        <footer>
          <button className="voltar" onClick={voltar}>
          <FaIcons.FaRegArrowAltCircleLeft />
          </button>
        </footer>
      </section>
    </main>
  )
}
