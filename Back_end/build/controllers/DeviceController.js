"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const DeviceRepository_1 = __importDefault(require("../repositories/DeviceRepository"));
const AdaAPI_1 = __importDefault(require("../AdaAPI"));
const DeviceRepository_2 = __importDefault(require("../repositories/DeviceRepository"));
const Socket_1 = __importDefault(require("../providers/Socket"));
const DevicesService_1 = require("../services/DevicesService");
class DeviceController {
    // get all information about one device include state and other information
    static async getOneDeviceInfo(req, res) {
        try {
            const { key } = req.params;
            const device = await DeviceRepository_1.default.getOneDevice(key);
            res.status(http_status_1.default.OK).json({ device: device });
        }
        catch (error) {
            console.log(error);
        }
    }
    // get all device information
    static async getAllDeviceInfo(req, res) {
        try {
            const device = await DeviceRepository_1.default.getAllDevice();
            res.status(http_status_1.default.OK).json({ devices: device });
        }
        catch (error) {
            console.log(error);
        }
    }
    // get one device state
    static async getOneDeviceState(req, res) {
        try {
            const { key } = req.params;
            const device = DeviceRepository_1.default.getOneDeviceState(key);
            res.status(http_status_1.default.OK).json({ device: device });
        }
        catch (error) {
            console.log(error);
        }
    }
    // get all device state
    static async getAllDeviceState(req, res) {
        // get current device state from repo
        try {
            const devices = await (0, DevicesService_1.getNewDeviceState)();
            res.status(http_status_1.default.OK).json({ devices: devices });
        }
        catch (error) {
            console.log(error);
        }
    }
    // create new state for device
    static async createDeviceState(req, res) {
        try {
            const { key } = req.params;
            const data = req.body;
            const newDeviceState = await AdaAPI_1.default.createFeedValue(key, data);
            Socket_1.default.update_device_state(key, Number(newDeviceState.value));
            DeviceRepository_2.default.updateDeviceState(key, Number(newDeviceState.value));
            res.status(http_status_1.default.OK).json({ device: newDeviceState });
        }
        catch (error) {
            console.log(error);
        }
    }
    // create new device
    static async createDevice(req, res) {
        try {
            const { data } = req.body;
            const newDevice = await DeviceRepository_2.default.createDevice(data);
            if (newDevice) {
                Socket_1.default.create_device(newDevice.typ, newDevice.des);
            }
            res.status(http_status_1.default.OK).json({ device: newDevice });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = DeviceController;
