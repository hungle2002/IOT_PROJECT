"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishData = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
const Socket_1 = __importDefault(require("../providers/Socket"));
const sensorKeys_1 = require("../config/sensorKeys");
const adafruitUsername = 'hungle2002'; // Replace with your Adafruit username
const adafruitKey = 'aio_WnnJ11VpSDI3VDULQfH2QsnCTAqf'; // Replace with your Adafruit key
const brokerUrl = 'mqtts://io.adafruit.com/api/v2/hungle2002/'; // Replace with your username
let client;
const mqttOptions = {
    username: adafruitUsername,
    password: adafruitKey,
    reconnectPeriod: 10000, // Optional: Reconnect every 10 seconds in case of disconnection
};
const connectAdafruit = () => {
    client = mqtt_1.default.connect(brokerUrl, mqttOptions);
    client.on('connect', () => {
        console.log('Connected to Adafruit IO MQTT Broker');
        console.log('Test publish data pumpin');
        (0, exports.publishData)(sensorKeys_1.pumpKey[0], 1);
    });
    client.on('error', (err) => {
        console.error('Connection error:', err);
    });
    const listTopic = sensorKeys_1.sensorKey.map((key) => `hungle2002/feeds/${key}`);
    // const listTopic = (areaKey + fertilizerKey + pumpKey).map((key) => `hungle2002/feeds/${key}`);
    listTopic.forEach((key) => {
        client.subscribe(key, (err) => {
            if (err) {
                console.error('Subscription error:', err);
            }
            else {
                console.log('Subscribed to topic:', key);
            }
        });
    });
    client.on('message', (rawReceivedTopic, message) => {
        console.log('Received message on topic:', rawReceivedTopic);
        console.log('Message:', message.toString());
        const receivedTopic = rawReceivedTopic.slice(17);
        // Process the message here
        if (sensorKeys_1.fertilizerKey.includes(receivedTopic)) {
            Socket_1.default.update_fertilizer_mixer(Number(message), sensorKeys_1.fertilizerKey.indexOf(receivedTopic), new Date());
        }
        if (sensorKeys_1.pumpKey.includes(receivedTopic)) {
            Socket_1.default.update_pump(Number(message), sensorKeys_1.pumpKey.indexOf(receivedTopic) === 0);
        }
        if (sensorKeys_1.areaKey.includes(receivedTopic)) {
            Socket_1.default.update_area(Number(message), sensorKeys_1.areaKey.indexOf(receivedTopic));
        }
        // if (conditionKeyArray.includes(receivedTopic)) {
        //   Socket.update_one_condition([Number(message), conditionKeyArray.indexOf(receivedTopic)]);
        // }
        // if (motorKeyArray.includes(receivedTopic)) {
        //   Socket.update_one_device_state([receivedTopic, String(message)]);
        // }
    });
};
const publishData = (key, message) => {
    const topic = `hungle2002/feeds/${key}`;
    if (!client.connected) {
        console.error('Client not connected, cannot publish!');
        return;
    }
    console.log('Publish data to ', topic, 'with message ', message);
    client.publish(topic, message + '', (err) => {
        if (err) {
            console.error('Publish error:', err);
        }
        else {
            console.log('Message published:', message);
        }
    });
};
exports.publishData = publishData;
exports.default = connectAdafruit;
