"use client";
// pages/create-project.tsx
import React, { useState } from "react";
import styles from "./newproyectform.module.scss";
// router
import { useRouter } from "next/navigation";

const NewProyect: React.FC = () => {
    const [projectName, setProjectName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Redirect to the project page
        router.push("/agregar-lista");

        // const projectData = {
        //   projectName,
        //   location,
        //   description,
        // };

        // const response = await fetch('/api/create-project', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(projectData),
        // });

        // if (response.ok) {
        //   alert('Project created successfully!');
        //   // Reset form
        //   setProjectName('');
        //   setLocation('');
        //   setDescription('');
        // } else {
        //   alert('Failed to create project');
        // }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.header}>Crear un Nuevo Proyecto</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles["form-group"]}>
                        <label className={styles.label} htmlFor="projectName">
                            Nombre del Proyecto
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label className={styles.label} htmlFor="location">
                            Ubicación
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label className={styles.label} htmlFor="description">
                            Descripción
                        </label>
                        <textarea
                            className={styles.textarea}
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.buttoncontainer}>
                        <button className={styles.button} type="submit">
                            Agregar lista de materiales
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewProyect;
