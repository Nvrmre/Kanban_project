import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TaskPieChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Hancurkan chart sebelumnya
        }

        chartInstance.current = new Chart(ctx, {
          type: 'pie', // Jenis grafik pie
          data: {
            labels: ['Complete', 'Overdue'], // Label kategori
            datasets: [{
              data: [data.complete, data.overdue], // Menggunakan data yang diterima
              backgroundColor: ['rgba(37, 99, 235, 0.8)', 'rgba(239, 68, 68, 0.8)'], // Warna untuk masing-masing kategori
              borderColor: ['rgba(37, 99, 235, 1)', 'rgba(239, 68, 68, 1)'], // Warna border
              borderWidth: 1 // Ketebalan border
            }]
          },
          options: {
            responsive: true, // Responsif untuk berbagai ukuran layar
            aspectRatio: 2.5, // Menyesuaikan aspek rasio grafik
            plugins: {
              legend: {
                position: 'bottom' // Menempatkan legenda di bawah grafik
              },
              title: {
                display: true,
                text: 'Task Distribution' // Judul grafik
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Hancurkan chart saat komponen di-unmount
      }
    };
  }, [data]);

  return (
    <canvas
      ref={chartRef} // Menghubungkan canvas ke chart.js
    />
  );
}
