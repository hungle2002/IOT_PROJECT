"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const SettingsRepository_1 = __importDefault(require("../repositories/SettingsRepository"));
const Socket_1 = __importDefault(require("../providers/Socket"));
class SettingsController {
    static async getSettingsInfo(req, res) {
        try {
            const { type } = req.params;
            const settingsInfo = SettingsRepository_1.default.getSettingsInfo(type);
            res.status(http_status_1.default.OK).json(settingsInfo);
        }
        catch (error) {
            console.log(error);
        }
    }
    static async updateSettingsInfo(req, res) {
        try {
            const { type } = req.params;
            const newSettingsInfo = req.body;
            SettingsRepository_1.default.updateSettingsInfo(type, newSettingsInfo);
            Socket_1.default.update_settings(type);
            res.status(http_status_1.default.OK).json(newSettingsInfo);
        }
        catch (error) {
            console.log(error);
        }
    }
    static async updateAllSettingsInfo(req, res) {
        try {
            const newSettingsInfo = req.body;
            SettingsRepository_1.default.updateAllSettingsInfo(newSettingsInfo);
            Socket_1.default.update_all_settings(newSettingsInfo);
            res.status(http_status_1.default.OK).json(newSettingsInfo);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = SettingsController;
