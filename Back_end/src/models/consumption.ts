import mongoose from 'mongoose';

const consumptionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now, // ??
  },
  amount: {
    type: Number,
    required: [true, 'ConsumptionSchema: Consumption amount required!'],
  },
  deviceKey: {
    // references device's ID
    type: String,
    required: [true, "ConsumptionSchema: Device consumption's ID required!"],
  },
});

export default mongoose.model('Consumption', consumptionSchema);
