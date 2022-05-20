import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { api } from '../../../services/api'

import { Sidebar } from '../../../components/Sidebar/index'

import './style.css'

export function EmissorLista() {
    const navigate = useNavigate();

    const [CPF, setCPF] = useState("");
    const [funcionario, setFuncionario] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/funcionarios');
            setFuncionario(response.data)
        }
        loadProducts()
    }, []);

    async function handleSearch(event) {
        event.preventDefault()

        try {
            const response = await api.get(`/funcionarios/${CPF}`)
            setFuncionario(response.data)

            setCPF('')
        } catch (err) {
            console.log(err);
        }
    }

    async function paginaInicial() {
        navigate('/emissor')
    }

    return (
        <main>
            <Sidebar />

            <section>
                
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            
                <header id="busca">
                    <h2>Emissor</h2>

                    <div id="busca">
                        <input
                            type="text"
                            placeholder="Buscar Emissor"
                            onChange={event => setCPF(event.target.value)}
                            value={CPF}
                        />
                        <button onClick={handleSearch}>
                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>
                        </button>
                    </div>

                    
                </header>

                <div>
                    <table id="customers">
                        <caption>Lista de Emissores:</caption>
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
                                        <td>{func.nome}</td>
                                        <td>{func.setor}</td>
                                        <td className="icones">
                                            <button className="icon"> <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 15.5Q13.675 15.5 14.838 14.337Q16 13.175 16 11.5Q16 9.825 14.838 8.662Q13.675 7.5 12 7.5Q10.325 7.5 9.163 8.662Q8 9.825 8 11.5Q8 13.175 9.163 14.337Q10.325 15.5 12 15.5ZM12 14.25Q10.85 14.25 10.05 13.45Q9.25 12.65 9.25 11.5Q9.25 10.35 10.05 9.55Q10.85 8.75 12 8.75Q13.15 8.75 13.95 9.55Q14.75 10.35 14.75 11.5Q14.75 12.65 13.95 13.45Q13.15 14.25 12 14.25ZM12 18.45Q8.525 18.45 5.7 16.55Q2.875 14.65 1.5 11.5Q2.875 8.35 5.7 6.45Q8.525 4.55 12 4.55Q15.475 4.55 18.3 6.45Q21.125 8.35 22.5 11.5Q21.125 14.65 18.3 16.55Q15.475 18.45 12 18.45ZM12 11.5Q12 11.5 12 11.5Q12 11.5 12 11.5Q12 11.5 12 11.5Q12 11.5 12 11.5Q12 11.5 12 11.5Q12 11.5 12 11.5Q12 11.5 12 11.5Q12 11.5 12 11.5ZM12 17.1Q14.875 17.1 17.3 15.588Q19.725 14.075 21 11.5Q19.725 8.925 17.3 7.412Q14.875 5.9 12 5.9Q9.125 5.9 6.7 7.412Q4.275 8.925 3 11.5Q4.275 14.075 6.7 15.588Q9.125 17.1 12 17.1Z"/></svg><br></br>
                                                Visualizar</button>
                                            <button className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M19.9 14.775 18.225 13.1 18.95 12.375Q19.175 12.15 19.425 12.15Q19.675 12.15 19.9 12.375L20.625 13.1Q20.85 13.325 20.85 13.575Q20.85 13.825 20.625 14.05ZM12.325 20.675V19L17.525 13.8L19.2 15.475L14 20.675ZM3.05 15.95V14.6H10.9V15.95ZM3.05 11.5V10.15H14.95V11.5ZM3.05 7V5.65H14.95V7Z"/></svg><br></br>
                                                Editar</button>
                                            <button className="icon-delete" >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.3 18.7 5.35 17.7 11.025 12 5.35 6.25 6.3 5.25 12.025 11 17.7 5.25 18.65 6.25 12.975 12 18.65 17.7 17.7 18.7 12.025 12.95Z"/></svg><br></br>
                                                Excluir</button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
                <footer>
                <button className="voltar" onClick={paginaInicial}>Voltar</button>
            </footer>
            </section>
            
        </main>
    );
}