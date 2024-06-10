"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SettingsController_1 = __importDefault(require("../controllers/SettingsController"));
const router = express_1.default.Router();
router.route('/:type').get(SettingsController_1.default.getSettingsInfo).put(SettingsController_1.default.updateSettingsInfo);
router.route('/').put(SettingsController_1.default.updateAllSettingsInfo);
exports.default = router;
