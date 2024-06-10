"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const deviceRecordSchema = new mongoose_1.default.Schema({
    SRID: {
        // references server record's SRID
        type: String,
        required: [true, "DeviceRecordSchema: Device record's ID required!"],
    },
    typ: {
        type: String,
        required: [true, "Device record's type required!"],
        enum: {
            values: ['temperature', 'lighting', 'soilMoisture'],
            message: 'Type can only be temperature, lighting or soilMoisture!',
        },
    },
    value: {
        type: Number,
        required: [true, 'DeviceRecordSchema: The value of this device record required!'],
    },
});
exports.default = mongoose_1.default.model('DeviceRecord', deviceRecordSchema);
