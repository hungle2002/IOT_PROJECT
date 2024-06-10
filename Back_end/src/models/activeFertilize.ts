import mongoose from 'mongoose';

const fertilizerActiveSchema = new mongoose.Schema({
  mixerId: {
    type: Number,
    required: [true, "FertilizerActive: FertilizerActive's mixerId required!"],
  },
  areaId: {
    type: Number,
    required: [true, "FertilizerActive: FertilizerActive's mixerId required!"],
    default: 1,
  },
  startedAt: {
    type: Date,
    default: new Date(),
  },
  endedAt: {
    type: Date,
  },
  pumpIn: {
    type: Boolean,
    default: false,
  },
  pumpOut: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('FertilizerActive', fertilizerActiveSchema);
