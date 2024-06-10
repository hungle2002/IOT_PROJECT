"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const SafeModeRepository_1 = __importDefault(require("../repositories/SafeModeRepository"));
// this file should be deleted
class SafeModeController {
    static async getSafeModeInfo(req, res) {
        const { type } = req.params;
        const safeModeInfo = SafeModeRepository_1.default.getSafeModeInfo(type);
        res
            .status(http_status_1.default.OK)
            .json({ safeAction: safeModeInfo === null || safeModeInfo === void 0 ? void 0 : safeModeInfo.safeAction, safeMin: safeModeInfo === null || safeModeInfo === void 0 ? void 0 : safeModeInfo.safeMin, safeMax: safeModeInfo === null || safeModeInfo === void 0 ? void 0 : safeModeInfo.safeMax });
    }
    static async updateSafeModeInfo(req, res) {
        const { type } = req.params;
        const newSafeModeInfo = req.body;
        const safeModeInfo = SafeModeRepository_1.default.getSafeModeInfo(type);
        const updatedSafeModeInfo = {
            ...safeModeInfo,
            safeAction: newSafeModeInfo.safeAction,
            safeMin: newSafeModeInfo.safeMin,
            safeMax: newSafeModeInfo.safeMax,
        };
        SafeModeRepository_1.default.updateSafeModeInfo(type, updatedSafeModeInfo);
        res.status(http_status_1.default.OK).json(updatedSafeModeInfo);
    }
}
exports.default = SafeModeController;
