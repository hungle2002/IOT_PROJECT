/* eslint-disable prettier/prettier */

import path from 'path';
import { readFileModeSetting, writeFileModeSetting } from '../utils/readFileJson';

class SettingsRepository {
  // implement singleton pattern
  private static instance: SettingsRepository;
  private constructor() { }
  public static getSettingsRepository(): SettingsRepository {
    if (!SettingsRepository.instance) {
      return new SettingsRepository();
    }
    return SettingsRepository.instance;
  }

  public getSettingsInfo(type: string) {
    try {
      const settingsData = readFileModeSetting(path.join(__dirname, `../../src/config/modeSetting/${type}.json`));
      return settingsData;
    } catch (error) {
      console.log(error);
    }
  }

  public updateSettingsInfo(type: string, updatedData: any) {
    try {
      updatedData = writeFileModeSetting(path.join(__dirname, `../../src/config/modeSetting/${type}.json`), JSON.stringify(updatedData, undefined, 2))
      return updatedData;
    } catch (error) {
      console.log(error);
    }
  }
  public updateAllSettingsInfo(updatedData: any) {
    try {
      writeFileModeSetting(
        path.join(__dirname, '../../src/config/modeSetting/lighting.json'),
        JSON.stringify(updatedData[1], undefined, 2)
      );
      writeFileModeSetting(
        path.join(__dirname, '../../src/config/modeSetting/soilMoisture.json'),
        JSON.stringify(updatedData[2], undefined, 2)
      );
      writeFileModeSetting(
        path.join(__dirname, '../../src/config/modeSetting/temperature.json'),
        JSON.stringify(updatedData[0], undefined, 2)
      );
      return updatedData;
    } catch (error) {
      console.log(error);
    }
  }
}

export default SettingsRepository.getSettingsRepository();
