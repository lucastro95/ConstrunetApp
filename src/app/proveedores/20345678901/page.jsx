"use client"
import React, { useEffect, useState } from 'react'
import styles from './proveedores.module.scss'
import CardPeticion from '../../../ui/proveedores/CardPeticion'
import getPeticiones from '../../../actions/getPeticiones'
import Loader from '../../../ui/common/Loader'

const page = () => {
  const [listado, setListado] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const listas = await getPeticiones();
        setListado(listas);
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
              <h2>Mis peticiones</h2>
              <div className={styles.materiales}>
                {
                  listado.length === 0 ? (
                    <h3 className={styles.text}>No hay peticiones</h3>
                  ) : (
                    listado.map((lista, index) => (
                      <CardPeticion key={index} text={`Petición n° ${index + 1}`} lista={lista} />
                    ))
                  )
                }
              </div>
            </div>
          </main>
      }
    </>
  )
}

export default page