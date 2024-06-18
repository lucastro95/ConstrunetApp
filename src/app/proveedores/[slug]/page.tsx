'use client'
import React, { useEffect, useState } from "react";
import  getProveedores  from "../../../actions/getProveedores";

export default function Page({ params }: { params: { slug: string } }) {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await getProveedores();
                setProviders(response);
            } catch (error) {
                console.error("Error al obtener los proveedores:", error);
            }
        };

        fetchProviders();
    }, []);
    return (
        <div style={{ padding: "10rem" }}>
            My Post: {params.slug}
            <h1>Proveedores</h1>
            <ul>
                {providers.map((provider: any) => (
                    <li key={provider.cuit}>{provider.nombreProveedor}</li>
                ))}
            </ul>
        </div>
    );
}
