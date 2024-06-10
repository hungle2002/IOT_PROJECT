"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
function errorHandleMiddleware(req, res) {
    const customError = {
        statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
        msg: 'Something went wrong with the server!',
    };
    res.status(customError.statusCode).json({ msg: customError.msg });
}
exports.default = errorHandleMiddleware;
