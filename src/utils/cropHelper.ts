import rawData from '../data/crops.json';

type CropData = {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string;
};

const data = rawData as CropData[];

export function getYearlyMinMax() {
  const result: Record<string, { max: string; min: string }> = {};

  const grouped = data.reduce((acc, item) => {
    const year = item.Year.split(',')[1].trim();
    const production = parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0;
    if (!acc[year]) acc[year] = [];
    acc[year].push({ name: item["Crop Name"], production });
    return acc;
  }, {} as Record<string, { name: string; production: number }[]>);

  for (const year in grouped) {
    const crops = grouped[year];
    crops.sort((a, b) => b.production - a.production);
    result[year] = {
      max: crops[0].name,
      min: crops[crops.length - 1].name,
    };
  }

  return result;
}

export function getAverageProductionPerCrop() {
  const map: Record<string, { total: number; count: number }> = {};

  data.forEach((item) => {
    const name = item["Crop Name"];
    const production = parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0;
    if (!map[name]) map[name] = { total: 0, count: 0 };
    map[name].total += production;
    map[name].count++;
  });

  return Object.entries(map).map(([name, { total, count }]) => ({
    name,
    avg: total / count,
  }));
}
