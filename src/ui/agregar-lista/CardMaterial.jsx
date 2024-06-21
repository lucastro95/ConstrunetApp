import React from 'react'
import styles from './cardmaterial.module.scss'
import { FaPlus } from 'react-icons/fa'

const CardMaterial = ({material, handleAddMaterial}) => {
    return (
        <>
        <div className={styles.materialItem}>
            <div className={styles.info}>
                <p className={styles.category}>{material.categoria}</p>
                <h3 className={styles.name}>{material.nombre}</h3>
                <p className={styles.brand}>Marca: {material.marca === "" ? "Sin marca" : material.marca}</p>
                <p className={styles.description}>{material.descripcion} - {material.cantidad} {material.unidad}</p>
            </div>
            <button
                className={styles.button}
                onClick={() => handleAddMaterial(material)}>
                <FaPlus />
            </button>
        </div>
        <div className={styles.divider}/>
        </>
    )
}

export default CardMaterial