import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'

import './emissorcadastro.css'

import { Sidebar } from '../../../components/Sidebar/index'

export function EmissorCadastro() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [CPF, setCPF] = useState()
  const [dataAdmissao, setDataAdmissao] = useState('')
  const [dataFimAdmissao, setDataFimAdmissao] = useState(null)
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
        '/emissores',
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

  async function voltar() {
    navigate('/emissor')
  }

  return (
    <main>
      <Sidebar />

      <section className="cadastro">
        <header>
          <h2>Cadastro de Emissor</h2>
        </header>

        <div className="wrapper-cadastro">
          <h3>Preencha com as informações do Emissor</h3>
          <form>
            <div className="buscar-nome">
              <div >
                <p>Buscar Funcionário</p>
                <input
                  id='nome-busca'
                  type="search"
                  placeholder="Digite aqui o nome do Funcionário"
                  list="funcionario"
                  onChange={event => setCPF(event.target.value)}
                />
                <button>
                  <FaIcons.FaSearch />
                </button>

    
                <datalist id="funcionario">
                  {funcionarios.map(f => {
                    return (
                     <option value={f.CPF}>{f.nome}</option>
                    )
                  })}
                </datalist>

              </div>
            </div>

            <div className="align-1">
              <div className="dataAdmissao">
                <p>Data de Admissão:</p>

                <input
                  id="dataAdmissao"
                  type="date"
                  onChange={event => setDataAdmissao(event.target.value)}
                  required
                />
              </div>
              <div className="dataFimAdmissao">
                <p>Data Fim de Admissão:</p>
                <input
                  id="dataFimAdmissao"
                  type="date"
                  onChange={event => setDataFimAdmissao(event.target.value)}
                />
              </div>
            </div>

            <button className="button" onClick={handleCreate}>
              Cadastrar
            </button>
          </form>
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
