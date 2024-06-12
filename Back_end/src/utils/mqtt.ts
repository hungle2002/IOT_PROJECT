import mqtt, {MqttClient} from 'mqtt';
import Socket from '../providers/Socket';
import {areaKey, fertilizerKey, pumpKey, sensorKey} from '../config/sensorKeys';

const adafruitUsername = 'hungle2002'; // Replace with your Adafruit username
const adafruitKey = 'aio_WnnJ11VpSDI3VDULQfH2QsnCTAqf'; // Replace with your Adafruit key
const brokerUrl = 'mqtts://io.adafruit.com/api/v2/hungle2002/'; // Replace with your username
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

    console.log('Test publish data pumpin');
    publishData(pumpKey[0], 1);
  });

  client.on('error', (err) => {
    console.error('Connection error:', err);
  });

  const listTopic = sensorKey.map((key) => `hungle2002/feeds/${key}`);
  // const listTopic = (areaKey + fertilizerKey + pumpKey).map((key) => `hungle2002/feeds/${key}`);

  listTopic.forEach((key) => {
    client.subscribe(key, (err) => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log('Subscribed to topic:', key);
      }
    });
  });

  client.on('message', (rawReceivedTopic, message) => {
    console.log('Received message on topic:', rawReceivedTopic);
    console.log('Message:', message.toString());

    const receivedTopic = rawReceivedTopic.slice(17);

    // Process the message here
    if (fertilizerKey.includes(receivedTopic)) {
      Socket.update_fertilizer_mixer(Number(message), fertilizerKey.indexOf(receivedTopic), new Date());
    }

    if (pumpKey.includes(receivedTopic)) {
      Socket.update_pump(Number(message), pumpKey.indexOf(receivedTopic) === 0);
    }

    if (areaKey.includes(receivedTopic)) {
      Socket.update_area(Number(message), areaKey.indexOf(receivedTopic));
    }
    // if (conditionKeyArray.includes(receivedTopic)) {
    //   Socket.update_one_condition([Number(message), conditionKeyArray.indexOf(receivedTopic)]);
    // }

    // if (motorKeyArray.includes(receivedTopic)) {
    //   Socket.update_one_device_state([receivedTopic, String(message)]);
    // }
  });
};

export const publishData = (key: string, message: number) => {
  const topic = `hungle2002/feeds/${key}`;
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
