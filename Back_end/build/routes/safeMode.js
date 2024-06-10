"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SafeModeController_1 = __importDefault(require("../controllers/SafeModeController"));
const router = express_1.default.Router();
// this file should be deleted
router.route('/:type').get(SafeModeController_1.default.getSafeModeInfo).put(SafeModeController_1.default.updateSafeModeInfo);
exports.default = router;
