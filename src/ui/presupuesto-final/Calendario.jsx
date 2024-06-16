import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './calendario.module.scss'

const CalendarComponent = ({ presupuestos }) => {
    const [value, setValue] = useState(new Date());
    const [selectedDateInfo, setSelectedDateInfo] = useState([]);
  
    // Función para calcular las fechas de entrega y los detalles asociados
    const calculateDeliveryInfo = () => {
      const deliveryInfo = {};
  
      presupuestos.forEach(presupuesto => {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + parseInt(presupuesto.tiempoEntrega, 10));
  
        const formattedDate = deliveryDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  
        if (!deliveryInfo[formattedDate]) {
          deliveryInfo[formattedDate] = [];
        }
  
        deliveryInfo[formattedDate].push({
          proveedor: presupuesto.NombreProveedor,
          materiales: presupuesto.materiales
        });
      });
  
      return deliveryInfo;
    };
  
    // Obtener la información de entrega inicial
    const deliveryInfo = calculateDeliveryInfo();
  
    // Función para marcar los días de entrega en el calendario
    const tileClassName = ({ date, view }) => {
      if (view === 'month') {
        const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        if (deliveryInfo[formattedDate]) {
          return 'highlight';
        }
      }
      return null;
    };
  
    // Función para manejar el clic en un día del calendario
    const handleDateClick = (date) => {
      const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const info = deliveryInfo[formattedDate];
      setSelectedDateInfo(info || []);
    };
  
    return (
      <div className={styles.main}>
        <div className={styles.calendar_container}>
          <Calendar
            onChange={setValue}
            value={value}
            tileClassName={tileClassName}
            onClickDay={handleDateClick} // Manejar el clic en un día del calendario
          />
        </div>
        <div className={styles.detail}>
          {selectedDateInfo.length > 0 && (
            <div>
              <h2>Detalles de entrega para {value.toLocaleDateString()}</h2>
              {selectedDateInfo.map((info, index) => (
                <div key={index}>
                  <h3>Proveedor: {info.proveedor}</h3>
                  <ul>
                    {info.materiales.map((material, idx) => (
                      <li key={idx}>
                        1{material.cantidad}u. - {material.nombre}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}

export default CalendarComponent;
