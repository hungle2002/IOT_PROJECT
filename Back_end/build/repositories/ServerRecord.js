"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class ServerRecordRepository {
    constructor() { }
    static getServerRecordRepository() {
        if (!ServerRecordRepository.instance) {
            return new ServerRecordRepository();
        }
        return ServerRecordRepository.instance;
    }
    getOneServerRecord(SRID) {
        return `One ServerRecord ${SRID}!`;
    }
    async createServerRecord(record) {
        try {
            await models_1.default.serverRecord.create(record);
            return record;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ServerRecordRepository.getServerRecordRepository();
