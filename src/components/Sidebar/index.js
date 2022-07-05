import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as AMIcons from "react-icons/im";
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons'

import {  AuthContext } from "../../context/AuthContext";

import { Permission } from "../Permission/index"


import './style.css'

export function Sidebar() {
  const [sidebar, setSidebar] = useState(false)
  const [user, setUser] = useState(localStorage.getItem("user"))

  const showSidebar = () => setSidebar(!sidebar)

  const { logout } = useContext(AuthContext);


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
              
            </li>
            <li className="user">
              <FaIcons.FaUserCircle />
              {user.toUpperCase()}
            </li>
            

            {SidebarData.map((item, index) => {
              if(item.role) {
                return (
                  <Permission role={[`ROLE_${item.role}`]}>
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  </Permission>
                )
              }
              else {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              }
            })}
            
             
            <footer>
              <button className="logoff" onClick={() =>{
                  logout();
                  
              }}>
                <AMIcons.ImExit />
                SAIR
              </button>
              </footer>
           
          </ul>
          
        </nav>
      </IconContext.Provider>
    </>
  )
}
