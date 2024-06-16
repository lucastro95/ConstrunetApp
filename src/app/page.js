"use client";
import React, { useEffect, useState } from "react";
import getPresupuestosConfir from "../actions/getPresupuestosConfir";
import styles from "./confirmed.module.scss";

export default function Home() {
    const [presupuestos, setPresupuestos] = useState([]);
    // useState para el loading
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const presupuestos = await getPresupuestosConfir();
                console.log(presupuestos);
                setPresupuestos(presupuestos);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        </>
    );
}
