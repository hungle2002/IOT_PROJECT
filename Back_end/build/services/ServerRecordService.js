"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoCreateServerRecord = void 0;
const path_1 = __importDefault(require("path"));
const ServerRecord_1 = __importDefault(require("../repositories/ServerRecord"));
const AdaAPI_1 = __importDefault(require("../AdaAPI"));
const deviceKeys_1 = __importDefault(require("../config/deviceKeys"));
const readFileJson_1 = require("../utils/readFileJson");
const timeSetting_1 = require("../config/timeSetting");
const Socket_1 = __importDefault(require("../providers/Socket"));
const getConditionValueFromFeed = (records) => {
    const results = [0, 0, 0];
    records.forEach((record) => {
        if (record.key === deviceKeys_1.default.tempSensor) {
            results[0] = Number(record.value);
        }
        else if (record.key === deviceKeys_1.default.lightSensor) {
            results[1] = Number(record.value);
        }
        else if (record.key === deviceKeys_1.default.soilSensor) {
            results[2] = Number(record.value);
        }
    });
    return results;
};
const autoCreateServerRecord = () => {
    setInterval(async () => {
        const adaRecord = await AdaAPI_1.default.getAllLastFeedValue();
        const conditionValue = getConditionValueFromFeed(adaRecord);
        // read and write id to file
        const id = (0, readFileJson_1.readFileID)(path_1.default.join(__dirname, '../..', 'src/record/serverRecord.json'));
        (0, readFileJson_1.writeFileID)(path_1.default.join(__dirname, '../..', 'src/record/serverRecord.json'), Number(id.valueOf() + 1));
        const dataServerRecord = {
            SRID: (0, readFileJson_1.readFileID)(path_1.default.join(__dirname, '../..', 'src/record/serverRecord.json')),
            tempValue: conditionValue[0],
            lightValue: conditionValue[1],
            soilValue: conditionValue[2],
            time: new Date(),
        };
        await ServerRecord_1.default.createServerRecord(dataServerRecord);
        Socket_1.default.update_condition(conditionValue);
    }, timeSetting_1.conditionReset);
};
exports.autoCreateServerRecord = autoCreateServerRecord;
