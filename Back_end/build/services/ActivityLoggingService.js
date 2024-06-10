"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewActivityLog = void 0;
/* eslint-disable prettier/prettier */
const ActivityLogRepository_1 = __importDefault(require("../repositories/ActivityLogRepository"));
const readFileJson_1 = require("../utils/readFileJson");
const path_1 = __importDefault(require("path"));
const addNewActivityLog = async (typ, description) => {
    const id = (0, readFileJson_1.readFileID)(path_1.default.join(__dirname, '../..', 'src/record/activity.json'));
    (0, readFileJson_1.writeFileID)(path_1.default.join(__dirname, '../..', 'src/record/activity.json'), Number(id.valueOf() + 1));
    const dataActivityLog = {
        LID: (0, readFileJson_1.readFileID)(path_1.default.join(__dirname, '../..', 'src/record/activity.json')),
        typ: typ,
        time: new Date(),
        description: description,
    };
    await ActivityLogRepository_1.default.createActivityLog(dataActivityLog);
};
exports.addNewActivityLog = addNewActivityLog;
