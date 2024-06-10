"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: [true, 'UserSchema: Username must be unique!'],
        required: [true, 'UserSchema: Username required!'],
    },
    password: {
        type: String,
        required: [true, 'UserSchema: Password required!'],
    },
});
exports.default = mongoose_1.default.model('User', userSchema);
