import {Request, Response} from 'express';
import status from 'http-status';
import CondtionRepository from '../repositories/CondtionRepository';
import ConsumptionRepository from '../repositories/ConsumptionRepository';
class StatisticController {
  public static async getStatisticConditionValue(req: Request, res: Response) {
    try {
      const value = await CondtionRepository.getAllConditionValue();
      const result = value.slice(Math.max(value.length - 7, 0));
      const waterConsumption = await ConsumptionRepository.getConsumptionValue('cs-ce-dadn.motor');
      const tempConsumption = await ConsumptionRepository.getConsumptionValue('cs-ce-dadn.coolingmotor');
      const lightConsumption = await ConsumptionRepository.getConsumptionValue('cs-ce-dadn.light-button');
      res
        .status(status.OK)
        .json({soilCons: waterConsumption, tempCons: tempConsumption, lightCons: lightConsumption, value: result});
    } catch (error) {
      console.log(error);
    }
  }
}

export default StatisticController;
