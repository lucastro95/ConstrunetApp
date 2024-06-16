"use client";
import React, { useEffect } from 'react'
import styles from './final.module.scss'
import { useSelector } from 'react-redux'
import PieChart from '../../../ui/presupuesto-final/PieChart.jsx'
import Calendario from '../../../ui/presupuesto-final/Calendario.jsx'
import CardProveedor from '../../../ui/presupuesto-final/CardProveedor.jsx'

const page = () => {
  const selections = useSelector((state) => state.selecciones);
  // const presupuesto = useSelector((state) => state.presupuesto);

  const presupuesto = {
    "precioFinal": 347000,
    "presupuestos": [
      {
        "NombreProveedor": "RODO Materiales",
        "materiales": [
          { "nombre": "Cal Hidralit", "cantidad": 12, "precio": 62000, "marca": "Genérica" },
          { "nombre": "Cerecita", "cantidad": 10, "precio": 20000, "marca": "Hidralit" },
          { "nombre": "Piedra", "cantidad": 1, "precio": 45000, "marca": "Hidralit" }
        ],
        "precioEnvio": 3400,
        "precioParcial": 127000,
        "tiempoEntrega": "2"
      },
      {
        "NombreProveedor": "Materiales La Esperanza",
        "materiales": [
          { "nombre": "Cemento", "cantidad": 12, "precio": 72000, "marca": "Avellaneda" },
          { "nombre": "Ladrillos huecos", "cantidad": 500, "precio": 123000, "marca": "" },
          { "nombre": "Arena", "cantidad": 1, "precio": 25000, "marca": "" }
        ],
        "precioEnvio": 3400,
        "precioParcial": 220000,
        "tiempoEntrega": "4"
      }
    ]
  };

  const colors = [
    '#23255D',
    '#6C5F8D',
    '#4B3F6E',
    '#BA96C1',
    '#BBB6D6',
    '#DCD7D5',
  ];

  const labels = presupuesto.presupuestos.map(p => p.NombreProveedor);
  const data = presupuesto.presupuestos.map(p => p.precioParcial);

  // useEffect(() => {
  //   console.log('Selections:', selections);
  //   console.log('Presupuesto:', presupuesto);
  // }, [selections, presupuesto]);

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <h2>Presupuesto del proyecto según los filtros elegidos</h2>
        <div className={styles.main_info}>
          <div className={styles.chart}>
            <PieChart labels={labels} data={data} colors={colors} />
          </div>
          <div className={styles.precio_final}>
            <h2>${presupuesto.precioFinal}</h2>
            <p>Precio Final</p>
          </div>
        </div>
        <h2>Tiempos de entrega</h2>
        <Calendario presupuestos={presupuesto.presupuestos} />
        <h2>Resumen</h2>
        {presupuesto.presupuestos.map(prov => (
          <CardProveedor proveedor={prov} />
        )
        )}
      </div>
    </main>
  )
}

export default page