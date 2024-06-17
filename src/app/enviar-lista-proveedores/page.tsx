'use client'
// pages/providers.tsx
import React, { useState } from 'react';
import styles from './enviarlista-prov.module.scss';

const providersDummyData = [
  { id: 1, name: 'Proveedor 1', rating: 4.5, location: 'Ciudad 1', coordinates: [-58.4173, -34.6118] },
  { id: 2, name: 'Proveedor 2', rating: 4.2, location: 'Ciudad 2', coordinates: [-58.3816, -34.6037] },
  { id: 3, name: 'Proveedor 3', rating: 4.8, location: 'Ciudad 3', coordinates: [-58.4305, -34.6037] },
  // Agrega más proveedores de demostración según sea necesario
];

// Supongamos que este es el proveedor recomendado por tu algoritmo de IA
const recommendedProvider = providersDummyData[0];

const Providers: React.FC = () => {
  const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByRating, setSortByRating] = useState<'asc' | 'desc'>('desc'); // 'asc' para ascendente, 'desc' para descendente

  const filteredProviders = providersDummyData
    .filter(provider => provider.location.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortByRating === 'asc' ? a.rating - b.rating : b.rating - a.rating));

  const addProvider = (provider: { id: number, name: string }) => {
    setSelectedProviders([...selectedProviders, provider.id]);
  };

  const removeProvider = (providerId: number) => {
    setSelectedProviders(selectedProviders.filter(id => id !== providerId));
  };

  const toggleSortByRating = () => {
    setSortByRating(sortByRating === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.header}>Selección de Proveedores</h1>
        <div className={styles['recommended-provider']}>
          <h2>Mejor Proveedor Recomendado</h2>
          <div className={styles['recommended-provider-card']}>
            <h3>{recommendedProvider.name}</h3>
            <p>{recommendedProvider.location}</p>
            <p>Rating: {recommendedProvider.rating}/5</p>
            <button
              className={styles.button}
              onClick={() => addProvider(recommendedProvider)}
            >
              Seleccionar
            </button>
          </div>
        </div>
        <div className={styles.filters}>
          <div className={styles['filter-group']}>
            <label className={styles.label} htmlFor="search">Buscar por Ubicación</label>
            <input
              className={styles.input}
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Escribe una ubicación..."
            />
          </div>
          <div className={styles['filter-group']}>
            <label className={styles.label} htmlFor="sort">Ordenar por Rating</label>
            <button
              className={styles.sortButton}
              onClick={toggleSortByRating}
            >
              {sortByRating === 'asc' ? 'Menor a Mayor' : 'Mayor a Menor'}
            </button>
          </div>
        </div>
        <div className={styles['provider-list']}>
          {filteredProviders.map(provider => (
            <div key={provider.id} className={styles['provider-card']}>
              <h3>{provider.name}</h3>
              <p>{provider.location}</p>
              <p>Rating: {provider.rating}/5</p>
              <button
                className={styles.button}
                onClick={() => addProvider(provider)}
              >
                Seleccionar
              </button>
            </div>
          ))}
        </div>
        <div className={styles['selected-providers']}>
          <h2>Proveedores Seleccionados</h2>
          {selectedProviders.map(id => {
            const provider = providersDummyData.find(p => p.id === id);
            return (
              <div key={id} className={styles['selected-provider']}>
                <p>{provider?.name}</p>
                <button
                  className={styles.button}
                  onClick={() => removeProvider(id)}
                >
                  Eliminar
                </button>
              </div>
            );
          })}
        </div>
        <button
          className={styles['continue-button']}
          onClick={() => console.log(selectedProviders)}
        >
          Continuar a Proveedores
        </button>
      </div>
    </div>
  );
};

export default Providers;