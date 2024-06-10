"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
const activityLog_1 = __importDefault(require("./activityLog"));
const consumption_1 = __importDefault(require("./consumption"));
const serverRecord_1 = __importDefault(require("./serverRecord"));
const user_1 = __importDefault(require("./user"));
const fertilizerSchedule_1 = __importDefault(require("./fertilizerSchedule"));
const activeFertilize_1 = __importDefault(require("./activeFertilize"));
const model = {
    device: device_1.default,
    activityLog: activityLog_1.default,
    consumption: consumption_1.default,
    serverRecord: serverRecord_1.default,
    user: user_1.default,
    fertilizerSchedule: fertilizerSchedule_1.default,
    activeFertilize: activeFertilize_1.default,
};
exports.default = model;
