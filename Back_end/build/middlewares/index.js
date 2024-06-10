"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("./errorHandler"));
const notFoundHandler_1 = __importDefault(require("./notFoundHandler"));
const middlewares = {
    errorHandleMiddleware: errorHandler_1.default,
    notFoundMiddleware: notFoundHandler_1.default,
};
exports.default = middlewares;
