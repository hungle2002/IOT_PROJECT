"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AuthRepository_1 = __importDefault(require("../repositories/AuthRepository"));
class AuthController {
    static async handleLogin(req, res) {
        try {
            const { username, password } = req.body;
            const foundUsers = await AuthRepository_1.default.findUser(username);
            if (!foundUsers.length) {
                return res.json({ code: 404, msg: 'Wrong username or password!' });
            }
            const isValidPassword = await bcryptjs_1.default.compare(password, foundUsers[0].password.trim());
            if (!isValidPassword)
                return res.json({ code: 403, msg: 'Wrong username or password!' });
            return res.json({ code: 200, username: username });
        }
        catch (error) {
            console.log(error);
        }
    }
    static async handleRegister(req, res) {
        // only used to create new accounts
        try {
            const { username, password } = req.body;
            const foundUsers = await AuthRepository_1.default.findUser(username);
            if (foundUsers.length)
                return res.json({ code: 403, msg: 'Wrong username or password!' });
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const newUser = await AuthRepository_1.default.handleRegister({
                username: username,
                password: hashedPassword,
            });
            res.json({ code: 200, newUser: newUser === null || newUser === void 0 ? void 0 : newUser.username });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = AuthController;
