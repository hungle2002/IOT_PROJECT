"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class ActivityLogRepository {
    constructor() { }
    static getActivityLogRepository() {
        if (!ActivityLogRepository.instance) {
            return new ActivityLogRepository();
        }
        return ActivityLogRepository.instance;
    }
    async createActivityLog(activityLog) {
        try {
            await models_1.default.activityLog.create(activityLog);
            return activityLog;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ActivityLogRepository.getActivityLogRepository();
