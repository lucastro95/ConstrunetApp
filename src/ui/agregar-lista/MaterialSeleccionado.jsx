import React from 'react'
import styles from './materialseleccionado.module.scss'
import { FaTrashAlt } from 'react-icons/fa'

const MaterialSeleccionado = ({ material, handleUpdateQuantity, handleDeleteMaterial }) => {
    return (
        <div key={material._id} className={styles.material}>
            <FaTrashAlt className={styles.trash} onClick={() => handleDeleteMaterial(material._id)}/>
            <p>{material.nombre}</p>
            <input
                type="number"
                className={styles.input}
                value={material.quantity}
                min="1"
                onChange={(e) =>
                    handleUpdateQuantity(
                        material._id,
                        parseInt(e.target.value, 10)
                    )
                }
            />
        </div>
    )
}

export default MaterialSeleccionado