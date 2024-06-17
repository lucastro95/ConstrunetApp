'use client'
// pages/add-materials.tsx
import React, { useState } from 'react';
import styles from './AddMaterials.module.scss';
import { FaBoxOpen } from 'react-icons/fa';

const materialsDummyData = [
    { id: 1, name: 'Cemento', category: 'Construcción' },
    { id: 2, name: 'Arena', category: 'Construcción' },
    { id: 3, name: 'Grava', category: 'Construcción' },
    { id: 4, name: 'Tablas de Madera', category: 'Madera' },
    { id: 5, name: 'Clavos', category: 'Ferretería' },
    // Agrega más materiales de demostración según sea necesario
  ];
  
  const AddMaterials: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMaterials, setSelectedMaterials] = useState<{ id: number, name: string, quantity: number }[]>([]);
  
    const filteredMaterials = materialsDummyData.filter((material) => {
      return (
        (selectedCategory === '' || material.category === selectedCategory) &&
        (searchTerm === '' || material.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  
    const addMaterial = (material: { id: number, name: string }) => {
      const existingMaterial = selectedMaterials.find((m) => m.id === material.id);
      if (existingMaterial) {
        setSelectedMaterials(selectedMaterials.map((m) =>
          m.id === material.id ? { ...m, quantity: m.quantity + 1 } : m
        ));
      } else {
        setSelectedMaterials([...selectedMaterials, { ...material, quantity: 1 }]);
      }
    };
  
    const updateQuantity = (id: number, quantity: number) => {
      setSelectedMaterials(selectedMaterials.map((m) =>
        m.id === id ? { ...m, quantity } : m
      ));
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.header}>Agregar Materiales al Proyecto</h1>
          <div className={styles.filters}>
            <div className={styles['filter-group']}>
              <label className={styles.label} htmlFor="category">Filtrar por Categoría</label>
              <select
                className={styles.select}
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas las Categorías</option>
                <option value="Construcción">Construcción</option>
                <option value="Madera">Madera</option>
                <option value="Ferretería">Ferretería</option>
                {/* Agrega más opciones según las categorías disponibles */}
              </select>
            </div>
            <div className={styles['filter-group']}>
              <label className={styles.label} htmlFor="search">Buscar por Nombre</label>
              <input
                className={styles.input}
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className={styles['materials-list']}>
            {filteredMaterials.map((material) => (
              <div key={material.id} className={styles['material-card']}>
                <h3>{material.name}</h3>
                <p>{material.category}</p>
                <button className={styles.button} onClick={() => addMaterial(material)}>Agregar</button>
              </div>
            ))}
          </div>
          <div className={styles['selected-materials']}>
            <h2>Materiales Seleccionados</h2>
            {selectedMaterials.length === 0 ? (
              <div className={styles['no-materials']}>
                <FaBoxOpen className={styles['no-materials-icon']} />
                <p>No se han seleccionado materiales aún</p>
              </div>
            ) : (
              selectedMaterials.map((material) => (
                <div key={material.id} className={styles['selected-material']}>
                  <p>{material.name}</p>
                  <input
                    type="number"
                    className={styles['quantity-input']}
                    value={material.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(material.id, parseInt(e.target.value, 10))}
                  />
                </div>
              ))
            )}
          </div>
          <button className={styles['continue-button']}>Continuar para Escoger Proveedores</button>
        </div>
      </div>
    );
  };
  
  export default AddMaterials;
