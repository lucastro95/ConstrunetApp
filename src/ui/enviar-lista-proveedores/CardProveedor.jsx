import React from 'react'
import styles from './cardproveedor.module.scss'
import { FaCheck } from 'react-icons/fa'

const CardProveedor = ({ provider, addProvider }) => {
    return (
        <div key={provider.cuit} className={styles.card}>
            <div className={styles.providerInfo}>
                <h3 className={styles.providerName}>{provider.nombreProveedor}</h3>
                <p className={styles.providerRating}>Rating: {provider.reputacion}/5</p>
            </div>
            <button className={styles.button} onClick={() => addProvider(provider)}>
                <FaCheck />
            </button>
        </div>
    )
}

export default CardProveedor