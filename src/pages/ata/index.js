import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'

import { api } from '../../services/api'

import { Permission } from "../../components/Permission/index"

import { Sidebar } from '../../components/Sidebar/index'
import './style.css'

export function Ata() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [palavrasChave, setPalavrasChave] = useState('')
  const [ata, setAta] = useState([])
  const [load, setLoad] = useState([])

  useEffect(() => {
    async function loadAtas() {
      const response = await api.get('/atas', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setAta(response.data)
    }
    loadAtas()
  }, [load])

  async function handleSearch(event) {
    event.preventDefault()
    
    if(palavrasChave == '') {return}
    try {
      const response = await api.get(`/atas/palavrasChave/${palavrasChave}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAta(response.data)
    } catch (err) {
      alert(err.response.data.error)
      setPalavrasChave('')
    }
  }

  async function handleReset(event) {
    
    event.preventDefault()
    setPalavrasChave('')
    setLoad([])
  }


  async function paginaInicial() {
    navigate('/home')
  }
  async function paginaCadastro() {
    const response = await api.get('/setor', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if(response.data.length == 0){
      alert('Nenhum setor cadastrado no sistema.')
      return
    }
    navigate('/atas/cadastrar')
  }

  async function Excluir(id) {
    if(window.confirm("Tem certeza que deseja excluir essa ata?")) {
      const response = await api.delete(`/atas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('A ata foi excluída!')
      setLoad(response)
    } 
  }

  async function Visualizar(id) {
    await localStorage.setItem('id', id)
    navigate('/atas/view')
  }

  async function Editar(id) {
    await localStorage.setItem('id', id)
    navigate('/atas/editar')
  }

  return (
    <main>
      <Sidebar />

      <section>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <header id='busca'>
          <h2>ATAS</h2>

          <div id="buscar">
            <input
              type="type"
              placeholder="Buscar Ata"
              onChange={event => setPalavrasChave(event.target.value)}
              value={palavrasChave}
            />
            <button onClick={handleSearch}>
            <FaIcons.FaSearch />
            </button>
            
            <button onClick={handleReset}>
              <MdIcons.MdOutlineClear />
            </button>
           
          </div>
           <Permission role={["ROLE_emissor"]}>
          <button className="button" onClick={paginaCadastro}>
            Cadastrar Ata
          </button>
          </Permission>
        </header>

        <div>
          <table id="customers">
            <caption>Lista de Atas:</caption>
            <thead>
              <tr>
                <th>Título</th>
                <th>Data de Emissão</th>
                <th></th>
              </tr>
            </thead>
            {ata.map(a => {
              return (
                <tbody key={a.id}>
                  <tr>
                    <td className="titulo">{a.tituloReuniao}</td>
                    <td className="dataEmissao">{format(new Date(a.dataEmissao), 'dd/MM/yyyy')}</td>

                    <td className="icones">
                      <button
                        className="icon"
                        onClick={() => Visualizar(a.id)}
                      >
                        <FaIcons.FaRegEye />
                        <br></br>
                        Visualizar
                      </button>
                      <Permission role={["ROLE_emissor"]}>
                        <button onClick={() => Editar(a.id)} className="icon">
                          <FaIcons.FaUserEdit />
                          <br></br>
                          Editar
                        </button>
                        <button
                          onClick={() => Excluir(a.id)}
                          className="icon-delete"
                        >
                          <FaIcons.FaUserTimes />
                          <br></br>
                          Excluir
                        </button>
                      </Permission>
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
