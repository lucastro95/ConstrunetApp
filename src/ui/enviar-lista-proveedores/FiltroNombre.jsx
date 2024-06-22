import React from 'react'
import styles from './filtronombre.module.scss'
import { FaSearch } from 'react-icons/fa'

const FiltroNombre = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor="search">Buscar</label>
            <div className={styles.searchBox}>
                <FaSearch className={styles.searchIcon} />
                <input
                    className={styles.input}
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar proveedores..."
                />
            </div>
        </div>
    )
}

export default FiltroNombre