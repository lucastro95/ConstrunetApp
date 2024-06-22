import React from 'react'
import styles from './provselected.module.scss'
import { FaTrashAlt } from 'react-icons/fa'

const provSelected = ({ provider, removeProvider }) => {
    return (
        <div key={provider.cuit} className={styles.selectedProvider}>
            <p>{provider.nombreProveedor}</p>
            <button className={styles.removeButton} onClick={() => removeProvider(provider.cuit)}>
                <FaTrashAlt />
            </button>
        </div>
    )
}

export default provSelected