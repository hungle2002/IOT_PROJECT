"use strict";
/* eslint-disable prettier/prettier */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const readFileJson_1 = require("../utils/readFileJson");
class SettingsRepository {
    constructor() { }
    static getSettingsRepository() {
        if (!SettingsRepository.instance) {
            return new SettingsRepository();
        }
        return SettingsRepository.instance;
    }
    getSettingsInfo(type) {
        try {
            const settingsData = (0, readFileJson_1.readFileModeSetting)(path_1.default.join(__dirname, `../../src/config/modeSetting/${type}.json`));
            return settingsData;
        }
        catch (error) {
            console.log(error);
        }
    }
    updateSettingsInfo(type, updatedData) {
        try {
            updatedData = (0, readFileJson_1.writeFileModeSetting)(path_1.default.join(__dirname, `../../src/config/modeSetting/${type}.json`), JSON.stringify(updatedData, undefined, 2));
            return updatedData;
        }
        catch (error) {
            console.log(error);
        }
    }
    updateAllSettingsInfo(updatedData) {
        try {
            (0, readFileJson_1.writeFileModeSetting)(path_1.default.join(__dirname, '../../src/config/modeSetting/lighting.json'), JSON.stringify(updatedData[1], undefined, 2));
            (0, readFileJson_1.writeFileModeSetting)(path_1.default.join(__dirname, '../../src/config/modeSetting/soilMoisture.json'), JSON.stringify(updatedData[2], undefined, 2));
            (0, readFileJson_1.writeFileModeSetting)(path_1.default.join(__dirname, '../../src/config/modeSetting/temperature.json'), JSON.stringify(updatedData[0], undefined, 2));
            return updatedData;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = SettingsRepository.getSettingsRepository();
