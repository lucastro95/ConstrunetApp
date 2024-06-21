import React from 'react'
import styles from './filtrocategoria.module.scss'

const FiltroCategoria = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <div className={styles.filtercategory}>
            <label className={styles.label} htmlFor="category">
                Filtrar por Categoría
            </label>
            <select
                className={styles.select}
                id="category"
                value={selectedCategory}
                onChange={(e) =>
                    setSelectedCategory(e.target.value)
                }>
                <option value="">Todas las Categorías</option>
                <option value="Aridos, Arena y Piedra">
                Aridos, Arena y Piedra
                </option>
                <option value="Cementos y Cal">Cementos y Cal</option>
                <option value="Ladrillos">Ladrillos</option>
                <option value="Hierros">Hierros</option>
                <option value="Aislante Hidrófugo">Aislante Hidrófugo</option>
                <option value="Construcción en Seco">Construcción en Seco</option>
            </select>
        </div>
    )
}

export default FiltroCategoria