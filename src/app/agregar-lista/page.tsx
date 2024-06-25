"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { addMaterial, updateQuantity, deleteMaterial } from "../../redux/slices/MaterialsSlice.js";
import styles from "./AddMaterials.module.scss";
import { FaBoxOpen } from "react-icons/fa";
import { useRouter } from "next/navigation";
import FiltroCategoria from '../../ui/agregar-lista/FiltroCategoria'
import FiltroNombre from '../../ui/agregar-lista/FiltroNombre'
import CardMaterial from '../../ui/agregar-lista/CardMaterial'
import MaterialSeleccionado from '../../ui/agregar-lista/MaterialSeleccionado'
import Button from "../../ui/common/Button";
import Loader from "../../ui/common/Loader";
import Paginacion from '../../ui/agregar-lista/Paginacion'
import getMateriales from '../../actions/getMateriales'
import postListado from '../../actions/postListado'
import { setListado } from "../../redux/slices/listadoSlice";


const AddMaterials: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [materials, setMaterials] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(1)

    const dispatch = useDispatch();
    const selectedMaterials = useSelector((state: RootState) => state.materials.selectedMaterials);

    // useEffect(() => {
    //   console.log(selectedMaterials);
    // }, [selectedMaterials])

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [page])


    const fetchData = async () => {
        try {
            setLoading(true)
            const listas = await getMateriales({ page });
            // console.log(listas);
            setMaterials(listas.docs);
            setLimit(listas.totalPages)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredMaterials = materials.filter((material) => {
        return (
            (selectedCategory === "" ||
                material.categoria === selectedCategory) &&
            (searchTerm === "" ||
                material.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    const handleAddMaterial = (material: { id: number; name: string; category: string }) => {
        dispatch(addMaterial(material));
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleDeleteMaterial = (id: String) => {
        dispatch(deleteMaterial(id));
    };

    const router = useRouter();

    const handleAddLista = async () => {
        const materialsList = selectedMaterials.map(material => ({
            nombre: material.nombre,
            peso: material.cantidad,
            marca: material.marca,
            cantidad: material.quantity
        }));

        const requestBody = {
            listado: materialsList
        };

        try {
            const response = await postListado(requestBody);
            dispatch(setListado(response))
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }

        router.push("/enviar-lista-proveedores")
    }

    return (
        <>
            {loading ?
                <Loader />
                :
                <main className={styles.main}>
                    <div className={styles.layout}>
                        <div className={styles.selectSection}>
                            <h2 className={styles.header}>Agregar Materiales al Proyecto</h2>
                            <div className={styles.filters}>
                                <FiltroCategoria selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                                <FiltroNombre searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            </div>
                            <div className={styles.materialsList}>
                                {filteredMaterials.map((material) => (
                                    <CardMaterial
                                        key={material._id}
                                        material={material}
                                        handleAddMaterial={handleAddMaterial} />
                                ))}
                                <Paginacion page={page} limit={limit} setPage={setPage} />
                            </div>
                            <Button text={"Continuar para Escoger Proveedores"} action={handleAddLista} />
                        </div>
                        <div className={styles.selectedSection}>
                            <div className={styles.selectedMaterials}>
                                <h2 className={styles.selectedText}>Materiales Seleccionados</h2>
                                {selectedMaterials.length === 0 ? (
                                    <div className={styles.noMaterials}>
                                        <FaBoxOpen
                                            className={styles.icon}
                                        />
                                        <p>No se han seleccionado materiales aún</p>
                                    </div>
                                ) : (
                                    selectedMaterials.map((material) => (
                                        <MaterialSeleccionado
                                            key={material._id}
                                            material={material}
                                            handleUpdateQuantity={handleUpdateQuantity}
                                            handleDeleteMaterial={handleDeleteMaterial} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            }
        </>
    );
};

export default AddMaterials;
