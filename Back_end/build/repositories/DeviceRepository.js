"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class DeviceRepository {
    constructor() { }
    static getDeviceRepository() {
        if (!DeviceRepository.instance) {
            return new DeviceRepository();
        }
        return DeviceRepository.instance;
    }
    async getOneDevice(device_key) {
        try {
            const device = await models_1.default.device.find({ key: device_key });
            return device;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllDevice() {
        try {
            const device = await models_1.default.device.find();
            return device;
        }
        catch (error) {
            console.log(error);
        }
    }
    async createDevice(data) {
        try {
            await models_1.default.device.create(data);
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getOneDeviceState(device_key) {
        try {
            const device = await models_1.default.device.find({ key: device_key });
            return device.state;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateDeviceState(device_key, value) {
        try {
            await models_1.default.device.findOneAndUpdate({ key: device_key }, { $set: { state: value } });
            return 'Success';
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllDeviceState() {
        try {
            const device = await models_1.default.device.find({}, { state: 1, key: 1 });
            return device;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = DeviceRepository.getDeviceRepository();
