import React from "react";
import styles from "./cardproveedor.module.scss";

const CardProveedor = ({ proveedor }) => {

    return (
        <div className={styles.card}>
            <div className={styles.nombre}>{proveedor.NombreProveedor}</div>
            <div className={styles.detalle}>
                {proveedor.materiales.map((material, index) => (
                    <div className={styles.item} key={index}>
                        <p>
                            {material.cantidad}u - {material.nombre}
                        </p>
                        <p>${material.precio}</p>
                    </div>
                ))}
            </div>
            <div className={styles.envio}>
                <div className={styles.divider}></div>
                <p>Envío ${proveedor.precioEnvio}</p>
                <p>Llega en {proveedor.tiempoEntrega} día/s</p>
                <h2 className={styles.precioParcial}>{proveedor.precioParcial}</h2>
            </div>
        </div>
    );
};

export default CardProveedor;
