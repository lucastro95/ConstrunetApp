import React from 'react'
import styles from './navbar.module.scss'
import Image from 'next/image'
import logo from '../../../src/assets/Logo.png'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <Image 
            src={logo}
            className={styles.logo}
        />
        <ul className={styles.items}>
            <li className={styles.item}>
              <a href="/proyectos">Mis Proyectos</a>
            </li>
            <li className={styles.item}>Proveedores</li>
        </ul>
    </nav>
  )
}

export default Navbar