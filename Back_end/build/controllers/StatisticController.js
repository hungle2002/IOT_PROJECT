"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const CondtionRepository_1 = __importDefault(require("../repositories/CondtionRepository"));
const ConsumptionRepository_1 = __importDefault(require("../repositories/ConsumptionRepository"));
class StatisticController {
    static async getStatisticConditionValue(req, res) {
        try {
            const value = await CondtionRepository_1.default.getAllConditionValue();
            const result = value.slice(Math.max(value.length - 7, 0));
            const waterConsumption = await ConsumptionRepository_1.default.getConsumptionValue('cs-ce-dadn.motor');
            const tempConsumption = await ConsumptionRepository_1.default.getConsumptionValue('cs-ce-dadn.coolingmotor');
            const lightConsumption = await ConsumptionRepository_1.default.getConsumptionValue('cs-ce-dadn.light-button');
            res
                .status(http_status_1.default.OK)
                .json({ soilCons: waterConsumption, tempCons: tempConsumption, lightCons: lightConsumption, value: result });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = StatisticController;
