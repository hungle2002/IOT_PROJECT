/* eslint-disable prettier/prettier */
import AdaAPI from '../AdaAPI';
import SettingsRepository from '../repositories/SettingsRepository';
import deviceKeys from '../config/deviceKeys';
import {autoIrCircle} from '../config/timeSetting';
import {addNewActivityLog} from './ActivityLoggingService';

const processManualMode = async (
  inputKey: string,
  outputKey: string,
  topLim: String,
  botLim: String,
  outputFlag: boolean
) => {};

const processScheduledMode = async (
  inputKey: string,
  activityName: string,
  outputKey: string,
  topLim: String,
  botLim: String,
  outputFlag: boolean
) => {
  const [startHour, startMinute] = botLim.split(':');
  const [endHour, endMinute] = topLim.split(':');
  const now = new Date();
  const scheduledStartTime = new Date();
  const scheduledEndTime = new Date();
  scheduledStartTime.setHours(parseInt(startHour), parseInt(startMinute));
  scheduledEndTime.setHours(parseInt(endHour), parseInt(endMinute));
  const diffStart = (scheduledStartTime.getTime() - now.getTime()) / 1000;
  const diffEnd = (scheduledEndTime.getTime() - now.getTime()) / 1000;
  if (diffStart <= 1 && diffEnd > 0) {
    if (!outputFlag) {
      addNewActivityLog('systemInfo', 'Begin ' + activityName + 'operation');
      console.log('====================Start Schedule Irrigating====================');
      const result = await AdaAPI.createFeedValue(outputKey, {value: '1'});
      outputFlag = true;
    }
    //#########simulate increasing value
    else {
      const value = parseInt(await AdaAPI.getLastFeedValue(inputKey));
      AdaAPI.createFeedValue(inputKey, {value: (value + 1).toString()});
    }
    //#########
  } else if (outputFlag) {
    addNewActivityLog('systemInfo', 'End ' + activityName + 'operation');
    console.log('====================End Schedule Irrigating====================');
    AdaAPI.createFeedValue(outputKey, {value: '0'});
    outputFlag = false;
  }
  return outputFlag;
};

const processAutoMode = async (
  inputKey: string,
  activityName: string,
  outputKey: string,
  topLim: number,
  botLim: number,
  outputFlag: boolean
) => {
  const value = parseInt(await AdaAPI.getLastFeedValue(inputKey));

  if (value < botLim && !outputFlag) {
    addNewActivityLog('systemInfo', 'Begin ' + activityName + 'operation');
    console.log('====================Start Auto Irrigating====================');
    const result = await AdaAPI.createFeedValue(outputKey, {value: '1'});
    outputFlag = true;
  }
  /////////////////////////////////////////<- output turn on simulate - increase feed value
  if (value < topLim && outputFlag) {
    AdaAPI.createFeedValue(inputKey, {value: (value + 1).toString()});
  }
  ///////////////////////////////////////////->
  if (value >= topLim && outputFlag) {
    addNewActivityLog('systemInfo', 'End ' + activityName + 'operation');
    console.log('====================End Auto Irrigating====================');
    AdaAPI.createFeedValue(outputKey, {value: '0'});
    outputFlag = false;
  }
  return outputFlag;
};

const autoIrrigationStart = () => {
  console.log('autoIrrrigation Start');
  const soilSensorKey = deviceKeys.soilSensor;
  const lightSensorKey = deviceKeys.lightSensor;
  const tempSensorKey = deviceKeys.tempSensor;
  const coolingMotorKey = deviceKeys.coolingMotor;
  let tempOutputStart = false;
  let soilOutputStart = false;
  let lightOutputStart = false;

  setInterval(async () => {
    const temperatureInfo = SettingsRepository.getSettingsInfo('temperature');
    const soilInfo = SettingsRepository.getSettingsInfo('soilMoisture');
    const lightInfo = SettingsRepository.getSettingsInfo('lighting');
    if (temperatureInfo?.mode === 0)
      tempOutputStart = await processAutoMode(
        tempSensorKey,
        'Temperature',
        coolingMotorKey,
        temperatureInfo.autoMax,
        temperatureInfo.autoMin,
        tempOutputStart
      );
    if (soilInfo?.mode === 0)
      soilOutputStart = await processAutoMode(
        soilSensorKey,
        'Soil Humidity',
        coolingMotorKey,
        soilInfo.autoMax,
        soilInfo.autoMin,
        soilOutputStart
      );
    if (lightInfo?.mode === 0)
      lightOutputStart = await processAutoMode(
        lightSensorKey,
        'Light Intensity',
        coolingMotorKey,
        lightInfo.autoMax,
        lightInfo.autoMin,
        lightOutputStart
      );
    if (temperatureInfo?.mode === 1)
      tempOutputStart = await processScheduledMode(
        tempSensorKey,
        'Temperature',
        coolingMotorKey,
        temperatureInfo.schedEnd,
        temperatureInfo.schedStart,
        tempOutputStart
      );
    if (soilInfo?.mode === 1)
      tempOutputStart = await processScheduledMode(
        soilSensorKey,
        'Soil Humidity',
        coolingMotorKey,
        soilInfo.schedEnd,
        soilInfo.schedStart,
        soilOutputStart
      );
    if (lightInfo?.mode === 1)
      lightOutputStart = await processScheduledMode(
        lightSensorKey,
        'Light Intensity',
        coolingMotorKey,
        lightInfo.schedEnd,
        lightInfo.schedStart,
        lightOutputStart
      );
  }, autoIrCircle);
};

export {autoIrrigationStart};
