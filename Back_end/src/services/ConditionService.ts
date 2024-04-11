import {readFileModeSetting} from '../utils/readFileJson';
import path from 'path';

export const getAllSetting = () => {
  const lightSetting = readFileModeSetting(path.join(__dirname, '../..', '/src/config/modeSetting/lighting.json'));
  const tempSetting = readFileModeSetting(path.join(__dirname, '../..', '/src/config/modeSetting/temperature.json'));
  const soilSetting = readFileModeSetting(path.join(__dirname, '../..', '/src/config/modeSetting/soilMoisture.json'));
  return [tempSetting, lightSetting, soilSetting];
};
