"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.motorKeyArray = exports.conditionKeyArray = exports.deviceKeysArray = void 0;
const deviceKeys = {
    lightSensor: 'cs-ce-dadn.sun-sensor',
    humiSensor: 'cs-ce-dadn.humi-sensor',
    tempSensor: 'cs-ce-dadn.temp-sensor',
    soilSensor: 'cs-ce-dadn.earth-humi-sensor',
    waterMotor: 'cs-ce-dadn.motor',
    lightMotor: 'cs-ce-dadn.light-button',
    smokeSensor: 'cs-ce-dadn.smokesensor',
    lcdMotor: 'cs-ce-dadn.lcdmotor',
    coolingMotor: 'cs-ce-dadn.coolingmotor',
};
exports.deviceKeysArray = [
    'cs-ce-dadn.sun-sensor',
    'cs-ce-dadn.humi-sensor',
    'cs-ce-dadn.temp-sensor',
    'cs-ce-dadn.earth-humi-sensor',
    'cs-ce-dadn.smokesensor',
    'cs-ce-dadn.motor',
    'cs-ce-dadn.light-button',
    'cs-ce-dadn.lcdmotor',
    'cs-ce-dadn.coolingmotor',
];
exports.conditionKeyArray = [
    'heriota/feeds/cs-ce-dadn.temp-sensor',
    'heriota/feeds/cs-ce-dadn.sun-sensor',
    'heriota/feeds/cs-ce-dadn.earth-humi-sensor',
];
exports.motorKeyArray = [
    'heriota/feeds/cs-ce-dadn.motor',
    'heriota/feeds/cs-ce-dadn.light-button',
    'heriota/feeds/cs-ce-dadn.lcdmotor',
    'heriota/feeds/cs-ce-dadn.coolingmotor',
];
exports.default = deviceKeys;
