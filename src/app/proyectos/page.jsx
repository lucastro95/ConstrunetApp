import React from 'react';
import styles from './proyectos.module.scss';
import CardProyecto from '../../ui/proyectos/CardProyecto';

const Page = () => {
  return (
    <main className={styles.main}>
        <div className={styles.layout}>
            <h2>Mis Proyectos</h2>
            <div className={styles.proyectos}>
                <CardProyecto nombre={'Casa en Quilmes'} icono={"FaPencilRuler"} ubicacion={'Quilmes, Buenos Aires'} />
                <CardProyecto nombre={'Renovación baño'} icono={"FaHammer"} ubicacion={'CABA, Buenos Aires'} />
                <CardProyecto nombre={'Amplicación de comedor'} icono={"GiHandSaw"} ubicacion={'Moreno, Buenos Aires'} />
                <CardProyecto nombre={'Edificio Mar de Plata'} icono={"FaRulerCombined"} ubicacion={'Mar del Plata, Buenos Aires'} />
            </div>
        </div>
    </main>
  );
}

export default Page;
