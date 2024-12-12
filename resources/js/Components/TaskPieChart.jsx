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
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Complete', 'Overdue'],
            datasets: [{
              data: [data.complete, data.overdue],
              backgroundColor: ['rgba(37, 99, 235, 0.8)', 'rgba(239, 68, 68, 0.8)'],
              borderColor: ['rgba(37, 99, 235, 1)', 'rgba(239, 68, 68, 1)'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom'
              },
              title: {
                display: true,
                text: 'Task Distribution'
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
}

