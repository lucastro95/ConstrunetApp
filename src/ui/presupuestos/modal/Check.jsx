"use client";
import React, { useEffect, useState } from 'react'
import styles from './check.module.scss'
import { FaCheck } from "react-icons/fa";

const Check = ({ text, name, selections, setSelections }) => {
    const [checked, setChecked] = useState(selections[name]);

    const handleClick = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        setSelections({
            ...selections,
            [name]: newChecked,
        });
    }

    useEffect(() => {
        setChecked(selections[name]);
    }, [selections, name]);

    return (
        <div className={styles.check}>
            <div 
                className={styles.box}
                onClick={handleClick}
                >
                {checked && (
                    <FaCheck style={{ color: "var(--lila-oscuro)", fontSize: "2rem" }} />
                )}
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    )
}

export default Check;
