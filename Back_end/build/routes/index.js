"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conditions_1 = __importDefault(require("./conditions"));
const devices_1 = __importDefault(require("./devices"));
const settings_1 = __importDefault(require("./settings"));
const auth_1 = __importDefault(require("./auth"));
const statistic_1 = __importDefault(require("./statistic"));
const fertilizer_1 = __importDefault(require("./fertilizer"));
const route = {
    conditionRoute: conditions_1.default,
    deviceRoute: devices_1.default,
    settingsRoute: settings_1.default,
    authRoute: auth_1.default,
    statisticRoute: statistic_1.default,
    fertilizerRoute: fertilizer_1.default,
};
exports.default = route;
