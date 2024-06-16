import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PieChart = ({ labels, data, colors }) => {
  const chartRef = useRef(null);

  // Asegurar que los colores se repitan si hay más proveedores que colores
  const backgroundColors = Array.from({ length: data.length }, (_, i) => colors[i % colors.length]);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Gasto Parcial por Proveedor',
          data: data,
          backgroundColor: backgroundColors,
          hoverOffset: 4,
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: {
                family: 'Quicksand', 
                size: 18,
                weight: 700
              },
              generateLabels: (chart) => {
                const data = chart.data;
                return data.labels.map((label, i) => ({
                  text: label,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  lineWidth: 0,
                  pointStyle: 'circle'
                }));
              }
            }
          }
        }
      }
    });

    // Cleanup function to destroy the chart when the component is unmounted
    return () => {
      chart.destroy();
    };
  }, [labels, data, backgroundColors]);

  return (
    <canvas ref={chartRef}></canvas>
  );
}

export default PieChart;
