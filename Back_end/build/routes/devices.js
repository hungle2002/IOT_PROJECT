"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DeviceController_1 = __importDefault(require("../controllers/DeviceController"));
const router = express_1.default.Router();
router.route('/').get(DeviceController_1.default.getAllDeviceInfo).post(DeviceController_1.default.createDevice);
router.route('/:key/state').get(DeviceController_1.default.getOneDeviceState).post(DeviceController_1.default.createDeviceState);
router.route('/state').get(DeviceController_1.default.getAllDeviceState);
exports.default = router;
