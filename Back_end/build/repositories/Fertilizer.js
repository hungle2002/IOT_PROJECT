"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class FertilizerRepository {
    constructor() { }
    static getFertilizerRepository() {
        if (!FertilizerRepository.instance) {
            return new FertilizerRepository();
        }
        return FertilizerRepository.instance;
    }
    // public async getOneDevice(device_key: string) {
    //   try {
    //     const device: DeviceInfo = await Model.device.find({key: device_key});
    //     return device;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // public async getAllDevice() {
    //   try {
    //     const device: DeviceInfo = await Model.device.find();
    //     return device;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    async createFertilizerSchedule(data) {
        // find
        try {
            const schedule = await models_1.default.fertilizerSchedule.findOne({ key: data.key });
            if (!schedule) {
                await models_1.default.fertilizerSchedule.create(data);
            }
            else {
                await models_1.default.fertilizerSchedule.findOneAndUpdate({ key: data.key }, { $set: data });
            }
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllFertilizerSchedule() {
        try {
            const schedule = await models_1.default.fertilizerSchedule.find();
            return schedule;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getActiveFertilizer() {
        try {
            const activeFertilizer = await models_1.default.activeFertilize.findOne();
            if (!activeFertilizer) {
                await models_1.default.activeFertilize.create({
                    mixerId: 0,
                    startedAt: null,
                    endedAt: null,
                });
                return await models_1.default.activeFertilize.findOne();
            }
            return activeFertilizer;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateActiveFertilizer(data) {
        try {
            await models_1.default.activeFertilize.updateMany({}, { $set: data });
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = FertilizerRepository.getFertilizerRepository();
