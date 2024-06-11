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
    status: {
        type: Number,
        default: 0,
        // 0: not started
        // 1: mixing fertilizer
        // 2: done mixed
        // 3: pumping in
        // 4: done pumping in
        // 5: pumping out
        // 6: done pumping out
    },
});
exports.default = mongoose_1.default.model('FertilizerActive', fertilizerActiveSchema);
