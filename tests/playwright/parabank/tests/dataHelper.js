import fs from 'fs';

const DATA_FILE = 'customerData.json';

export function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return {};
}

export function saveData(newData) {
  const currentData = loadData();
  const mergedData = { ...currentData, ...newData };
  fs.writeFileSync(DATA_FILE, JSON.stringify(mergedData, null, 2));
  return mergedData;
}