"use client"
import React from 'react';
import styles from './final.module.scss';
import { useSelector } from 'react-redux';
import PieChart from '../../../../ui/presupuesto-final/PieChart.jsx';
import Calendario from '../../../../ui/presupuesto-final/Calendario.jsx';
import CardProveedor from '../../../../ui/presupuesto-final/CardProveedor.jsx';
import Button from '../../../../ui/common/Button.jsx';
import { useRouter } from 'next/navigation';
import Loader from '../../../../ui/common/Loader.jsx';
import getProveedores from '../../../../actions/getProveedores';

const Page = ({ params }) => {
  const router = useRouter();

  const {id} = params

  const presupuesto = useSelector((state) => state.presupuesto);

  console.log(presupuesto);

  const handleRegenerarPresupuesto = () => {
    router.push(`/presupuestos/${id}`);
  };

  if (!presupuesto.data.presupuestos) {
    return <Loader />; // Muestra un loader mientras los datos están cargando
  }

  const labels = presupuesto.data.presupuestos.map(p => p.NombreProveedor);
  const data = presupuesto.data.presupuestos.map(p => p.precioParcial);

  const colors = [
    '#23255D',
    '#6C5F8D',
    '#4B3F6E',
    '#BA96C1',
    '#BBB6D6',
    '#DCD7D5',
  ];

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <h2>Presupuesto del proyecto según los filtros elegidos</h2>
        <div className={styles.main_info}>
          <div className={styles.chart}>
            <PieChart labels={labels} data={data} colors={colors} />
          </div>
          <div className={styles.precio_final}>
            <h2>${presupuesto.data.precioFinal}</h2>
            <p>Precio Final</p>
          </div>
        </div>
        <h2>Tiempos de entrega</h2>
        <Calendario presupuestos={presupuesto.data.presupuestos} />
        <h2>Resumen</h2>
        {presupuesto.data.presupuestos.map(prov => (
          <CardProveedor key={prov.NombreProveedor} proveedor={prov} />
        ))}
        {
          presupuesto.data.materialesSinProveedor.length !== 0 &&
          <div className={styles.sinProv}>
            <h2>Materiales sin proveedor</h2>
            {
              presupuesto.data.materialesSinProveedor.map(material => (
                <p>{material}</p>
              ))
            }
          </div>
        }
        <div className={styles.buttons}>
          <Button text='REGENERAR PRESUPUESTO' action={handleRegenerarPresupuesto}/>
          <Button text='CONFIRMAR PRESUPUESTO' action={() => {}}/>
        </div>
      </div>
    </main>
  );
};

export default Page;
