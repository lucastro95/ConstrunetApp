'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/Store';
import styles from './enviarlista-prov.module.scss';
import getProveedores from '../../actions/getProveedores';
import postEnvioListaProvee from '../../actions/postEnvioListaProvee';
import { FaSort, FaSearch, FaCheck, FaTrashAlt } from "react-icons/fa";
import ListacreadayenviadaModal from './ListacreadayenviadaModal';
import { useRouter } from 'next/navigation';
import { setProveedor } from '../../redux/slices/proveedorSlice';

const Providers: React.FC = () => {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByRating, setSortByRating] = useState<'asc' | 'desc'>('desc');
  const [providers, setProviders] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const selectedMaterials = useSelector((state: RootState) => state.materials.selectedMaterials);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProveedores();
        console.log(response);
        
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

  const addProvider = (provider: { cuit: string, nombreProveedor: string }) => {
    setSelectedProviders([...selectedProviders, provider.cuit]);
  };

  const removeProvider = (providerCuit: string) => {
    setSelectedProviders(selectedProviders.filter(cuit => cuit !== providerCuit));
  };

  const toggleSortByRating = () => {
    setSortByRating(sortByRating === 'asc' ? 'desc' : 'asc');
  };

  const sendMaterialsToProviders = async () => {
    const providersCUIT = selectedProviders.map(cuit => cuit).filter(cuit => cuit !== null);
    dispatch(setProveedor(providersCUIT[0]))

    const materialsList = selectedMaterials.map(material => ({
      nombre: material.name,
      cantidad: material.quantity,
    }));

    const requestBody = {
      listado: materialsList,
      proveedores: providersCUIT,
    };

    try {
      const response = await postEnvioListaProvee(requestBody);
        setModalMessage('La lista se ha enviado exitosamente.');
        setIsModalOpen(true);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/proyectos');
  };

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <div className={styles.headerSection}>
          <h1 className={styles.header}>Seleccionar Proveedores</h1>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label className={styles.label} htmlFor="search">Buscar</label>
              <div className={styles.searchBox}>
                <FaSearch className={styles.searchIcon} />
                <input
                  className={styles.input}
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar proveedores..."
                />
              </div>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.label} htmlFor="sort">Ordenar por Rating</label>
              <button className={styles.sortButton} onClick={toggleSortByRating}>
                {sortByRating === 'asc' ? <FaSort /> : <FaSort />}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.providerList}>
          {filteredProviders.map(provider => (
            <div key={provider.cuit} className={styles.providerCard}>
              <div className={styles.providerInfo}>
                <h3 className={styles.providerName}>{provider.nombreProveedor}</h3>
                <p className={styles.providerRating}>Rating: {provider.reputacion}/5</p>
              </div>
              <button className={styles.button} onClick={() => addProvider(provider)}>
                <FaCheck />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.selectedProviders}>
          <h2>Proveedores Seleccionados</h2>
          {selectedProviders.length === 0 ? (
            <div className={styles.noProviders}>No se han seleccionado proveedores aún</div>
          ) : (
            selectedProviders.map(cuit => {
              const provider = providers.find(p => p.cuit === cuit);
              return (
                <div key={cuit} className={styles.selectedProvider}>
                  <p>{provider?.nombreProveedor}</p>
                  <button className={styles.removeButton} onClick={() => removeProvider(cuit)}>
                    <FaTrashAlt />
                  </button>
                </div>
              );
            })
          )}
        </div>
        <button className={styles.continueButton} onClick={sendMaterialsToProviders}>
          Enviar Lista a Proveedores
        </button>
      </div>
      <ListacreadayenviadaModal isOpen={isModalOpen} onClose={handleCloseModal} message={modalMessage} />
    </main>
  );
};

export default Providers;