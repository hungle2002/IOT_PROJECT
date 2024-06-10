"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const consumptionSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        default: Date.now, // ??
    },
    amount: {
        type: Number,
        required: [true, 'ConsumptionSchema: Consumption amount required!'],
    },
    deviceKey: {
        // references device's ID
        type: String,
        required: [true, "ConsumptionSchema: Device consumption's ID required!"],
    },
});
exports.default = mongoose_1.default.model('Consumption', consumptionSchema);
