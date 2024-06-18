import React from 'react'
import styles from './proveedores.module.scss'
import CardPeticion from '../../ui/proveedores/CardPeticion'

const page = () => {

    const listado = [
        {
          "idListado": "0f655654-d32b-4321-8c22-c800cfbea081",
          "materiales": [
            {
              "nombre": "Cemento",
              "cantidad": 1,
              "_id": "6670bcbcd00cfb7c50633bd3"
            },
            {
              "nombre": "Cal",
              "cantidad": 1,
              "_id": "6670bcbcd00cfb7c50633bd4"
            }
          ]
        },
        {
            "idListado": "0f655654-d32b-4321-8c22-c800cfbea082",
            "materiales": [
              {
                "nombre": "Cemento",
                "cantidad": 1,
                "_id": "6670bcbcd00cfb7c50633bd3"
              },
              {
                "nombre": "Cal",
                "cantidad": 1,
                "_id": "6670bcbcd00cfb7c50633bd4"
              },
              {
                "nombre": "Ladrillos",
                "cantidad": 1,
                "_id": "6670bcbcd00cfb7c50633bd5"
              }
            ]
          },
      ]

  return (
    <main className={styles.main}>
        <div className={styles.layout}>
            <h2>Mis peticiones</h2>
            <CardPeticion text={'Petición n° 1'}/>
        </div>
    </main>
  )
}

export default page