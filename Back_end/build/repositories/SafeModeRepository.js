"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readFileJson_1 = require("../utils/readFileJson");
// this file should be deleted
class SafeModeRepository {
    constructor() { }
    static getSafeModeRepository() {
        if (!SafeModeRepository.instance) {
            return new SafeModeRepository();
        }
        return SafeModeRepository.instance;
    }
    getSafeModeInfo(type) {
        try {
            const safeModeData = (0, readFileJson_1.readFileModeSetting)(path_1.default.join(__dirname, `../config/modeSetting/${type}.json`));
            return safeModeData;
        }
        catch (error) {
            console.log(error);
        }
    }
    updateSafeModeInfo(type, updatedData) {
        try {
            fs_1.default.writeFileSync(path_1.default.join(__dirname, `../config/modeSetting/${type}.json`), JSON.stringify(updatedData), {
                encoding: 'utf-8',
            });
            return updatedData;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = SafeModeRepository.getSafeModeRepository();
