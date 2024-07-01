'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/Store';
import styles from './enviarlista-prov.module.scss';
import getProveedores from '../../actions/getProveedores';
import postEnvioListaProvee from '../../actions/postEnvioListaProvee';
import getProvRecomendados from '../../actions/getProvRecomendados';
import ListacreadayenviadaModal from './ListacreadayenviadaModal';
import { useRouter } from 'next/navigation';
import { setProveedor } from '../../redux/slices/proveedorSlice';
import FiltroNombre from '../../ui/enviar-lista-proveedores/FiltroNombre';
import FiltroRating from '../../ui/enviar-lista-proveedores/FiltroRating'
import CardProveedor from '../../ui/enviar-lista-proveedores/CardProveedor'
import ProvSelected from '../../ui/enviar-lista-proveedores/ProvSelected'
import Button from '../../ui/common/Button';

const Providers: React.FC = () => {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByRating, setSortByRating] = useState<'asc' | 'desc'>('desc');
  const [providers, setProviders] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loadingRecommended, setLoadingRecommended] = useState<boolean>(true);

  const selectedMaterials = useSelector((state: RootState) => state.materials.selectedMaterials);
  const listado = useSelector((state: RootState) => state.listado);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {  
    const requestBody = {
      listaId: listado.listado.listaId,
      listaCuitSeleccionados: selectedProviders
    };

    console.log(requestBody);

    const fetchRecomendados = async () => {
      try {
        setLoadingRecommended(true)
        const response = await getProvRecomendados(requestBody);
        setRecommended(response);
        console.log(response);
        
        setLoadingRecommended(false);
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        setLoadingRecommended(false);
      }
    };

    fetchRecomendados()
  }, [selectedProviders])


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

  const addProvider = (provider: { cuit: string, nombreProveedor: string }) => {
    const providerExists = selectedProviders.some(selectedProvider => selectedProvider === provider.cuit);

    if (!providerExists) {
      setSelectedProviders([...selectedProviders, provider.cuit]);
    }
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
        <h2 className={styles.title}>Seleccionar Proveedores</h2>
        <div className={styles.providerSelection}>
          <div className={styles.providers}>
            <div className={styles.headerSection}>
              <div className={styles.filters}>
                <FiltroNombre searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <FiltroRating sortByRating={sortByRating} toggleSortByRating={toggleSortByRating} />
              </div>
            </div>
            <div className={styles.providerList}>
              {filteredProviders.map(provider => (
                <CardProveedor key={provider.cuit} provider={provider} addProvider={addProvider} />
              ))}
            </div>
            <div className={styles.selectedProviders}>
              <h2>Proveedores Seleccionados</h2>
              {selectedProviders.length === 0 ? (
                <p className={styles.noProviders}>No se han seleccionado proveedores aún</p>
              ) : (
                selectedProviders.map(cuit => {
                  const provider = providers.find(p => p.cuit === cuit);
                  return (
                    <ProvSelected key={provider.cuit} provider={provider} removeProvider={removeProvider} />
                  );
                })
              )}
            </div>
          </div>

          <div className={styles.recomendaciones}>
            <h3 className={styles.title}>Proveedores recomendados</h3>
            {loadingRecommended ? (
              <p>Cargando recomendaciones...</p>
            ) : (
              recommended.mejorPrecio.length === 0 ? (
                <p className={styles.seleccionados}>Ya se seleccionaron proveedores para todos los materiales</p>
              ) : (
                <div className={styles.container}>
                  <div className={styles.mejorPrecio}>
                    <h4>Mejor Precio</h4>
                    {recommended.mejorPrecio.map((item, index) => (
                      <div key={index}>
                        <p className={styles.name}>{item.nombre}{item.marca !== "" && ` - ${item.marca}`}</p>
                        <p>Precio: ${item.precio}</p>
                        <p>Llega en {item.proveedor.tiempoEntrega} día/s</p>
                        <CardProveedor provider={item.proveedor} addProvider={addProvider} />
                      </div>
                    ))}
                  </div>
                  <div className={styles.mejorTiempo}>
                    <h4>Mejor Tiempo</h4>
                    {recommended.mejorTiempo.map((item, index) => (
                      <div key={index}>
                        <p className={styles.name}>{item.nombre}{item.marca !== "" && ` - ${item.marca}`}</p>
                        <p>Precio: ${item.precio}</p>
                        <p>Llega en {item.proveedor.tiempoEntrega} día/s</p>
                        <CardProveedor provider={item.proveedor} addProvider={addProvider} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <Button text={'Enviar Lista a Proveedores'} action={sendMaterialsToProviders} />
      </div>

      <ListacreadayenviadaModal isOpen={isModalOpen} onClose={handleCloseModal} message={modalMessage} />
    </main>
  );
};

export default Providers;