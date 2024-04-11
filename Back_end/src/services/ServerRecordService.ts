import path from 'path';
import {serverRecord, FeedValue} from '../interfaces';
import ServerRecord from '../repositories/ServerRecord';
import AdaAPI from '../AdaAPI';
import deviceKey from '../config/deviceKeys';
import {readFileID, writeFileID} from '../utils/readFileJson';
import {conditionReset} from '../config/timeSetting';
import Socket from '../providers/Socket';

const getConditionValueFromFeed = (records: FeedValue[]): Number[] => {
  const results: Number[] = [0, 0, 0];
  records.forEach((record) => {
    if (record.key === deviceKey.tempSensor) {
      results[0] = Number(record.value);
    } else if (record.key === deviceKey.lightSensor) {
      results[1] = Number(record.value);
    } else if (record.key === deviceKey.soilSensor) {
      results[2] = Number(record.value);
    }
  });
  return results;
};

const autoCreateServerRecord = () => {
  setInterval(async () => {
    const adaRecord: FeedValue[] = await AdaAPI.getAllLastFeedValue();
    const conditionValue: Number[] = getConditionValueFromFeed(adaRecord);
    // read and write id to file
    const id: Number = readFileID(path.join(__dirname, '../..', 'src/record/serverRecord.json'));
    writeFileID(path.join(__dirname, '../..', 'src/record/serverRecord.json'), Number(id.valueOf() + 1));

    const dataServerRecord: serverRecord = {
      SRID: readFileID(path.join(__dirname, '../..', 'src/record/serverRecord.json')),
      tempValue: conditionValue[0],
      lightValue: conditionValue[1],
      soilValue: conditionValue[2],
      time: new Date(),
    };

    await ServerRecord.createServerRecord(dataServerRecord);
    Socket.update_condition(conditionValue);
  }, conditionReset);
};

export {autoCreateServerRecord};
