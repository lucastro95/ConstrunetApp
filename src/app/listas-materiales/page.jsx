"use client"
import React, { useEffect, useState } from 'react'
import styles from './listas.module.scss'
import getListas from '../../actions/getListas'
import Loader from '../../ui/common/Loader'
import CardListas from '../../ui/listas-materiales/CardListas'
import Button from '../../ui/common/Button'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()

    const [listas, setListas] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true)
            const listas = await getListas();
            setListas(listas);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      const handleCrearLista = () => {
        router.push('/agregar-lista')
      }  

  return (
    <>
    {
        loading ?
        <Loader />
        :
        <main className={styles.main}>
            <div className={styles.layout}>
                <h2>Mis Listas del Proyecto "Casa en Quilmes"</h2>
                {
                  listas.length === 0 ?
                    <h3>No hay listas cargadas</h3>
                  :
                  <div className={styles.listas}>
                    {
                        listas.map((lista, index) => (
                            <CardListas key={lista._id} lista={lista} index={index}/>
                        ))
                    }
                  </div>
                }
                <Button text={'CREAR NUEVA LISTA'} action={handleCrearLista}/>
            </div>
          
        </main>
    }
    </>
  )
}

export default page