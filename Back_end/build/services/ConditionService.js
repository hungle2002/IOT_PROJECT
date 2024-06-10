"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSetting = void 0;
const readFileJson_1 = require("../utils/readFileJson");
const path_1 = __importDefault(require("path"));
const getAllSetting = () => {
    const lightSetting = (0, readFileJson_1.readFileModeSetting)(path_1.default.join(__dirname, '../..', '/src/config/modeSetting/lighting.json'));
    const tempSetting = (0, readFileJson_1.readFileModeSetting)(path_1.default.join(__dirname, '../..', '/src/config/modeSetting/temperature.json'));
    const soilSetting = (0, readFileJson_1.readFileModeSetting)(path_1.default.join(__dirname, '../..', '/src/config/modeSetting/soilMoisture.json'));
    return [tempSetting, lightSetting, soilSetting];
};
exports.getAllSetting = getAllSetting;
