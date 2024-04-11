import mongoose from 'mongoose';

const connectDB = (url: string | undefined) => {
  if (url === undefined) {
    console.log('No database URI');
    return;
  }
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

export default connectDB;
