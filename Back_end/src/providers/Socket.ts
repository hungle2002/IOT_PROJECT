import {Server} from 'socket.io';
import http from 'http';
import Notification from '../interfaces/notification';
import {publishData} from '../utils/mqtt';
import {readFileModeSetting} from '../utils/readFileJson';
import path from 'path';
import Fertilizer from '../repositories/Fertilizer';
import {areaKey, fertilizerKey, pumpKey, sensorKey} from '../config/sensorKeys';

class Socket {
  private io: Server | null = null;

  // implement singleton pattern
  private static instance: Socket;

  private constructor() {}
  public static getConditionRepository(): Socket {
    if (!Socket.instance) {
      return new Socket();
    }
    return Socket.instance;
  }

  public init(server: http.Server) {
    console.log('Init Socket with Express server');
    this.io = new Server(server, {
      cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      },
    });
    this.io.on('connection', (socket) => {
      console.log('Socket catch new connection');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });

      // socket.on('update_one_device_state', (data: String[]) => {
      //   console.log('Update device state: ', data);
      //   publishData(`heriota/feeds/${data[0]}`, Number(data[1]));
      // });

      socket.on('update_device', (data: string[]) => {
        console.log('Update device: ', data);
        publishData(data[0], Number(data[1]));
      });

      // console.log('Test publish data pumpin');
      // publishData(pumpKey[0], 1);
    });
  }

  public update_one_device_state(value: String[]) {
    console.log('Calling to socket');

    const notification: Notification = {
      title: 'UPDATE one device state',
      message: 'Updating one device state!',
    };
    if (this.io) {
      this.io.emit('update_one_device_state', value);
      this.io.emit('notification', notification);
    } else {
      console.log('No socket create!!');
    }
  }

  public update_device_state(device_key: String, value: Number) {
    const notification: Notification = {
      title: 'UPDATE device state',
      message: `Change state of device ${device_key} to ${value} `,
    };
    if (this.io) {
      this.io.emit(`update_device_${device_key}`, value);
      this.io.emit('notification', notification);
    } else {
      console.log('No socket create!!');
    }
  }

  public create_device(device_typ: String, device_des: String) {
    const notification: Notification = {
      title: 'ADD new device',
      message: `Add new ${device_typ} device : ${device_des} successfully !`,
    };
    if (this.io) {
      // this.io.emit(`update_device_${device_key}`, value);
      this.io.emit('notification', notification);
    } else {
      console.log('No socket create!!');
    }
  }

  public update_condition(value: Number[]) {
    const notification: Notification = {
      title: 'UPDATE condition',
      message: `Update latest condition at ${new Date().toLocaleString('en-US', {timeZone: 'Asia/Ho_Chi_Minh'})} `,
    };
    if (this.io) {
      this.io.emit('update_condition', value);
      this.io.emit('notification', notification);
    } else {
      console.log('No socket create!!');
    }
  }

  public update_one_condition(value: Number[]) {
    // Handle temperature automatically
    const temperatureSettingsData = readFileModeSetting(
      path.join(__dirname, '../../src/config/modeSetting/temperature.json')
    );

    console.log('Temperature setting data: ');
    console.log(temperatureSettingsData);

    // if temperature < autoMin => turn on light, turn off fan
    if (Number(value[0]) < Number(temperatureSettingsData.autoMin)) {
      console.log('Below safe temperature, turn on light system automatically, turn off fan');
      publishData('heriota/feeds/cs-ce-dadn.light-button', 1);
      publishData('heriota/feeds/cs-ce-dadn.coolingmotor', 0);
    }
    // if temperature > autoMax => turn on fan, turn off light
    if (Number(value[0]) > Number(temperatureSettingsData.autoMax)) {
      console.log('Exceed safe temperature, turn off light system automatically, turn on fan');
      publishData('heriota/feeds/cs-ce-dadn.light-button', 0);
      publishData('heriota/feeds/cs-ce-dadn.coolingmotor', 1);
    }

    // [value, position]
    const notification: Notification = {
      title: 'UPDATE one condition',
      message: `Update one condition at ${new Date().toLocaleString('en-US', {timeZone: 'Asia/Ho_Chi_Minh'})} `,
    };
    if (this.io) {
      this.io.emit('update_one_condition', value);
      this.io.emit('notification', notification);
    } else {
      console.log('No socket create!!');
    }
  }

  public update_all_device_state() {
    const notification: Notification = {
      title: 'UPDATE all device state',
      message: 'Automatically updating device state!',
    };
    if (this.io) {
      this.io.emit('notification', notification);
    } else {
      console.log('No socket create!!');
    }
  }

  public update_settings(type: String) {
    const notification: Notification = {
      title: 'UPDATE settings',
      message: `${type === 'soilMoisture' ? 'SOIL MOISTURE' : type.toUpperCase()} settings updated successfully!`,
    };
    if (this.io) {
      this.io.emit('notification', notification);
    } else {
      console.log('No socket create!!');
    }
  }

  public update_all_settings(data: any) {
    const notification: Notification = {
      title: 'UPDATE settings',
      message: 'Update all settings from android application',
    };
    if (this.io) {
      this.io.emit('notification', notification);
      this.io.emit('update_all_settings', data);
    } else {
      console.log('No socket create!!');
    }
  }

  public update_fertilizer_mixer(value: number, id: number, startAt: Date) {
    if (this.io) {
      this.io.emit('update_fertilizer_mixer', [value, id, startAt]);
    } else {
      console.log('No socket create!!');
    }
    // update database
    Fertilizer.updateActiveFertilizer({
      mixerId: id,
      ...(value === 1 ? {startedAt: startAt} : {endedAt: startAt}),
      pumpIn: false,
      pumpOut: false,
      areaId: 0,
    });
  }

  public update_pump(value: number, isPumpIn: boolean) {
    // if (value === 0) {
    //   return;
    // }
    console.log('Update pump: ', value, isPumpIn);
    // if (isPumpIn) {
    //   publishData(pumpKey[1], 0);
    // } else {
    //   publishData(pumpKey[0], 0);
    // }

    if (this.io) {
      this.io.emit('update_pump', [value, isPumpIn]);
      // update database
      if (value === 1) {
        Fertilizer.updateActiveFertilizer({
          ...(isPumpIn ? {pumpIn: true, startedAt: new Date()} : {pumpOut: true, startedAt: new Date()}),
        });
      } else {
        Fertilizer.updateActiveFertilizer({
          ...(isPumpIn ? {pumpIn: false, endedAt: new Date()} : {pumpOut: false, endedAt: new Date()}),
        });
      }
      // Fertilizer.updateActiveFertilizer({
      //   ...(isPumpIn
      //     ? {pumpIn: true, pumpOut: false, startedAt: new Date()}
      //     : {pumpOut: true, pumpIn: false, startedAt: new Date()}),
      // });
    } else {
      console.log('No socket create!!');
    }
  }

  public update_area(value: number, id: number) {
    if (value === 0) {
      return;
    }
    console.log('Update area: ', value, id);
    areaKey.forEach((key, keyId) => {
      if (keyId !== id) {
        publishData(key, 0);
      }
    });
    if (this.io) {
      this.io.emit('update_area', [value, id]);
      // update database
      Fertilizer.updateActiveFertilizer({
        areaId: id,
      });
    } else {
      console.log('No socket create!!');
    }
  }
}
export default Socket.getConditionRepository();
