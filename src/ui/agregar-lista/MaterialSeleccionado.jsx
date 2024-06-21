import React from 'react'
import styles from './materialseleccionado.module.scss'

const MaterialSeleccionado = ({ material, handleUpdateQuantity }) => {
    return (
        <div
            key={material._id}
            className={styles.material}>
            <p>{material.nombre}</p>
            <input
                type="number"
                className={styles.input}
                value={material.quantity}
                min="1"
                onChange={(e) =>
                    handleUpdateQuantity(
                        material.id,
                        parseInt(e.target.value, 10)
                    )
                }
            />
        </div>
    )
}

export default MaterialSeleccionado