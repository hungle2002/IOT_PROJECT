import Model from '../models';
class ConditionRepository {
  // implement singleton pattern
  private static instance: ConditionRepository;

  private constructor() {}
  public static getConditionRepository(): ConditionRepository {
    if (!ConditionRepository.instance) {
      return new ConditionRepository();
    }
    return ConditionRepository.instance;
  }

  public async getAllConditionValue() {
    return await Model.serverRecord.find({});
  }
}

export default ConditionRepository.getConditionRepository();
