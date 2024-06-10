"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.post = exports.getAllFeed = exports.getFeed = void 0;
// axios using
const axios_1 = __importDefault(require("axios"));
const request = axios_1.default.create({
    baseURL: 'https://io.adafruit.com/api/v2/heriota/',
    headers: {
        'X-AIO-KEY': 'aio_PeJv96mtrfpDsKNLFfcmbP4KMiFk',
    },
});
async function getFeed(path, options = undefined) {
    const response = await request.get(path, options);
    return response.data;
}
exports.getFeed = getFeed;
async function getAllFeed(path, options = undefined) {
    const response = await request.get(path, options);
    return response.data;
}
exports.getAllFeed = getAllFeed;
async function post(path, data, options = undefined) {
    const response = await request.post(path, data, options);
    return response.data;
}
exports.post = post;
async function patch(path, data, options = undefined) {
    const response = await request.patch(path, data, options);
    return response.data;
}
exports.patch = patch;
