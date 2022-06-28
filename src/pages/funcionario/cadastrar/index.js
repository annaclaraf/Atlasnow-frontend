import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'
import './cadastrar-funcionario.css'
import { Sidebar } from '../../../components/Sidebar/index'

export function FuncionarioCadastro() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [CPF, setCPF] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [setor, setSetor] = useState('')
  const [setores, setSetores] = useState([])
  const [rua, setRua] = useState('')
  const [CEP, setCEP] = useState('')
  const [numero, setNumero] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  async function handleCreate(event) {
    event.preventDefault()
    try {
      await api.post(
        '/funcionarios',
        {
          CPF,
          nome,
          email,
          telefone,
          setor,
          rua,
          CEP,
          numero,
          cidade,
          estado
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate('/funcionarios')
    } catch (err) {
      alert(err.response.data.error)
    }
  }

  async function loadSetores() {
    const response = await api.get('/setor', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setSetores(response.data)
  }
  loadSetores()

  async function paginaFuncionario() {
    navigate('/funcionarios')
  }

  return (
    <main>
      <Sidebar />

      <section className="cadastro">
        <header>
          <h2>FUNCIONÁRIOS</h2>
        </header>

        <div className="wrapper-cadastro-funcionario">
          <h3>Preencha com as informações do Funcionário</h3>
          <form>
            <div className="nome">
              <p>NOME:</p>
              <input
                id="nome"
                type="text"
                placeholder="Nome Completo:"
                onChange={event => setNome(event.target.value)}
                required
              />
            </div>
            <div className="align-1">
              <div className="email">
                <p>E-mail:</p>

                <input
                  id="email"
                  type="email"
                  placeholder="Email:"
                  onChange={event => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="cpf">
                <p>CPF:</p>
                <input
                  id="CPF"
                  type="number"
                  placeholder="CPF:"
                  onChange={event => setCPF(event.target.value)}
                  required
                />
              </div>

              <div className="telefone">
                <p>Telefone:</p>

                <input
                  id="telefone"
                  type="number"
                  placeholder="Telefone:"
                  onChange={event => setTelefone(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="align-2">
              <div className="cidade">
                <p>Cidade:</p>

                <input
                  id="cidade"
                  type="text"
                  placeholder="Cidade:"
                  onChange={event => setCidade(event.target.value)}
                  required
                />
              </div>
              <div className="cep">
                <p>CEP:</p>
                <input
                  id="CEP"
                  type="number"
                  placeholder="CEP:"
                  onChange={event => setCEP(event.target.value)}
                  required
                />
              </div>
              <div className="estado">
                <p>Estado</p>

                <input
                  id="estado"
                  type="text"
                  placeholder="Estado:"
                  onChange={event => setEstado(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="align-3">
              <div className="rua">
                <p>Rua:</p>

                <input
                  id="rua"
                  type="text"
                  placeholder="Rua:"
                  onChange={event => setRua(event.target.value)}
                  required
                />
              </div>
              <div className="numero">
                <p>Número:</p>

                <input
                  id="numero"
                  type="text"
                  placeholder="Número:"
                  onChange={event => setNumero(event.target.value)}
                  required
                />
              </div>
              
                <div className="setor-funcionario">
                  <p>Setor:</p>
                  <select
                    id="setor"
                    onChange={event => setSetor(event.target.value)}
                  >
                    <option value="">-Selecione-</option>
                    {setores.map(func => {
                      return (
                        <option key={func.id} value={func.nome}>
                          {func.nome}
                        </option>
                      )
                    })}
                  </select>
                </div>
              
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
