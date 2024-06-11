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
  status: {
    type: Number,
    default: 0,
    // 0: not started
    // 1: mixing fertilizer
    // 2: done mixed
    // 3: pumping in
    // 4: done pumping in
    // 5: pumping out
    // 6: done pumping out
  },
});

export default mongoose.model('FertilizerActive', fertilizerActiveSchema);
