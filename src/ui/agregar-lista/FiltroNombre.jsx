import React from 'react'
import styles from './filtronombre.module.scss'

const FiltroNombre = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className={styles.filterName}>
            <label className={styles.label} htmlFor="search">
                Buscar por Nombre
            </label>
            <input
                className={styles.input}
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}

export default FiltroNombre