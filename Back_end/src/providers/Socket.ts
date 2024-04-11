import {Server} from 'socket.io';
import http from 'http';
import Notification from '../interfaces/notification';
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
    });
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
}
export default Socket.getConditionRepository();
