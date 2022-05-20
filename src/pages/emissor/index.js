import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api'

import { Sidebar } from '../../components/Sidebar/index'

import './style.css'

export function Emissor() {
    const navigate = useNavigate();
    
    
    async function paginaEditar() {
        navigate('/emissor/editar')
    }
    async function paginaLista() {
        navigate('/emissor/lista')
    }
    
    return (
        <main>
            
           <Sidebar />

            <section id="emissor">
            
            <header id="title">
            <h2>Emissor</h2>                          
            </header>
            <header id="funcionalidades">
               
                <div id="opcao">

                 <button class="b1" onClick={paginaEditar}>
                 <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M36.5 28V21.5H30V18.5H36.5V12H39.5V18.5H46V21.5H39.5V28ZM18 23.95Q14.7 23.95 12.6 21.85Q10.5 19.75 10.5 16.45Q10.5 13.15 12.6 11.05Q14.7 8.95 18 8.95Q21.3 8.95 23.4 11.05Q25.5 13.15 25.5 16.45Q25.5 19.75 23.4 21.85Q21.3 23.95 18 23.95ZM2 40V35.3Q2 33.55 2.9 32.125Q3.8 30.7 5.4 30Q9.15 28.35 12.075 27.675Q15 27 18 27Q21 27 23.925 27.675Q26.85 28.35 30.55 30Q32.15 30.75 33.075 32.15Q34 33.55 34 35.3V40ZM5 37H31V35.3Q31 34.5 30.6 33.775Q30.2 33.05 29.35 32.7Q25.85 31 23.375 30.5Q20.9 30 18 30Q15.1 30 12.625 30.525Q10.15 31.05 6.6 32.7Q5.85 33.05 5.425 33.775Q5 34.5 5 35.3ZM18 20.95Q19.95 20.95 21.225 19.675Q22.5 18.4 22.5 16.45Q22.5 14.5 21.225 13.225Q19.95 11.95 18 11.95Q16.05 11.95 14.775 13.225Q13.5 14.5 13.5 16.45Q13.5 18.4 14.775 19.675Q16.05 20.95 18 20.95ZM18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45ZM18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Z"/></svg><h3>Cadastar Emisor</h3>
                                 
                 </button>
                 <button class="b2" onClick={paginaLista}>
                 <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M14.5 17V14H42V17ZM14.5 25.5V22.5H42V25.5ZM14.5 34V31H42V34ZM7.5 17Q6.85 17 6.425 16.575Q6 16.15 6 15.5Q6 14.85 6.425 14.425Q6.85 14 7.5 14Q8.15 14 8.575 14.425Q9 14.85 9 15.5Q9 16.15 8.575 16.575Q8.15 17 7.5 17ZM7.5 25.5Q6.85 25.5 6.425 25.075Q6 24.65 6 24Q6 23.35 6.425 22.925Q6.85 22.5 7.5 22.5Q8.15 22.5 8.575 22.925Q9 23.35 9 24Q9 24.65 8.575 25.075Q8.15 25.5 7.5 25.5ZM7.5 34Q6.85 34 6.425 33.575Q6 33.15 6 32.5Q6 31.85 6.425 31.425Q6.85 31 7.5 31Q8.15 31 8.575 31.425Q9 31.85 9 32.5Q9 33.15 8.575 33.575Q8.15 34 7.5 34Z"/></svg>    <h3>Lista de Emissores</h3>
                                 
                 </button>
                  
                 
                   
                    
                 
                 </div>
            </header>
         
            
            
            
        </section>
            
        </main>
);

}