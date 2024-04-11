import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, "DeviceSchema: Device's ID required!"],
    unique: true,
  },
  typ: {
    type: String,
    required: [true, "DeviceSchema: Device's type required!"],
    enum: {
      values: ['Sensor', 'Motor'],
      message:
        'Type can only be lightSensor, humiSensor, tempSensor, soilSensor, waterMotor, lightMotor, smokeSensor, lcdMotor!',
    },
  },
  state: {
    type: Number, // false -> off
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "DeviceSchema: Device's price required!"],
  },
  location: {
    type: String,
    required: [true, "DeviceSchema: Device's location required!"],
    enum: {
      values: ['HCMUT1', 'HCMUT2', 'Zone A', 'Zone B'],
      maessage: 'Location can only be HCMUT1, HCMUT2, Zone A or Zone B!',
    },
  },
  usingTime: {
    type: Number, // in minutes
    default: 0,
  },
  startOn: {
    type: String,
    default: new Date(),
  },
  lastChecked: {
    type: Number,
    default: 0,
  },
  installedDate: {
    type: String,
    default: new Date().toLocaleDateString('en-GB', {timeZone: 'Asia/Ho_Chi_Minh'}),
  },
  des: {
    type: String,
  },
});

export default mongoose.model('Device', deviceSchema);
