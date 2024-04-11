import mongoose from 'mongoose';

const serverRecordSchema = new mongoose.Schema({
  SRID: {
    type: String,
    required: [true, "DeviceRecordSchema: Server record's ID required!"],
  },

  tempValue: {
    type: Number,
    required: [true, 'DeviceRecordSchema: The value of temperature required!'],
  },

  lightValue: {
    type: Number,
    required: [true, 'DeviceRecordSchema: The value of light required!'],
  },

  soilValue: {
    type: Number,
    required: [true, 'DeviceRecordSchema: The value of soil moisture required!'],
  },

  time: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('ServerRecord', serverRecordSchema);
