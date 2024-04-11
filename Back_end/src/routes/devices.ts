import express from 'express';
import DeviceController from '../controllers/DeviceController';

const router = express.Router();
router.route('/').get(DeviceController.getAllDeviceInfo).post(DeviceController.createDevice);
router.route('/:key/state').get(DeviceController.getOneDeviceState).post(DeviceController.createDeviceState);
router.route('/state').get(DeviceController.getAllDeviceState);

export default router;
