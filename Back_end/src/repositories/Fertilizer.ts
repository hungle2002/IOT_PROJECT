import Model from '../models';
import {IFertilizerSchedule, IActiveFertilizer} from '../interfaces/fertilizer';

class FertilizerRepository {
  // implement singleton pattern
  private static instance: FertilizerRepository;

  private constructor() {}
  public static getFertilizerRepository(): FertilizerRepository {
    if (!FertilizerRepository.instance) {
      return new FertilizerRepository();
    }
    return FertilizerRepository.instance;
  }

  // public async getOneDevice(device_key: string) {
  //   try {
  //     const device: DeviceInfo = await Model.device.find({key: device_key});
  //     return device;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public async getAllDevice() {
  //   try {
  //     const device: DeviceInfo = await Model.device.find();
  //     return device;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  public async createFertilizerSchedule(data: IFertilizerSchedule): Promise<IFertilizerSchedule | undefined> {
    // find
    try {
      const schedule = await Model.fertilizerSchedule.findOne({key: data.key});
      if (!schedule) {
        await Model.fertilizerSchedule.create(data);
      } else {
        await Model.fertilizerSchedule.findOneAndUpdate({key: data.key}, {$set: data});
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllFertilizerSchedule(): Promise<IFertilizerSchedule[] | undefined> {
    try {
      const schedule: IFertilizerSchedule[] = await Model.fertilizerSchedule.find();
      return schedule;
    } catch (error) {
      console.log(error);
    }
  }

  public async getActiveFertilizer(): Promise<IActiveFertilizer | undefined> {
    try {
      const activeFertilizer: IActiveFertilizer = await Model.activeFertilize.findOne();
      if (!activeFertilizer) {
        await Model.activeFertilize.create({
          mixerId: 0,
          startedAt: null,
          endedAt: null,
        });
        return await Model.activeFertilize.findOne();
      }
      return activeFertilizer;
    } catch (error) {
      console.log(error);
    }
  }

  public async updateActiveFertilizer(data: IActiveFertilizer): Promise<IActiveFertilizer | undefined> {
    try {
      await Model.activeFertilize.updateMany({}, {$set: data});
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // public async getOneDeviceState(device_key: string) {
  //   try {
  //     const device: DeviceInfo = await Model.device.find({key: device_key});
  //     return device.state;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public async updateDeviceState(device_key: string, value: Number) {
  //   try {
  //     await Model.device.findOneAndUpdate({key: device_key}, {$set: {state: value}});
  //     return 'Success';
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public async getAllDeviceState(): Promise<DeviceState[] | undefined> {
  //   try {
  //     const device: DeviceState[] = await Model.device.find({}, {state: 1, key: 1});
  //     return device;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

export default FertilizerRepository.getFertilizerRepository();
