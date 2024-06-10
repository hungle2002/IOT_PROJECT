"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class ConsumptionRepository {
    constructor() { }
    static getConsumptionRepository() {
        if (!ConsumptionRepository.instance) {
            return new ConsumptionRepository();
        }
        return ConsumptionRepository.instance;
    }
    async createValue(data) {
        try {
            await models_1.default.consumption.create(data);
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getConsumptionValue(device_key) {
        return await models_1.default.consumption.find({ deviceKey: device_key });
    }
}
exports.default = ConsumptionRepository.getConsumptionRepository();
