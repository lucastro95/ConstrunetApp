"use client";
import React, { useEffect, useState } from 'react'
import styles from './presupuestos.module.scss'
import Button from '../../../ui/common/Button';
import getPresupuestosConfir from '../../../actions/getPresupuestosConfir';
import CardProveedor from '../../../ui/presupuesto-final/CardProveedor';
import Loader from '../../../ui/common/Loader.jsx'
import ModalPresupuesto from '../../../ui/presupuestos/modal/ModalPresupuesto'
import { useRouter } from 'next/navigation';


const page = ({ params }) => {
  const router = useRouter();

  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false)

  const { id } = params

  const handleGeneratePresupuesto = () => {
    setModal(true);
  };

  const handleAtras = () => {
    router.push("/proyectos");
  }

  const handleCloseModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const presupuestos = await getPresupuestosConfir(id);
        setPresupuestos(presupuestos);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {
        loading ?
          <Loader />
          :
          <>
            {modal && <ModalPresupuesto id={id} handleClose={handleCloseModal} />}
            <main className={styles.main}>
              <div className={styles.layout}>
                <h2>Presupuestos del Proyecto "Casa en Quilmes"</h2>
                {
                  presupuestos.map(pres => (
                    <CardProveedor proveedor={pres} />
                  ))
                }
                <div className={styles.botones}>
                  <Button text={'ATRAS'} action={handleAtras} />
                  <Button text={'GENERAR PRESUPUESTO'} action={handleGeneratePresupuesto} />
                </div>
              </div>
            </main>
          </>
      }
    </>
  )
}

export default page