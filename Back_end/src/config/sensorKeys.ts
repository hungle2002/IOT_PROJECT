export const areaKey: string[] = ['iot-btl.area1', 'iot-btl.area2', 'iot-btl.area3'];
export const fertilizerKey: string[] = ['iot-btl.mixer1', 'iot-btl.mixer2', 'iot-btl.mixer3'];
export const pumpKey: string[] = ['iot-btl.pumpin', 'iot-btl.pumpout'];

export const sensorKey: string[] = [...areaKey, ...fertilizerKey, ...pumpKey];
