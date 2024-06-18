'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/Store';
import styles from './enviarlista-prov.module.scss';
import getProveedores from '../../actions/getProveedores';
import postEnvioListaProvee from '../../actions/postEnvioListaProvee'

const Providers = () => {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByRating, setSortByRating] = useState<'asc' | 'desc'>('desc');
  const [providers, setProviders] = useState<any[]>([]);

  const selectedMaterials = useSelector((state: RootState) => state.materials.selectedMaterials);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProveedores();
        setProviders(response);
      } catch (error) {
        console.error('Error al obtener los proveedores:', error);
      }
    };

    fetchProviders();
  }, []);

  const filteredProviders = providers
    .filter(provider => provider.nombreProveedor.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortByRating === 'asc' ? a.reputacion - b.reputacion : b.reputacion - a.reputacion));

  const addProvider = (providerCuit: string) => {
    if (!selectedProviders.includes(providerCuit)) {
      setSelectedProviders([...selectedProviders, providerCuit]);
    }
  };

  const removeProvider = (providerCuit: string) => {
    setSelectedProviders(selectedProviders.filter(cuit => cuit !== providerCuit));
  };

  const toggleSortByRating = () => {
    setSortByRating(sortByRating === 'asc' ? 'desc' : 'asc');
  };

  const sendMaterialsToProviders = async () => {
    const requestBody = {
      listado: selectedMaterials.map(material => ({
        nombre: material.name,
        cantidad: material.quantity,
      })),
      proveedores: selectedProviders,
    };

    console.log('Enviando solicitud al servidor:', requestBody);

    try {
      const response = await postEnvioListaProvee(requestBody)

      // if (!response.ok) {
      //   throw new Error('Error en la solicitud');
      // }

      // const reponse = await response.json();
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.header}>Selección de Proveedores</h1>
        <div className={styles.filters}>
          <div className={styles['filter-group']}>
            <label className={styles.label} htmlFor="search">Buscar por Nombre</label>
            <input
              className={styles.input}
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Escribe un nombre..."
            />
          </div>
          <div className={styles['filter-group']}>
            <label className={styles.label} htmlFor="sort">Ordenar por Rating</label>
            <button className={styles.sortButton} onClick={toggleSortByRating}>
              {sortByRating === 'asc' ? 'Menor a Mayor' : 'Mayor a Menor'}
            </button>
          </div>
        </div>
        <div className={styles['provider-list']}>
          {filteredProviders.map(provider => (
            <div key={provider.cuit} className={styles['provider-card']}>
              <h3>{provider.nombreProveedor}</h3>
              <p>Reputación: {provider.reputacion}/5</p>
              <button className={styles.button} onClick={() => addProvider(provider.cuit)}>
                Seleccionar
              </button>
            </div>
          ))}
        </div>
        <div className={styles['selected-providers']}>
          <h2>Proveedores Seleccionados</h2>
          {selectedProviders.map(cuit => {
            const provider = providers.find(p => p.cuit === cuit);
            return (
              <div key={cuit} className={styles['selected-provider']}>
                <p>{provider?.nombreProveedor}</p>
                <button className={styles.button} onClick={() => removeProvider(cuit)}>
                  Eliminar
                </button>
              </div>
            );
          })}
        </div>
        <button className={styles['continue-button']} onClick={sendMaterialsToProviders}>
          Enviar Lista a Proveedores
        </button>
      </div>
    </div>
  );
};

export default Providers;