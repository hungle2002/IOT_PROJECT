import Model from '../models';
import Consumption from '../interfaces/consumption';

class ConsumptionRepository {
  // implement singleton pattern
  private static instance: ConsumptionRepository;

  private constructor() {}
  public static getConsumptionRepository(): ConsumptionRepository {
    if (!ConsumptionRepository.instance) {
      return new ConsumptionRepository();
    }
    return ConsumptionRepository.instance;
  }

  public async createValue(data: Consumption): Promise<Consumption | undefined> {
    try {
      await Model.consumption.create(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  public async getConsumptionValue(device_key: string) {
    return await Model.consumption.find({deviceKey: device_key});
  }
}

export default ConsumptionRepository.getConsumptionRepository();
