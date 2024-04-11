import {FeedValue, DeviceState} from '../interfaces';
import AdaAPI from '../AdaAPI';
import DeviceRepository from '../repositories/DeviceRepository';
import {deviceKeysArray} from '../config/deviceKeys';
import Socket from '../providers/Socket';
import {NotFoundError} from '../errors';
import {deviceStateReset} from '../config/timeSetting';

export const getNewDeviceState = async () => {
  // get current device state from repo
  const currDevice: DeviceState[] | undefined = await DeviceRepository.getAllDeviceState();
  if (currDevice === undefined) {
    throw new NotFoundError('Device not found!');
  }
  // get newest device state from adafruit
  const newDevice: FeedValue[] = await AdaAPI.getAllLastFeedValue();

  // check for new state
  const n = deviceKeysArray.length;
  for (let i = 0; i < n; i++) {
    let curValue = 0;
    let newValue = 1;
    for (let a = 0; a < n; a++) {
      if (currDevice[a].key === deviceKeysArray[i]) {
        curValue = Number(currDevice[a].state);
      }
    }
    for (let a = 0; a < n; a++) {
      if (newDevice[a + 1].key === deviceKeysArray[i]) {
        newValue = Number(newDevice[a + 1].value);
      }
    }
    if (curValue !== newValue) {
      Socket.update_device_state(deviceKeysArray[i], Number(newValue));
      DeviceRepository.updateDeviceState(deviceKeysArray[i], Number(newValue));
    }
  }
  return newDevice;
};

export const autoUpdateDeviceState = async () => {
  setInterval(async () => {
    await getNewDeviceState();
    Socket.update_all_device_state();
  }, deviceStateReset);
};
