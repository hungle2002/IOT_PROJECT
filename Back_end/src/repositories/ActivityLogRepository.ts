import Model from '../models';
import ActivityLog from '../interfaces/activitylog';

class ActivityLogRepository {
  // implement singleton pattern
  private static instance: ActivityLogRepository;

  private constructor() {}
  public static getActivityLogRepository(): ActivityLogRepository {
    if (!ActivityLogRepository.instance) {
      return new ActivityLogRepository();
    }
    return ActivityLogRepository.instance;
  }

  public async createActivityLog(activityLog: ActivityLog): Promise<ActivityLog | undefined> {
    try {
      await Model.activityLog.create(activityLog);
      return activityLog;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ActivityLogRepository.getActivityLogRepository();
