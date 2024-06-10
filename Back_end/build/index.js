"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = __importDefault(require("./middlewares"));
const http_1 = __importDefault(require("http"));
const Socket_1 = __importDefault(require("./providers/Socket"));
const CORS_1 = __importDefault(require("./config/CORS"));
const mqtt_1 = __importDefault(require("./utils/mqtt"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// app mounting
app.use((0, cors_1.default)(CORS_1.default));
app.use(express_1.default.json());
// init socket
Socket_1.default.init(server);
//routing
app.use('/api/v1/condition/', routes_1.default.conditionRoute);
app.use('/api/v1/device/', routes_1.default.deviceRoute);
app.use('/api/v1/settings/', routes_1.default.settingsRoute);
app.use('/api/v1/statistic/', routes_1.default.statisticRoute);
app.use('/api/v1/auth/', routes_1.default.authRoute);
app.use('/api/v1/fertilizer/', routes_1.default.fertilizerRoute);
// using middlewares
app.use(middlewares_1.default.notFoundMiddleware);
app.use(middlewares_1.default.errorHandleMiddleware);
// server
const port = 3000;
const connectDB = async () => {
    try {
        await (0, connect_1.default)(process.env.MONGO_URI);
        server.listen(port, () => {
            console.log('Server listen on port ' + port + '...');
        });
        // set auto update record and device state
        // autoCreateServerRecord();
        // autoUpdateDeviceState();
        // autoIrrigationStart();
        (0, mqtt_1.default)();
        // setTimeout(() => {
        //   publishData('heriota/feeds/cs-ce-dadn.temp-sensor', 123);
        // }, 3000);
    }
    catch (error) {
        console.log(error);
    }
};
connectDB();
