"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const mqtt_1 = require("../utils/mqtt");
const readFileJson_1 = require("../utils/readFileJson");
const path_1 = __importDefault(require("path"));
const Fertilizer_1 = __importDefault(require("../repositories/Fertilizer"));
const sensorKeys_1 = require("../config/sensorKeys");
class Socket {
    constructor() {
        this.io = null;
    }
    static getConditionRepository() {
        if (!Socket.instance) {
            return new Socket();
        }
        return Socket.instance;
    }
    init(server) {
        console.log('Init Socket with Express server');
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: 'http://localhost:3001',
                methods: ['GET', 'POST', 'PATCH', 'DELETE'],
            },
        });
        this.io.on('connection', (socket) => {
            console.log('Socket catch new connection');
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
            // socket.on('update_one_device_state', (data: String[]) => {
            //   console.log('Update device state: ', data);
            //   publishData(`heriota/feeds/${data[0]}`, Number(data[1]));
            // });
            socket.on('update_device', (data) => {
                console.log('Update device: ', data);
                (0, mqtt_1.publishData)(data[0], Number(data[1]));
            });
            // console.log('Test publish data pumpin');
            // publishData(pumpKey[0], 1);
        });
    }
    update_one_device_state(value) {
        console.log('Calling to socket');
        const notification = {
            title: 'UPDATE one device state',
            message: 'Updating one device state!',
        };
        if (this.io) {
            this.io.emit('update_one_device_state', value);
            this.io.emit('notification', notification);
        }
        else {
            console.log('No socket create!!');
        }
    }
    update_device_state(device_key, value) {
        const notification = {
            title: 'UPDATE device state',
            message: `Change state of device ${device_key} to ${value} `,
        };
        if (this.io) {
            this.io.emit(`update_device_${device_key}`, value);
            this.io.emit('notification', notification);
        }
        else {
            console.log('No socket create!!');
        }
    }
    create_device(device_typ, device_des) {
        const notification = {
            title: 'ADD new device',
            message: `Add new ${device_typ} device : ${device_des} successfully !`,
        };
        if (this.io) {
            // this.io.emit(`update_device_${device_key}`, value);
            this.io.emit('notification', notification);
        }
        else {
            console.log('No socket create!!');
        }
    }
    update_condition(value) {
        const notification = {
            title: 'UPDATE condition',
            message: `Update latest condition at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })} `,
        };
        if (this.io) {
            this.io.emit('update_condition', value);
            this.io.emit('notification', notification);
        }
        else {
            console.log('No socket create!!');
        }
    }
    update_one_condition(value) {
        // Handle temperature automatically
        const temperatureSettingsData = (0, readFileJson_1.readFileModeSetting)(path_1.default.join(__dirname, '../../src/config/modeSetting/temperature.json'));
        console.log('Temperature setting data: ');
        console.log(temperatureSettingsData);
        // if temperature < autoMin => turn on light, turn off fan
        if (Number(value[0]) < Number(temperatureSettingsData.autoMin)) {
            console.log('Below safe temperature, turn on light system automatically, turn off fan');
            (0, mqtt_1.publishData)('heriota/feeds/cs-ce-dadn.light-button', 1);
            (0, mqtt_1.publishData)('heriota/feeds/cs-ce-dadn.coolingmotor', 0);
        }
        // if temperature > autoMax => turn on fan, turn off light
        if (Number(value[0]) > Number(temperatureSettingsData.autoMax)) {
            console.log('Exceed safe temperature, turn off light system automatically, turn on fan');
            (0, mqtt_1.publishData)('heriota/feeds/cs-ce-dadn.light-button', 0);
            (0, mqtt_1.publishData)('heriota/feeds/cs-ce-dadn.coolingmotor', 1);
        }
        // [value, position]
        const notification = {
            title: 'UPDATE one condition',
            message: `Update one condition at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })} `,
        };
        if (this.io) {
            this.io.emit('update_one_condition', value);
            this.io.emit('notification', notification);
        }
        else {
            console.log('No socket create!!');
        }
    }
    update_all_device_state() {
        const notification = {
            title: 'UPDATE all device state',
            message: 'Automatically updating device state!',
        };
        if (this.io) {
            this.io.emit('notification', notification);
        }
        else {
            console.log('No socket create!!');
        }
    }
    update_settings(type) {
        const notification = {
            title: 'UPDATE settings',
            message: `${type === 'soilMoisture' ? 'SOIL MOISTURE' : type.toUpperCase()} settings updated successfully!`,
        };
        if (this.io) {
            this.io.emit('notification', notification);
        }
        else {
            console.log('No socket create!!');
        }
    }
    update_all_settings(data) {
        const notification = {
            title: 'UPDATE settings',
            message: 'Update all settings from android application',
        };
        if (this.io) {
            this.io.emit('notification', notification);
            this.io.emit('update_all_settings', data);
        }
        else {
            console.log('No socket create!!');
        }
    }
    update_fertilizer_mixer(value, id, startAt) {
        if (this.io) {
            this.io.emit('update_fertilizer_mixer', [value, id, startAt]);
        }
        else {
            console.log('No socket create!!');
        }
        // update database
        Fertilizer_1.default.updateActiveFertilizer({
            mixerId: id,
            ...(value === 1 ? { startedAt: startAt } : { endedAt: startAt }),
            pumpIn: false,
            pumpOut: false,
            areaId: 0,
        });
    }
    update_pump(value, isPumpIn) {
        // if (value === 0) {
        //   return;
        // }
        console.log('Update pump: ', value, isPumpIn);
        // if (isPumpIn) {
        //   publishData(pumpKey[1], 0);
        // } else {
        //   publishData(pumpKey[0], 0);
        // }
        if (this.io) {
            this.io.emit('update_pump', [value, isPumpIn]);
            // update database
            if (value === 1) {
                Fertilizer_1.default.updateActiveFertilizer({
                    ...(isPumpIn ? { pumpIn: true, startedAt: new Date() } : { pumpOut: true, startedAt: new Date() }),
                });
            }
            else {
                Fertilizer_1.default.updateActiveFertilizer({
                    ...(isPumpIn ? { pumpIn: false, endedAt: new Date() } : { pumpOut: false, endedAt: new Date() }),
                });
            }
            // Fertilizer.updateActiveFertilizer({
            //   ...(isPumpIn
            //     ? {pumpIn: true, pumpOut: false, startedAt: new Date()}
            //     : {pumpOut: true, pumpIn: false, startedAt: new Date()}),
            // });
        }
        else {
            console.log('No socket create!!');
        }
    }
    update_area(value, id) {
        if (value === 0) {
            return;
        }
        console.log('Update area: ', value, id);
        sensorKeys_1.areaKey.forEach((key, keyId) => {
            if (keyId !== id) {
                (0, mqtt_1.publishData)(key, 0);
            }
        });
        if (this.io) {
            this.io.emit('update_area', [value, id]);
            // update database
            Fertilizer_1.default.updateActiveFertilizer({
                areaId: id,
            });
        }
        else {
            console.log('No socket create!!');
        }
    }
}
exports.default = Socket.getConditionRepository();
