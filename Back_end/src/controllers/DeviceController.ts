/* eslint-disable prettier/prettier */
import {Request, Response} from 'express';
import status from 'http-status';
import deviceRepository from '../repositories/DeviceRepository';
import AdaAPI from '../AdaAPI';
import DeviceRepository from '../repositories/DeviceRepository';
import Socket from '../providers/Socket';
import {DeviceInfo} from '../interfaces';
import {getNewDeviceState} from '../services/DevicesService';

class DeviceController {
  // get all information about one device include state and other information
  public static async getOneDeviceInfo(req: Request, res: Response) {
    try {
      const {key} = req.params;
      const device = await deviceRepository.getOneDevice(key);
      res.status(status.OK).json({device: device});
    } catch (error) {
      console.log(error)
    }
  }

  // get all device information
  public static async getAllDeviceInfo(req: Request, res: Response) {
    try {
      const device = await deviceRepository.getAllDevice();
      res.status(status.OK).json({devices: device});
    } catch (error) {
      console.log(error)
    }
  }

  // get one device state
  public static async getOneDeviceState(req: Request, res: Response) {
    try {
      const {key} = req.params;
      const device = deviceRepository.getOneDeviceState(key);
      res.status(status.OK).json({device: device});
    } catch (error) {
      console.log(error)
    }
  }

  // get all device state
  public static async getAllDeviceState(req: Request, res: Response) {
    // get current device state from repo
    try {
      const devices = await getNewDeviceState();
      res.status(status.OK).json({devices: devices});
    } catch (error) {
      console.log(error)
    }
  }

  // create new state for device
  public static async createDeviceState(req: Request, res: Response) {
    try {
      const {key} = req.params;
      const data = req.body;
      const newDeviceState = await AdaAPI.createFeedValue(key, data);
      Socket.update_device_state(key, Number(newDeviceState.value));
      DeviceRepository.updateDeviceState(key, Number(newDeviceState.value));
      res.status(status.OK).json({device: newDeviceState});
    } catch (error) {
      console.log(error)
    }
  }

  // create new device
  public static async createDevice(req: Request, res: Response) {
    try {
      const {data} = req.body;
      const newDevice: DeviceInfo | undefined = await DeviceRepository.createDevice(data);
      if (newDevice) {
        Socket.create_device(newDevice.typ, newDevice.des);
      }
      res.status(status.OK).json({device: newDevice});
    } catch (error) {
      console.log(error)
    }
  }
}

export default DeviceController;
