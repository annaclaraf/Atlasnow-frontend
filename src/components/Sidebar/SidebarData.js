import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Funcionários',
    path: '/funcionarios',
    icon: <FaIcons.FaUsers />,
    cName: 'nav-text'
  },
  {
    title: 'Emissores',
    path: '/emissor',
    icon: <FaIcons.FaUsers />,
    cName: 'nav-text'
  },
  {
    title: 'Setores',
    path: '/setor',
    icon: <FaIcons.FaRegListAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Atas',
    path: '/atas',
    icon: <FaIcons.FaRegFileAlt />,
    cName: 'nav-text'
  }
  
]
