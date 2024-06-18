"use client"
import React, { useEffect, useState } from 'react'
import styles from './listas.module.scss'
import getListas from '../../actions/getListas'
import Loader from '../../ui/common/Loader'
import CardListas from '../../ui/listas-materiales/CardListas'

const page = () => {
    const [listas, setListas] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true)
            const listas = await getListas();
            console.log(listas);
            setListas(listas);
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
        <main className={styles.main}>
            <div className={styles.layout}>
                <h2>Mis Listas del Proyecto "Casa en Quilmes"</h2>
                {
                    listas.map((lista, index) => (
                        <CardListas lista={lista} index={index}/>
                    ))
                }
            </div>
        </main>
    }
    </>
  )
}

export default page