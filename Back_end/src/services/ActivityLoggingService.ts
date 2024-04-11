/* eslint-disable prettier/prettier */
import ActivityLogRepository from '../repositories/ActivityLogRepository';
import ActivityLog from '../interfaces/activitylog';
import {readFileID, writeFileID} from '../utils/readFileJson';
import path from 'path';

const addNewActivityLog = async (typ: String, description: String) => {
  const id: Number = readFileID(path.join(__dirname, '../..', 'src/record/activity.json'));
  writeFileID(path.join(__dirname, '../..', 'src/record/activity.json'), Number(id.valueOf() + 1));

  const dataActivityLog: ActivityLog = {
    LID: readFileID(path.join(__dirname, '../..', 'src/record/activity.json')),
    typ: typ,
    time: new Date(),
    description: description,
  };
  await ActivityLogRepository.createActivityLog(dataActivityLog);
};

export {addNewActivityLog};
