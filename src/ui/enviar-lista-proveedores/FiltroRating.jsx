import React from 'react'
import styles from './filtrorating.module.scss'
import { FaSort } from 'react-icons/fa'

const FiltroRating = ({ sortByRating, toggleSortByRating }) => {
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor="sort">Ordenar por Rating</label>
            <button className={styles.sortButton} onClick={toggleSortByRating}>
                {sortByRating === 'asc' ? <FaSort /> : <FaSort />}
            </button>
        </div>
    )
}

export default FiltroRating