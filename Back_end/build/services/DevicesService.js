"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoUpdateDeviceState = exports.getNewDeviceState = void 0;
const AdaAPI_1 = __importDefault(require("../AdaAPI"));
const DeviceRepository_1 = __importDefault(require("../repositories/DeviceRepository"));
const deviceKeys_1 = require("../config/deviceKeys");
const Socket_1 = __importDefault(require("../providers/Socket"));
const errors_1 = require("../errors");
const timeSetting_1 = require("../config/timeSetting");
const getNewDeviceState = async () => {
    // get current device state from repo
    const currDevice = await DeviceRepository_1.default.getAllDeviceState();
    if (currDevice === undefined) {
        throw new errors_1.NotFoundError('Device not found!');
    }
    // get newest device state from adafruit
    const newDevice = await AdaAPI_1.default.getAllLastFeedValue();
    // check for new state
    const n = deviceKeys_1.deviceKeysArray.length;
    for (let i = 0; i < n; i++) {
        let curValue = 0;
        let newValue = 1;
        for (let a = 0; a < n; a++) {
            if (currDevice[a].key === deviceKeys_1.deviceKeysArray[i]) {
                curValue = Number(currDevice[a].state);
            }
        }
        for (let a = 0; a < n; a++) {
            if (newDevice[a + 1].key === deviceKeys_1.deviceKeysArray[i]) {
                newValue = Number(newDevice[a + 1].value);
            }
        }
        if (curValue !== newValue) {
            Socket_1.default.update_device_state(deviceKeys_1.deviceKeysArray[i], Number(newValue));
            DeviceRepository_1.default.updateDeviceState(deviceKeys_1.deviceKeysArray[i], Number(newValue));
        }
    }
    return newDevice;
};
exports.getNewDeviceState = getNewDeviceState;
const autoUpdateDeviceState = async () => {
    setInterval(async () => {
        await (0, exports.getNewDeviceState)();
        Socket_1.default.update_all_device_state();
    }, timeSetting_1.deviceStateReset);
};
exports.autoUpdateDeviceState = autoUpdateDeviceState;
