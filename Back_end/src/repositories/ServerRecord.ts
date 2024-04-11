import ServerRecord from '../interfaces/record';
import Model from '../models';

class ServerRecordRepository {
  // implement singleton pattern
  private static instance: ServerRecordRepository;

  private constructor() {}
  public static getServerRecordRepository(): ServerRecordRepository {
    if (!ServerRecordRepository.instance) {
      return new ServerRecordRepository();
    }
    return ServerRecordRepository.instance;
  }
  public getOneServerRecord(SRID: Number) {
    return `One ServerRecord ${SRID}!`;
  }

  public async createServerRecord(record: ServerRecord): Promise<ServerRecord | undefined> {
    try {
      await Model.serverRecord.create(record);
      return record;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ServerRecordRepository.getServerRecordRepository();
