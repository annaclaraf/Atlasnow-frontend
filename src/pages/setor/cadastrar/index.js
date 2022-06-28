import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'
import './cadastro-setor.css'
import { Sidebar } from '../../../components/Sidebar/index'

export function SetorCadastro() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [nome, setNome] = useState('')

  async function handleCreate(event) {
    event.preventDefault()

    try {
      const response = await api.post(
        '/setor',
        { nome },
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

  async function paginaFuncionario() {
    navigate('/setor')
  }

  return (
    <main>
      <Sidebar />

      <section className="cadastro">
        <header>
          <h2>SETOR</h2>
        </header>

        <div className="wrapper-cadastro">
          <h3>CADASTRO DE SETOR</h3>
          <form>
            <div className="cadastro-setor">
              <p>NOME DO SETOR:</p>
              <input
                id="nome"
                type="text"
                placeholder="Coloque aqui o nome do Setor"
                onChange={event => setNome(event.target.value)}
                required
              />
            </div>

            <button className="button" onClick={handleCreate}>
              Cadastrar
            </button>
          </form>
        </div>

        <footer>
          <button className="voltar" onClick={paginaFuncionario}>
            <FaIcons.FaRegArrowAltCircleLeft />
          </button>
        </footer>
      </section>
    </main>
  )
}
