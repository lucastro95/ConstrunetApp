"use client"
import React from 'react'
import styles from './cardproyecto.module.scss'
import { useRouter } from 'next/navigation';
import { FaPencilRuler, FaHammer, FaRulerCombined, FaMapPin  } from "react-icons/fa";
import { GiHandSaw } from "react-icons/gi";

const CardProyecto = ({ nombre, icono, ubicacion }) => {
  const router = useRouter();

  const handleVerPresupuestos = () => {
    router.push("/listas-materiales");
  }
  
  return (
    <div className={styles.card}>
      {icono === "FaPencilRuler" && <FaPencilRuler className={styles.icon} />}
      {icono === "FaHammer" && <FaHammer className={styles.icon} />}
      {icono === "GiHandSaw" && <GiHandSaw className={styles.icon} />}
      {icono === "FaRulerCombined" && <FaRulerCombined className={styles.icon} />}
      <h3 className={styles.name}>{nombre}</h3>
      <div className={styles.ubicacion}>
        <FaMapPin className={styles.pin}/>
        <p className={styles.text}>{ubicacion}</p>
      </div>
      <button className={styles.btn} onClick={handleVerPresupuestos}>Ver Listas</button>
    </div>
  )
}

export default CardProyecto