import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { api } from '../../../services/api'

import './style.css'
import { Sidebar } from '../../../components/Sidebar/index'

export function FuncionarioEditar() {
  const token = localStorage.getItem('token')
  const cpf = localStorage.getItem('cpf')
  const navigate = useNavigate()

  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [telefone, setTelefone] = useState()
  const [setor, setSetor] = useState()
  const [setores, setSetores] = useState([])
  const [rua, setRua] = useState()
  const [CEP, setCEP] = useState()
  const [numero, setNumero] = useState()
  const [cidade, setCidade] = useState()
  const [estado, setEstado] = useState()
  const [funcionario, setFuncionario] = useState([])

  useEffect(() => {
    async function loadFuncionarios() {
      const response = await api.get(`/funcionarios/${cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setFuncionario(response.data)
    }
    loadFuncionarios()
  }, [])

  async function loadSetores() {
    const response = await api.get('/setor', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setSetores(response.data)
  }
  loadSetores()

  async function handleUpdate(event) {
    event.preventDefault()

    if (
      nome == '' ||
      email == '' ||
      telefone == '' ||
      setor == '' ||
      rua == '' ||
      CEP == '' ||
      numero == '' ||
      cidade == '' ||
      estado == '' 
    ) {
      alert("Nenhum campo pode ficar em branco")
      return
    }

    try {
      await api.put(
        `/funcionarios/${cpf}`,
        {
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

  async function paginaFuncionario() {
    navigate('/funcionarios')
  }

  return (
    <main>
      <Sidebar />

      <section className="cadastro">
        <header>
          <h2>Editar Funcionário</h2>
        </header>

        <div className="wrapper-cadastro">
          <h3>Altere as informações do Funcionário</h3>
          {funcionario.map(func => {
            return (
              <form key={func.CPF}>
                <div className="nome">
                  <p>NOME:</p>
                  <input
                    id="nome"
                    type="text"
                    placeholder={func.nome}
                    value={nome || nome == '' ? nome : func.nome}
                    onChange={event => setNome(event.target.value)}
                  />
                </div>
                <div className="align-1">
                  <div className="email">
                    <p>E-mail:</p>

                    <input
                      id="email"
                      type="email"
                      placeholder={func.email}
                      value={email || email == '' ? email : func.email}
                      onChange={event => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="telefone">
                    <p>Telefone:</p>

                    <input
                      id="telefone"
                      type="text"
                      placeholder={func.telefone}
                      value={telefone || telefone == '' ? telefone : func.telefone}
                      onChange={event => setTelefone(event.target.value)}
                    />
                  </div>
                </div>

                <div className="align-2">
                  <div className="cidade">
                    <p>Cidade:</p>

                    <input
                      id="cidade"
                      type="text"
                      placeholder={func.cidade}
                      value={cidade || cidade == '' ? cidade : func.cidade}
                      onChange={event => setCidade(event.target.value)}
                    />
                  </div>
                  <div className="cep">
                    <p>CEP:</p>
                    <input
                      id="CEP"
                      type="text"
                      placeholder={func.CEP}
                      value={CEP || CEP == '' ? CEP : func.CEP}
                      onChange={event => setCEP(event.target.value)}
                    />
                  </div>
                  <div className="estado">
                    <p>Estado</p>

                    <input
                      id="estado"
                      type="text"
                      placeholder={func.estado}
                      value={estado || estado == '' ? estado : func.estado}
                      onChange={event => setEstado(event.target.value)}
                    />
                  </div>
                </div>
                <div className="align-3">
                  <div className="rua">
                    <p>Rua:</p>

                    <input
                      id="rua"
                      type="text"
                      placeholder={func.rua}
                      value={rua || rua == '' ? rua : func.rua}
                      onChange={event => setRua(event.target.value)}
                    />
                  </div>
                  <div className="numero">
                    <p>Número:</p>

                    <input
                      id="numero"
                      type="text"
                      placeholder={func.numero}
                      value={numero || numero == '' ? numero : func.numero}
                      onChange={event => setNumero(event.target.value)}
                    />
                  </div>
                  <div className="setor">
                    <p>Setor:</p>
                    <select
                      id="setor"
                      onChange={event => setSetor(event.target.value)}
                    >
                      <option value="">-Selecione-</option>
                      {setores.map(set => {
                        return (
                          <option key={set.id} value={set.nome} selected={set.nome == func.setor ? true : false}>
                            {set.nome}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>

                <button onClick={handleUpdate} className="button">
                  Confirmar Edição
                </button>
              </form>
            )
          })}
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
