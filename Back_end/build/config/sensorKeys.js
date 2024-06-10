"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sensorKey = exports.pumpKey = exports.fertilizerKey = exports.areaKey = void 0;
exports.areaKey = ['iot-btl.area1', 'iot-btl.area2', 'iot-btl.area3'];
exports.fertilizerKey = ['iot-btl.mixer1', 'iot-btl.mixer2', 'iot-btl.mixer3'];
exports.pumpKey = ['iot-btl.pumpin', 'iot-btl.pumpout'];
exports.sensorKey = [...exports.areaKey, ...exports.fertilizerKey, ...exports.pumpKey];
