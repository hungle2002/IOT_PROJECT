"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const Fertilizer_1 = __importDefault(require("../repositories/Fertilizer"));
class FertilizerController {
    // get all information about one device include state and other information
    static async createFertilizerSchedule(req, res) {
        try {
            // const { data }: {data: IFertilizerSchedule} = req.body
            const fertilizerSchedule = await Fertilizer_1.default.createFertilizerSchedule(req.body);
            res.status(http_status_1.default.OK).json({ fertilizerSchedule });
        }
        catch (error) {
            console.log(error);
        }
    }
    static async getAllFertilizerSchedule(req, res) {
        try {
            const fertilizerSchedule = await Fertilizer_1.default.getAllFertilizerSchedule();
            res.status(http_status_1.default.OK).json({ fertilizerSchedule });
        }
        catch (error) {
            console.log(error);
        }
    }
    static async getActiveFertilizer(req, res) {
        try {
            const activeFertilizer = await Fertilizer_1.default.getActiveFertilizer();
            const createdFertilizerSchedule = await Fertilizer_1.default.getAllFertilizerSchedule();
            res.status(http_status_1.default.OK).json({ activeFertilizer, fertilizerSchedule: createdFertilizerSchedule });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = FertilizerController;
