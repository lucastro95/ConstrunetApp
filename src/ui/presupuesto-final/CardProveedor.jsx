import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import styles from "./cardproveedor.module.scss";

const CardProveedor = ({ proveedor }) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <div className={`${styles.card} ${active ? styles.active : ""}`}>
            <div className={styles.title}>
                <h3 className={styles.name}>{proveedor.nombreProveedor}</h3>
                <button className={styles.btn} onClick={handleClick}>
                    <IoIosArrowUp className={`${styles.icon} ${active ? styles.rotated : ""}`} size={20} />
                </button>
            </div>
            <div className={styles.content}>
                {proveedor.materiales.map((material, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.material}>
                            <p className={styles.categoria}>{material.categoria}</p>
                            <p className={styles.nomb}>{material.nombre} {material.marca && ` - ${material.marca}`}</p>
                            <p className={styles.desc}>{material.cantidad} {material.unidad}</p>
                        </div>
                        <div className={styles.divider} />
                    </React.Fragment>
                ))}
                <h4 className={styles.info}>Subtotal <span>${proveedor.precioParcial || proveedor.precioTotal}</span></h4>
                <h4 className={styles.info}>Envío <span>${proveedor.precioEnvio}</span></h4>
                <p className={styles.entrega}>Llega en {proveedor.tiempoEntrega} día/s</p>
            </div>
        </div>
    );
};

export default CardProveedor;
