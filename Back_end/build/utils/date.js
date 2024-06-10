"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateOfDate = exports.getCurrentDate = exports.getTimeOfDate = exports.getCurrentTime = void 0;
const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
};
exports.getCurrentTime = getCurrentTime;
const getTimeOfDate = (date) => {
    const currentTime = date;
    return currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
};
exports.getTimeOfDate = getTimeOfDate;
const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' });
};
exports.getCurrentDate = getCurrentDate;
const getDateOfDate = (date) => {
    return date.toLocaleDateString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' });
};
exports.getDateOfDate = getDateOfDate;
