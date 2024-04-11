import {Request, Response} from 'express';
import status from 'http-status';
import CondtionRepository from '../repositories/CondtionRepository';
import {getAllSetting} from '../services/ConditionService';

class ConditionController {
  public static async getAllConditionInfo(req: Request, res: Response) {
    try {
      const condition = getAllSetting();
      const value = await CondtionRepository.getAllConditionValue();
      res.status(status.OK).json({condition: condition, value: value[value.length - 1]});
    } catch (error) {
      console.log(error);
    }
  }

  public static async getOneConditionValue(req: Request, res: Response) {
    try {
      const condition = await CondtionRepository.getAllConditionValue();
      res.status(status.OK).json({condition: condition});
    } catch (error) {
      console.log(error);
    }
  }
}

export default ConditionController;
