"use client"
import React, { useState } from 'react'
import styles from './cardpeticion.module.scss'
import { IoIosArrowUp } from 'react-icons/io';
import { FaRegFilePowerpoint } from "react-icons/fa";
import postPeticionAceptada from '../../actions/postPeticionAceptada'
import Loader from '../common/Loader';

const CardPeticion = ({ text, lista }) => {
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleActive = () => {
        setActive(!active);
    };

    const handleAceptar = () => {
        const currentDate = new Date();
        const vencimientoDate = new Date();
        vencimientoDate.setDate(currentDate.getDate() + 7);
        const vencimiento = vencimientoDate.toISOString();
        console.log(lista.idListado);

        const requestBody = {
            listaId: lista.idListado,
            vencimiento: null,
        };

        const postData = async () => {
            try {
                setLoading(true)
                const response = await postPeticionAceptada(requestBody);
                console.log(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        postData();
    }

    return (
        <>
            {loading && <Loader />}
            <div className={`${styles.card} ${active ? styles.active : ""}`}>
                <FaRegFilePowerpoint className={styles.icon} />
                <div className={styles.check}>
                    <p className={styles.text}>{text}</p>
                    <button className={styles.btn} onClick={handleActive}>
                        <IoIosArrowUp className={`${styles.arrow} ${active ? styles.rotated : ""}`} size={20} />
                    </button>
                </div>
                <div className={styles.materiales}>
                    <h3>Materiales</h3>
                    {lista.materiales.map(material => (
                        <p key={material._id} className={styles.material}>{material.cantidad}u. {material.nombre}</p>
                    ))}
                    <div className={styles.botones}>
                        <button className={styles.btn} onClick={handleAceptar}>Aceptar</button>
                        <button className={styles.btn} onClick={() => { }}>Rechazar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPeticion