import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from './modal.module.scss'
import Check from './Check'
import { setPresupuesto } from '../../../redux/slices/presupuestoSlice';
import { setSelecciones } from '../../../redux/slices/selectionsSlice';
import getPresupuestoOptimo from '../../../actions/getPresupuestoOptimo'
import { useRouter } from 'next/navigation';
import Button from '../../common/Button';
import { IoMdCloseCircleOutline } from "react-icons/io";


const ModalPresupuesto = ({ id, handleClose }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    
    const [selections, setSelections] = useState({
        tiempoEntrega: false,
        menorPrecio: false
    });

    const handleGeneratePresupuesto = async () => {
        try {
            const response = await getPresupuestoOptimo(selections, id);
            dispatch(setPresupuesto(response));
            dispatch(setSelecciones(selections));
            router.push(`/presupuestos/${id}/presupuesto-final`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={handleClose}>
                    <IoMdCloseCircleOutline style={{ color: "var(--lila-oscuro)", fontSize: "2rem" }}/>
                </button>
                <h2 className={styles.title}>¿Cómo querés tu presupuesto?</h2>
                <div className={styles.checks}>
                    <Check
                        text={'Mejor precio'}
                        name={'menorPrecio'}
                        selections={selections}
                        setSelections={setSelections}
                    />
                    <Check
                        text={'Mejor tiempo de entrega'}
                        name={'tiempoEntrega'}
                        selections={selections}
                        setSelections={setSelections}
                    />
                </div>
                <Button text={'GENERAR PRESUPUESTO'} action={handleGeneratePresupuesto} />
            </div>
        </div>
    )
}

export default ModalPresupuesto;
