"use client"
import React from 'react'
import styles from './cardproyecto.module.scss'
import { FaPencilRuler } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const CardProyecto = ({ nombre }) => {
  const router = useRouter();

  const handleVerPresupuestos = () => {
    router.push("/presupuestos");
  }

  const handleCrearLista = () => {
    router.push("/agregar-lista");
  }
  
  return (
    <div className={styles.card}>
      <FaPencilRuler style={{ color: "var(--lila-oscuro)", fontSize: "4rem" }} />
      <h3 className={styles.name}>{nombre}</h3>
      <button className={styles.btn} onClick={handleVerPresupuestos}>Ver Presupuestos</button>
      <button className={styles.btn} onClick={handleCrearLista}>Crear Lista</button>
    </div>
  )
}

export default CardProyecto