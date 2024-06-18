import React from 'react'
import styles from './proyectos.module.scss'
import CardProyecto from '../../ui/proyectos/CardProyecto'

const page = () => {
  return (
    <main className={styles.main}>
        <div className={styles.layout}>
            <h2>Mis Proyectos</h2>
            <div className={styles.proyectos}>
                <CardProyecto nombre={'Casa en Quilmes'}/>
                <CardProyecto nombre={'Renovación baño'}/>
                <CardProyecto nombre={'Patio Interno'}/>
                <CardProyecto nombre={'Edificio Mar del Plata'}/>
                <CardProyecto nombre={'Ampliación casa en Moreno'}/>
            </div>
        </div>
    </main>
  )
}

export default page