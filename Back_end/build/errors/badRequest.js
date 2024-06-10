"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = __importDefault(require("./customErrors"));
const http_status_1 = __importDefault(require("http-status"));
class BadRequestError extends customErrors_1.default {
    constructor(message) {
        super(message);
        this.statusCode = http_status_1.default.BAD_REQUEST;
    }
}
exports.default = BadRequestError;
