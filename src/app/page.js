"use client";
import React, { useEffect, useState } from "react";
import CardPrincipal from "../ui/presupuesto-final/CardPrincipal";
import CardProveedor from "../ui/presupuesto-final/CardProveedor";
import getPresupuestosConfir from "../actions/getPresupuestosConfir";
import styles from "./confirmed.module.scss";


// import icono
import { SiGooglecontaineroptimizedos } from "react-icons/si";

export default function Home() {
    const [presupuestos, setPresupuestos] = useState([]);
    // useState para el loading
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const presupuestos = await getPresupuestosConfir();
                console.log(presupuestos);
                // dispatch(setPresupuesto(response));
                // dispatch(setSelecciones(selections));
                // alert("Course data has been successfully updated!");
                // router.push("/presupuestos/presupuesto-final");
                setPresupuestos(presupuestos);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
          <main className={styles.main}>
            <h1 className={styles.title}>Presupuestos Confirmados</h1>
            
            <a 
            href="/presupuestos"
            >

            <div className={styles.container}>
                <h3>¡Busquemos tu mejor opcion!.</h3>
                <SiGooglecontaineroptimizedos size={75} />
            </div>
            </a>

            <div className={styles.proveedores}>
                <h2>Buscando...</h2>  
            </div>
        </main>
        )
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Presupuesto Confirmados</h1>
            
            <a 
            href="/presupuestos"
            >

            <div className={styles.container}>
                <h3>¡Busquemos tu mejor opcion!.</h3>
                <SiGooglecontaineroptimizedos size={75} />
            </div>
            </a>

            <div className={styles.proveedores}>
                {presupuestos.map((proveedor, index) => (
                    <CardProveedor key={index} proveedor={proveedor} />
                ))}
            </div>
        </main>
    );
}
