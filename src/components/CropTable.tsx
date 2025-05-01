import { Title, Paper } from '@mantine/core';
import { getYearlyMinMax } from '../utils/cropHelper';
import '../App.css';

export const CropTable = () => {
  const data = getYearlyMinMax();

  return (
    <Paper shadow="md" radius="md" p="lg" withBorder className="crop-table-wrapper">
      <Title order={3} mb="md" className="table-title">
        Year-wise Crop Production (Max / Min)
      </Title>

      <table className="crop-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Max Crop</th>
            <th>Min Crop</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([year, { max, min }], i) => (
            <tr key={year} className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{year}</td>
              <td>{max}</td>
              <td>{min}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
};
