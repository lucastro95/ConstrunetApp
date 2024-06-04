"use client";
import React, { useState } from 'react'
import styles from './presupuestos.module.scss'
import { useRouter } from 'next/navigation';
import Check from '../../ui/presupuestos/Check';
import Button from '../../ui/common/Button';
import getPresupuesto from '../../actions/getPresupuesto';

const page = () => {
  const router = useRouter();

  const [selections, setSelections] = useState({
    tiempoEntrega: false,
    menorPrecio: false,
    reputacion: false,
    calidadMateriales: false,
  });

  const handleGeneratePresupuesto =async () => {
    // aqui se hacen los cambios/ update de los datos del curso 
    console.log(selections);
    try{
      const response = await getPresupuesto(selections);
      console.log(response);
      alert("Course data has been successfully updated!");
      router.push("/presupuestos/presupuesto-final");
  }
  catch(error){
      console.log(error);
  }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>¿Qué buscas en tu presupuesto?</h1>
      <div className={styles.container}>
        <Check
          text={'Menor tiempo de entrega'}
          name={'entrega'}
          selections={selections}
          setSelections={setSelections}
          />
        <Check 
          text={'Menor precio posible'}
          name={'menorPrecio'}
          selections={selections}
          setSelections={setSelections}
          />
        <Check 
          text={'Menor cantidad de proveedores'}
          name={'proveedores'}
          selections={selections}
          setSelections={setSelections}
          />
        <Check 
          text={'Mayor calidad de materiales'}
          name={'calidad'}
          selections={selections}
          setSelections={setSelections}
          />
      </div>
      <Button text='Generar presupuesto' action={handleGeneratePresupuesto}/>
    </main>
  )
}

export default page