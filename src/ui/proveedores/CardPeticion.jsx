"use client"
import React, { useState } from 'react'
import styles from './cardpeticion.module.scss'
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowUp } from 'react-icons/io';

const CardPeticion = ({ text, materiales }) => {
    const [checked, setChecked] = useState(false);
    const [active, setActive] = useState(false);

    const handleActive = () => {
        setActive(!active);
    };

    const handleCheck = () => {
        const newChecked = !checked;
        setChecked(newChecked);
    }

    return (
        <div className={`${styles.card} ${active ? styles.active : ""}`}>
            <div className={styles.check}>
                <div
                    className={styles.box}
                    onClick={handleCheck}
                >
                    {checked && (
                        <FaCheck style={{ color: "var(--lila-oscuro)", fontSize: "2rem" }} />
                    )}
                </div>
                <p className={styles.text}>{text}</p>
                <button className={styles.btn} onClick={handleActive}>
                    <IoIosArrowUp className={`${styles.icon} ${active ? styles.rotated : ""}`} size={20} />
                </button>
            </div>
            <div className={styles.materiales}>
                <h3>Materiales</h3>
                <p className={styles.material}>2u. Ladrillos</p>
                <p className={styles.material}>2u. Ladrillos</p>
                <p className={styles.material}>2u. Ladrillos</p>
                <p className={styles.material}>2u. Ladrillos</p>
                <p className={styles.material}>2u. Ladrillos</p>
            </div>
        </div>
    )
}

export default CardPeticion