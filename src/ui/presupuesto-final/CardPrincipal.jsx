import React from 'react'
import styles from './principal.module.scss'

const CardPrincipal = ({ precio }) => {
  return (
    <div className={styles.card}>
        <h3 className={styles.precio}>{precio}</h3>
        <p>Precio Final</p>
    </div>
  )
}

export default CardPrincipal