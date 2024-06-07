import mqtt, {MqttClient} from 'mqtt';
import {deviceKeysArray, conditionKeyArray, motorKeyArray} from '../config/deviceKeys';
import Socket from '../providers/Socket';

const adafruitUsername = 'heriota'; // Replace with your Adafruit username
const adafruitKey = 'aio_UlPx45wbkPcVhSAPXQfeSfTO4aGg'; // Replace with your Adafruit key
const brokerUrl = 'mqtts://io.adafruit.com/api/v2/heriota/'; // Replace with your username

let client: MqttClient;

const mqttOptions = {
  username: adafruitUsername,
  password: adafruitKey,
  reconnectPeriod: 10000, // Optional: Reconnect every 10 seconds in case of disconnection
};

const connectAdafruit = () => {
  client = mqtt.connect(brokerUrl, mqttOptions);

  client.on('connect', () => {
    console.log('Connected to Adafruit IO MQTT Broker');
  });

  client.on('error', (err) => {
    console.error('Connection error:', err);
  });

  const listTopic = deviceKeysArray.map((key) => `heriota/feeds/${key}`);

  listTopic.forEach((key) => {
    client.subscribe(key, (err) => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log('Subscribed to topic:', key);
      }
    });
  });

  client.on('message', (receivedTopic, message) => {
    console.log('Received message on topic:', receivedTopic);
    console.log('Message:', message.toString());

    // Process the message here
    if (conditionKeyArray.includes(receivedTopic)) {
      Socket.update_one_condition([Number(message), conditionKeyArray.indexOf(receivedTopic)]);
    }

    if (motorKeyArray.includes(receivedTopic)) {
      Socket.update_one_device_state([receivedTopic, String(message)]);
    }
  });
};

export const publishData = (topic: string, message: number) => {
  if (!client.connected) {
    console.error('Client not connected, cannot publish!');
    return;
  }

  console.log('Publish data to ', topic, 'with message ', message);

  client.publish(topic, message + '', (err) => {
    if (err) {
      console.error('Publish error:', err);
    } else {
      console.log('Message published:', message);
    }
  });
};

export default connectAdafruit;
