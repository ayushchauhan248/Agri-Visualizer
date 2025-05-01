import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { getAverageProductionPerCrop } from '../utils/cropHelper';
import { Title } from '@mantine/core';

export const CropChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current!);
    const data = getAverageProductionPerCrop();
    chart.setOption({
      title: { text: 'Average Crop Production' },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: data.map((item) => item.name),
        axisLabel: { rotate: 45 },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Average Production',
          type: 'bar',
          data: data.map((item) => item.avg),
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <>
      <Title order={3} mb="md" className="table-title">
        Average Crop Production per Crop
      </Title>
      <div ref={chartRef} style={{ width: '100%', height: 400 }} />
    </>
  );
};
