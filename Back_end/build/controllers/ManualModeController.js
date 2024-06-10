"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ManualModeRepository_1 = __importDefault(require("../repositories/ManualModeRepository"));
// this file should be deleted
class ManualModeController {
    static async getManualModeInfo(req, res) {
        const { type } = req.params;
        const manualModeInfo = ManualModeRepository_1.default.getManualModeInfo(type);
        res.status(http_status_1.default.OK).json({ manualMin: manualModeInfo === null || manualModeInfo === void 0 ? void 0 : manualModeInfo.manualMin, manualMax: manualModeInfo === null || manualModeInfo === void 0 ? void 0 : manualModeInfo.manualMax });
    }
    static async updateManualModeInfo(req, res) {
        const { type } = req.params;
        const newManualModeInfo = req.body;
        const manualModeInfo = ManualModeRepository_1.default.getManualModeInfo(type);
        const updatedManualModeInfo = {
            ...manualModeInfo,
            manualMin: newManualModeInfo.manualMin,
            manualMax: newManualModeInfo.manualMax,
        };
        ManualModeRepository_1.default.updateManualModeInfo(type, updatedManualModeInfo);
        res.status(http_status_1.default.OK).json(updatedManualModeInfo);
    }
}
exports.default = ManualModeController;
