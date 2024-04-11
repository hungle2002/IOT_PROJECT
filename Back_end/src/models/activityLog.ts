import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  LID: {
    type: Number,
    required: [true, "ActivityLogSchema: Activity log's ID required!"],
    unique: [true, "ActivityLogSchema: Activity log's must be unique!"],
  },
  typ: {
    type: String,
    required: [true, "ActivityLogSchema: Activity log's type required!"],
    enum: {
      values: ['warning', 'reminder', 'systemInfo'],
      message: 'Type can only be warning, reminder or systemInfo!',
    },
  },
  time: {
    type: Date,
    default: new Date(),
  },
  description: {
    type: String,
    maxLength: [50, "ActivityLogSchema: Activity log's description too lengthy!"],
  },
});

export default mongoose.model('ActivityLog', activityLogSchema);
