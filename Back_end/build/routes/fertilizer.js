"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FertilizerController_1 = __importDefault(require("../controllers/FertilizerController"));
const router = express_1.default.Router();
router
    .route('/')
    .get(FertilizerController_1.default.getAllFertilizerSchedule)
    .post(FertilizerController_1.default.createFertilizerSchedule);
router.route('/active').get(FertilizerController_1.default.getActiveFertilizer);
exports.default = router;
