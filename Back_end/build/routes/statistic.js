"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StatisticController_1 = __importDefault(require("../controllers/StatisticController"));
const router = express_1.default.Router();
router.route('/').get(StatisticController_1.default.getStatisticConditionValue);
exports.default = router;
