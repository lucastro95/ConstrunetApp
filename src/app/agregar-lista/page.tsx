"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { addMaterial, updateQuantity } from "../../redux/slices/MaterialsSlice.js";
import styles from "./AddMaterials.module.scss";
import { FaBoxOpen, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

const materialsDummyData = [
    { id: 1, name: "Cemento", category: "Construcción" },
    { id: 2, name: "Arena", category: "Construcción" },
    { id: 3, name: "Grava", category: "Construcción" },
    { id: 4, name: "Tablas de Madera", category: "Madera" },
    { id: 5, name: "Clavos", category: "Ferretería" },
    // Agrega más materiales de demostración según sea necesario
];

const AddMaterials: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const selectedMaterials = useSelector((state: RootState) => state.materials.selectedMaterials);

    const filteredMaterials = materialsDummyData.filter((material) => {
        return (
            (selectedCategory === "" ||
                material.category === selectedCategory) &&
            (searchTerm === "" ||
                material.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    const handleAddMaterial = (material: { id: number; name: string; category: string }) => {
        dispatch(addMaterial(material));
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const router= useRouter();

    const handleAddLista= ()=>{
        router.push("/enviar-lista-proveedores")
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.selectSection}>
                    <h1 className={styles.header}>
                        Agregar Materiales al Proyecto
                    </h1>
                    <div className={styles.filters}>
                        <div className={styles["filter-group"]}>
                            <label className={styles.label} htmlFor="category">
                                Filtrar por Categoría
                            </label>
                            <select
                                className={styles.select}
                                id="category"
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }>
                                <option value="">Todas las Categorías</option>
                                <option value="Construcción">
                                    Construcción
                                </option>
                                <option value="Madera">Madera</option>
                                <option value="Ferretería">Ferretería</option>
                                {/* Agrega más opciones según las categorías disponibles */}
                            </select>
                        </div>
                        <div className={styles["filter-group"]}>
                            <label className={styles.label} htmlFor="search">
                                Buscar por Nombre
                            </label>
                            <input
                                className={styles.input}
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles["materials-list"]}>
                        {filteredMaterials.map((material) => (
                            <div
                                key={material.id}
                                className={styles["material-item"]}>
                                <div className={styles["material-info"]}>
                                    <span className={styles["material-name"]}>
                                        {material.name}
                                    </span>
                                    <span
                                        className={styles["material-category"]}>
                                        {material.category}
                                    </span>
                                </div>
                                <button
                                    className={styles.button}
                                    onClick={() => handleAddMaterial(material)}>
                                    <FaPlus />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleAddLista} className={styles["continue-button"]}>
                        Continuar para Escoger Proveedores
                    </button>
                </div>
                <div className={styles.selectedSection}>
                    <div className={styles["selected-materials"]}>
                        <h2>Materiales Seleccionados</h2>
                        {selectedMaterials.length === 0 ? (
                            <div className={styles["no-materials"]}>
                                <FaBoxOpen
                                    className={styles["no-materials-icon"]}
                                />
                                <p>No se han seleccionado materiales aún</p>
                            </div>
                        ) : (
                            selectedMaterials.map((material) => (
                                <div
                                    key={material.id}
                                    className={styles["selected-material"]}>
                                    <p>{material.name}</p>
                                    <input
                                        type="number"
                                        className={styles["quantity-input"]}
                                        value={material.quantity}
                                        min="1"
                                        onChange={(e) =>
                                            handleUpdateQuantity(
                                                material.id,
                                                parseInt(e.target.value, 10)
                                            )
                                        }
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMaterials;
