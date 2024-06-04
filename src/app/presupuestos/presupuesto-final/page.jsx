"use client";
import React, { useEffect } from 'react'
import styles from './final.module.scss'
import CardPrincipal from '../../../ui/presupuesto-final/CardPrincipal'
import CardProveedor from '../../../ui/presupuesto-final/CardProveedor'
import CheckCard from '../../../ui/presupuesto-final/CheckCard'
import { useSelector } from 'react-redux'

const page = () => {
  const selections = useSelector((state) => state.selecciones);
  const presupuesto = useSelector((state) => state.presupuesto);

  useEffect(() => {
    // console.log('Selections:', selections);
    console.log('Presupuesto:', presupuesto);
    // console.log('Proveedores:', presupuesto.data.presupuestos);
  }, [selections, presupuesto]);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Presupuesto Final</h1>
      <div className={styles.principal}>
        <CardPrincipal precio={`$${presupuesto.data.precioFinal}`} />
        <div className={styles.checkcontainer}>
          {selections.tiempoEntrega && <CheckCard text={'Menor tiempo de entrega'} />}
          {selections.menorPrecio && <CheckCard text={'Menor precio posible'} />}
          {selections.calidadMateriales && <CheckCard text={'Mayor calidad de materiales'} />}
          {/* {selections.reputacion && <CheckCard text={'Menor tiempo de entrega'}/>} */}
        </div>
      </div>
      <div className={styles.proveedores}>
        {presupuesto.data.presupuestos.map((proveedor, index) => (
          <CardProveedor key={index} proveedor={proveedor} />
        ))}
      </div>
    </main>
  )
}

export default page