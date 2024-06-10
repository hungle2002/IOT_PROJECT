"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class AuthRepository {
    constructor() { }
    static getAuthRepository() {
        if (!AuthRepository.instance) {
            return new AuthRepository();
        }
        return AuthRepository.instance;
    }
    async handleRegister(data) {
        await models_1.default.user.create(data);
        return data;
    }
    async findUser(username) {
        const foundUser = await models_1.default.user.find({ username: username });
        return foundUser;
    }
}
exports.default = AuthRepository.getAuthRepository();
