import React from 'react'
import styles from './cardproveedor.module.scss'

const CardProveedor = ({nombre}) => {
  return (
    <div className={styles.card}>
        <div className={styles.nombre}>{nombre}</div>
        <div className={styles.detalle}>
            <h2>$8500</h2>
            <div className={styles.item}>
                <p>2u - Tablas de madera</p>
                <p>$5600</p>
            </div>
            <div className={styles.item}>
                <p>4u - Pintura blanca</p>
                <p>$10550</p>
            </div>
        </div>
        <div className={styles.envio}>
            <p>Envío $400</p>
            <p>Llega en 5 días</p>
        </div>
    </div>
  )
}

export default CardProveedor