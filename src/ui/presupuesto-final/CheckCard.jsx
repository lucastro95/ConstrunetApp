import React from 'react'
import styles from './checkcard.module.scss'
import { FaCheck } from 'react-icons/fa'

const CheckCard = ({ text }) => {
  return (
    <div>
        <div className={styles.check}>
            <div className={styles.box}>
                <FaCheck style={{ color: "var(--amarillo)", fontSize: "2rem" }} />
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    </div>
  )
}

export default CheckCard