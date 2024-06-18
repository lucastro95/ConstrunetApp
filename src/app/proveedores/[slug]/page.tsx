'use client'
import React, { useEffect, useState } from "react";
import  getProveedores  from "../../../actions/getProveedorXCuit";
import getProveedorXCuit from "../../../actions/getProveedorXCuit";

export default function Page({ params }: { params: { slug: string } }) {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await getProveedorXCuit(params.slug);
                setProviders(response);
                console.log("Proveedores:", response);
            } catch (error) {
                console.error("Error al obtener los proveedores:", error);
            }
        };

        fetchProviders();
    }, []);
    return (
        <div style={{ padding: "10rem" }}>
            My Post: {params.slug}
            <h1>Proveedor</h1>
            <ul>
                {providers.map((provider: any) => (
                    <><li key={provider.cuit}>{provider.nombreProveedor}</li><li key={provider.cuit}>{provider.cuit}</li><li key={provider.cuit}>{provider.reputacion}</li></>
                ))}
            </ul>
        </div>
    );
}
