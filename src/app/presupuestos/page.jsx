"use client";
import React, { useEffect, useState } from 'react'
import styles from './presupuestos.module.scss'
import { useRouter } from 'next/navigation';
import Button from '../../ui/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import getPresupuestosConfir from '../../actions/getPresupuestosConfir';
import CardProveedor from '../../ui/presupuesto-final/CardProveedor';
import Loader from '../../ui/common/Loader.jsx'
import ModalPresupuesto from '../../ui/presupuestos/modal/ModalPresupuesto'


const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false)

  const handleGeneratePresupuesto = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const presupuestos = await getPresupuestosConfir();
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
            {modal && <ModalPresupuesto handleClose={handleCloseModal} />}
            <main className={styles.main}>
              <div className={styles.layout}>
                <h2>Presupuestos del Proyecto "Casa en Los Andes"</h2>
                {
                  presupuestos.map(pres => (
                    <CardProveedor proveedor={pres} />
                  ))
                }
                <div className={styles.botones}>
                  <Button text={'ATRAS'} action={() => { }} />
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