import React from 'react'
import styles from './final.module.scss'
import CardPrincipal from '../../../ui/presupuesto-final/CardPrincipal'
import CardProveedor from '../../../ui/presupuesto-final/CardProveedor'
import CheckCard from '../../../ui/presupuesto-final/CheckCard'

const page = () => {
  return (
    <main className={styles.main}>
        <h1 className={styles.title}>Presupuesto Final</h1>
        <div className={styles.principal}>
            <CardPrincipal precio={'$135000'}/>
            <div className={styles.checkcontainer}>
                <CheckCard text={'Menor tiempo de entrega'}/>
                <CheckCard text={'Menor precio posible'}/>
                <CheckCard text={'Menor cantidad de proveedores'}/>
                <CheckCard text={'Mayor calidad de materiales'}/>
            </div>
        </div>
        <div className={styles.proveedores}>
            <CardProveedor nombre={'Easy'} />
            <CardProveedor nombre={'Corralón Los Amigos'} />
            <CardProveedor nombre={'Vidriería Clara'} />
            <CardProveedor nombre={'Los Arces'} />
        </div>
    </main>
  )
}

export default page