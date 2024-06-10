import mongoose from 'mongoose';

const fertilizerScheduleSchema = new mongoose.Schema({
  key: {
    type: Number,
    required: [true, "FertilizerSchedule: FertilizerSchedule's ID required!"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "FizerSchedule: FizerSchedule's name required!"],
  },
  type: {
    type: String,
    required: [true, "FertilizerSchedule: FertilizerSchedule's type required!"],
  },
  mixVolume: {
    type: Number,
    required: [true, "FertilizerSchedule: FertilizerSchedule's mixVolume required!"],
  },
  waterVolume: {
    type: Number,
    required: [true, "FertilizerSchedule: FertilizerSchedule's waterVolume required!"],
  },
  duration: {
    type: Number,
    required: [true, "FertilizerSchedule: FertilizerSchedule's duration required!"],
  },
});

export default mongoose.model('FertilizerSchedule', fertilizerScheduleSchema);
