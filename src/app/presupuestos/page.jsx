"use client";
import React, { useState } from 'react'
import styles from './presupuestos.module.scss'
import { useRouter } from 'next/navigation';
import Check from '../../ui/presupuestos/Check';
import Button from '../../ui/common/Button';

const page = () => {
  const router = useRouter();

  const [selections, setSelections] = useState({
    entrega: false,
    precio: false,
    proveedores: false,
    calidad: false,
  });

  const handleGeneratePresupuesto = () => {
    console.log('Selections before redirect:', selections);
    router.push('/presupuestos/presupuesto-final');
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
          name={'precio'}
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