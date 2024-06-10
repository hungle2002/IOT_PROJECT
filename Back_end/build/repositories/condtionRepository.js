"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class ConditionRepository {
    constructor() { }
    static getConditionRepository() {
        if (!ConditionRepository.instance) {
            return new ConditionRepository();
        }
        return ConditionRepository.instance;
    }
    async getAllConditionValue() {
        return await models_1.default.serverRecord.find({});
    }
}
exports.default = ConditionRepository.getConditionRepository();
