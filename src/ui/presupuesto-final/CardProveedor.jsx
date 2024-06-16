import React from "react";
import styles from "./cardproveedor.module.scss";

const CardProveedor = ({ proveedor }) => {
    console.log(proveedor);
    return (
        <div className={styles.card}>
            <h3 className={styles.name}>{proveedor.NombreProveedor}</h3>
            {proveedor.materiales.map(material => (
                <>
                    <div className={styles.material}>
                        <p className={styles.cant}>{material.cantidad}u.</p>
                        <p className={styles.nomb}>{material.nombre} {material.marca}</p>
                        <p className={styles.precio}>${material.precio}</p>
                    </div>
                    <div className={styles.divider} />
                </>
            ))}
            <h4 className={styles.info}>Subtotal <span>${proveedor.precioParcial}</span></h4>
            <h4 className={styles.info}>Envío <span>${proveedor.precioEnvio}</span></h4>
            <p className={styles.entrega}>Llega en {proveedor.tiempoEntrega} día/s</p>
        </div>
    );
};

export default CardProveedor;
