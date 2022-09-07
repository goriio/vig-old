import { Line } from 'react-chartjs-2';

export function PredictionChart({ datasetIdKey, labels, data }) {
  return (
    <Line
      datasetIdKey={datasetIdKey}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          title: {
            align: 'start',
            display: true,
            text: 'Price prediction (PHP)',
          },
          scales: {
            y: {
              ticks: {
                callback: (value) => `PHP ${value}`,
              },
            },
          },
        },
      }}
      data={{
        labels: labels,
        datasets: [
          {
            data: data,
            fill: false,
            borderColor: '#1c7ed6',
            tension: 0.1,
          },
        ],
      }}
    />
  );
}
