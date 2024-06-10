"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readFileJson_1 = require("../utils/readFileJson");
// this file should be deleted
class ManualModeRepository {
    constructor() { }
    static getManualModeRepository() {
        if (!ManualModeRepository.instance) {
            return new ManualModeRepository();
        }
        return ManualModeRepository.instance;
    }
    getManualModeInfo(type) {
        try {
            const manualModeData = (0, readFileJson_1.readFileModeSetting)(path_1.default.join(__dirname, `../config/modeSetting/${type}.json`));
            return manualModeData;
        }
        catch (error) {
            console.log(error);
        }
    }
    updateManualModeInfo(type, updatedData) {
        try {
            fs_1.default.writeFileSync(path_1.default.join(__dirname, `../config/modeSetting/${type}.json`), JSON.stringify(updatedData), {
                encoding: 'utf-8',
            });
            console.log('repo put', updatedData);
            return updatedData;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ManualModeRepository.getManualModeRepository();
