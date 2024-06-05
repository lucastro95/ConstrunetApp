import React,{useState} from 'react'
import styles from './cardproveedor.module.scss'

const CardProveedor = ({ proveedor }) => {
    return (
        <div className={styles.card}>
            <div className={styles.nombre}>{proveedor.NombreProveedor}</div>
            <div className={styles.detalle}>
                <h2>{proveedor.precioParcial}</h2>
                {
                    proveedor.materiales.map((material, index) => (
                        <div className={styles.item} key={index}>
                            <p>{material.cantidad}u - {material.nombre}</p>
                            <p>${material.precio}</p>
                        </div>
                    ))
                }
            </div>
            <div className={styles.envio}>
            <div className={styles.divider}></div>
                <p>Envío ${proveedor.precioEnvio}</p>
                <p>Llega en {proveedor.tiempoEntrega} día/s</p>
            </div>
        </div>
    )
}

export default CardProveedor