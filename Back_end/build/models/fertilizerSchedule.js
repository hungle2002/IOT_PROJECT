"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fertilizerScheduleSchema = new mongoose_1.default.Schema({
    key: {
        type: Number,
        required: [true, "FertilizerSchedule: FertilizerSchedule's ID required!"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "FizerSchedule: FizerSchedule's name required!"],
    },
    type: {
        type: String,
        required: [true, "FertilizerSchedule: FertilizerSchedule's type required!"],
    },
    mixVolume: {
        type: Number,
        required: [true, "FertilizerSchedule: FertilizerSchedule's mixVolume required!"],
    },
    waterVolume: {
        type: Number,
        required: [true, "FertilizerSchedule: FertilizerSchedule's waterVolume required!"],
    },
    duration: {
        type: Number,
        required: [true, "FertilizerSchedule: FertilizerSchedule's duration required!"],
    },
});
exports.default = mongoose_1.default.model('FertilizerSchedule', fertilizerScheduleSchema);
