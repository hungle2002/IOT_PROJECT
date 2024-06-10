"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const serverRecordSchema = new mongoose_1.default.Schema({
    SRID: {
        type: String,
        required: [true, "DeviceRecordSchema: Server record's ID required!"],
    },
    tempValue: {
        type: Number,
        required: [true, 'DeviceRecordSchema: The value of temperature required!'],
    },
    lightValue: {
        type: Number,
        required: [true, 'DeviceRecordSchema: The value of light required!'],
    },
    soilValue: {
        type: Number,
        required: [true, 'DeviceRecordSchema: The value of soil moisture required!'],
    },
    time: {
        type: Date,
        default: new Date(),
    },
});
exports.default = mongoose_1.default.model('ServerRecord', serverRecordSchema);
