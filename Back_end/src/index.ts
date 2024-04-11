import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './db/connect';
import route from './routes';
import middlewares from './middlewares';
import http from 'http';
import Socket from './providers/Socket';
import corConfig from './config/CORS';
import {autoCreateServerRecord} from './services/ServerRecordService';
import {autoUpdateDeviceState} from './services/DevicesService';

import {autoIrrigationStart} from './services/AutoIrrigationOperation';
dotenv.config();
const app = express();
const server = http.createServer(app);

// app mounting
app.use(cors(corConfig));
app.use(express.json());

// init socket
Socket.init(server);

//routing
app.use('/api/v1/condition/', route.conditionRoute);
app.use('/api/v1/device/', route.deviceRoute);
app.use('/api/v1/settings/', route.settingsRoute);
app.use('/api/v1/statistic/', route.statisticRoute);
app.use('/api/v1/auth/', route.authRoute);

// using middlewares
app.use(middlewares.notFoundMiddleware);
app.use(middlewares.errorHandleMiddleware);

// server
const port = 3000;

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log('Server listen on port ' + port + '...');
    });
    // set auto update record and device state
    autoCreateServerRecord();
    autoUpdateDeviceState();
    autoIrrigationStart();
  } catch (error) {
    console.log(error);
  }
};
connectDB();
