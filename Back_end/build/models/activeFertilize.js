"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fertilizerActiveSchema = new mongoose_1.default.Schema({
    mixerId: {
        type: Number,
        required: [true, "FertilizerActive: FertilizerActive's mixerId required!"],
    },
    areaId: {
        type: Number,
        required: [true, "FertilizerActive: FertilizerActive's mixerId required!"],
        default: 1,
    },
    startedAt: {
        type: Date,
        default: new Date(),
    },
    endedAt: {
        type: Date,
    },
    pumpIn: {
        type: Boolean,
        default: false,
    },
    pumpOut: {
        type: Boolean,
        default: false,
    },
});
exports.default = mongoose_1.default.model('FertilizerActive', fertilizerActiveSchema);
