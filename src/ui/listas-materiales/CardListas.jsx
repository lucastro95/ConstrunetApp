import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import styles from "./cardlistas.module.scss";
import Button from "../common/Button";
import { useRouter } from "next/navigation";

const CardProveedor = ({ lista, index }) => {
    const router = useRouter();

    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    const handleVerPrespuestos = () => {
        router.push(`/presupuestos/${lista._id}`)
    }

    return (
        <div className={`${styles.card} ${active ? styles.active : ""}`}>
            <div className={styles.title}>
                <h3 className={styles.name}>Lista n°{index + 1} </h3>
                <h3 className={styles.estado}>Estado: <span>Presupuesto Confirmado</span></h3>
                <button className={styles.btn} onClick={handleClick}>
                    <IoIosArrowUp className={`${styles.icon} ${active ? styles.rotated : ""}`} size={20} />
                </button>
            </div>
            <div className={styles.content}>
                {lista.materiales.map((material, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.material}>
                            <p className={styles.categoria}>{material.categoria}</p>
                            <p className={styles.nomb}>{material.nombre} {material.marca && ` - ${material.marca}`}</p>
                            <p className={styles.desc}>{material.descripcion} - {material.cantidad} {material.unidad}</p>
                        </div>
                        <div className={styles.divider} />
                    </React.Fragment>
                ))}
                <Button text={'Ver Presupuestos'} action={handleVerPrespuestos} />
            </div>
        </div>
    );
};

export default CardProveedor;
