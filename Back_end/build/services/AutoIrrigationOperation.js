"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoIrrigationStart = void 0;
/* eslint-disable prettier/prettier */
const AdaAPI_1 = __importDefault(require("../AdaAPI"));
const SettingsRepository_1 = __importDefault(require("../repositories/SettingsRepository"));
const deviceKeys_1 = __importDefault(require("../config/deviceKeys"));
const timeSetting_1 = require("../config/timeSetting");
const ActivityLoggingService_1 = require("./ActivityLoggingService");
const processManualMode = async (inputKey, outputKey, topLim, botLim, outputFlag) => { };
const processScheduledMode = async (inputKey, activityName, outputKey, topLim, botLim, outputFlag) => {
    const [startHour, startMinute] = botLim.split(':');
    const [endHour, endMinute] = topLim.split(':');
    const now = new Date();
    const scheduledStartTime = new Date();
    const scheduledEndTime = new Date();
    scheduledStartTime.setHours(parseInt(startHour), parseInt(startMinute));
    scheduledEndTime.setHours(parseInt(endHour), parseInt(endMinute));
    const diffStart = (scheduledStartTime.getTime() - now.getTime()) / 1000;
    const diffEnd = (scheduledEndTime.getTime() - now.getTime()) / 1000;
    if (diffStart <= 1 && diffEnd > 0) {
        if (!outputFlag) {
            (0, ActivityLoggingService_1.addNewActivityLog)('systemInfo', 'Begin ' + activityName + 'operation');
            console.log('====================Start Schedule Irrigating====================');
            const result = await AdaAPI_1.default.createFeedValue(outputKey, { value: '1' });
            outputFlag = true;
        }
        //#########simulate increasing value
        else {
            const value = parseInt(await AdaAPI_1.default.getLastFeedValue(inputKey));
            AdaAPI_1.default.createFeedValue(inputKey, { value: (value + 1).toString() });
        }
        //#########
    }
    else if (outputFlag) {
        (0, ActivityLoggingService_1.addNewActivityLog)('systemInfo', 'End ' + activityName + 'operation');
        console.log('====================End Schedule Irrigating====================');
        AdaAPI_1.default.createFeedValue(outputKey, { value: '0' });
        outputFlag = false;
    }
    return outputFlag;
};
const processAutoMode = async (inputKey, activityName, outputKey, topLim, botLim, outputFlag) => {
    const value = parseInt(await AdaAPI_1.default.getLastFeedValue(inputKey));
    if (value < botLim && !outputFlag) {
        (0, ActivityLoggingService_1.addNewActivityLog)('systemInfo', 'Begin ' + activityName + 'operation');
        console.log('====================Start Auto Irrigating====================');
        const result = await AdaAPI_1.default.createFeedValue(outputKey, { value: '1' });
        outputFlag = true;
    }
    /////////////////////////////////////////<- output turn on simulate - increase feed value
    if (value < topLim && outputFlag) {
        AdaAPI_1.default.createFeedValue(inputKey, { value: (value + 1).toString() });
    }
    ///////////////////////////////////////////->
    if (value >= topLim && outputFlag) {
        (0, ActivityLoggingService_1.addNewActivityLog)('systemInfo', 'End ' + activityName + 'operation');
        console.log('====================End Auto Irrigating====================');
        AdaAPI_1.default.createFeedValue(outputKey, { value: '0' });
        outputFlag = false;
    }
    return outputFlag;
};
const autoIrrigationStart = () => {
    console.log('autoIrrrigation Start');
    const soilSensorKey = deviceKeys_1.default.soilSensor;
    const lightSensorKey = deviceKeys_1.default.lightSensor;
    const tempSensorKey = deviceKeys_1.default.tempSensor;
    const coolingMotorKey = deviceKeys_1.default.coolingMotor;
    let tempOutputStart = false;
    let soilOutputStart = false;
    let lightOutputStart = false;
    setInterval(async () => {
        const temperatureInfo = SettingsRepository_1.default.getSettingsInfo('temperature');
        const soilInfo = SettingsRepository_1.default.getSettingsInfo('soilMoisture');
        const lightInfo = SettingsRepository_1.default.getSettingsInfo('lighting');
        if ((temperatureInfo === null || temperatureInfo === void 0 ? void 0 : temperatureInfo.mode) === 0)
            tempOutputStart = await processAutoMode(tempSensorKey, 'Temperature', coolingMotorKey, temperatureInfo.autoMax, temperatureInfo.autoMin, tempOutputStart);
        if ((soilInfo === null || soilInfo === void 0 ? void 0 : soilInfo.mode) === 0)
            soilOutputStart = await processAutoMode(soilSensorKey, 'Soil Humidity', coolingMotorKey, soilInfo.autoMax, soilInfo.autoMin, soilOutputStart);
        if ((lightInfo === null || lightInfo === void 0 ? void 0 : lightInfo.mode) === 0)
            lightOutputStart = await processAutoMode(lightSensorKey, 'Light Intensity', coolingMotorKey, lightInfo.autoMax, lightInfo.autoMin, lightOutputStart);
        if ((temperatureInfo === null || temperatureInfo === void 0 ? void 0 : temperatureInfo.mode) === 1)
            tempOutputStart = await processScheduledMode(tempSensorKey, 'Temperature', coolingMotorKey, temperatureInfo.schedEnd, temperatureInfo.schedStart, tempOutputStart);
        if ((soilInfo === null || soilInfo === void 0 ? void 0 : soilInfo.mode) === 1)
            tempOutputStart = await processScheduledMode(soilSensorKey, 'Soil Humidity', coolingMotorKey, soilInfo.schedEnd, soilInfo.schedStart, soilOutputStart);
        if ((lightInfo === null || lightInfo === void 0 ? void 0 : lightInfo.mode) === 1)
            lightOutputStart = await processScheduledMode(lightSensorKey, 'Light Intensity', coolingMotorKey, lightInfo.schedEnd, lightInfo.schedStart, lightOutputStart);
    }, timeSetting_1.autoIrCircle);
};
exports.autoIrrigationStart = autoIrrigationStart;
