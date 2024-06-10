/* eslint-disable prettier/prettier */
import {Request, Response} from 'express';
import status from 'http-status';
import FertilizerRepository from '../repositories/Fertilizer';
import Socket from '../providers/Socket';
// import {DeviceInfo} from '../interfaces';
import { IFertilizerSchedule } from '../interfaces/fertilizer';

class FertilizerController {
  // get all information about one device include state and other information
  public static async createFertilizerSchedule(req: Request, res: Response) {
    try {
      // const { data }: {data: IFertilizerSchedule} = req.body
      const fertilizerSchedule = await FertilizerRepository.createFertilizerSchedule(req.body);
      res.status(status.OK).json({fertilizerSchedule});
    } catch (error) {
      console.log(error)
    }
  }

  public static async getAllFertilizerSchedule(req: Request, res: Response) {
    try {
      const fertilizerSchedule = await FertilizerRepository.getAllFertilizerSchedule();
      res.status(status.OK).json({fertilizerSchedule});
    } catch (error) {
      console.log(error)
    }
  }

  public static async getActiveFertilizer(req: Request, res: Response) {
    try {
      const activeFertilizer = await FertilizerRepository.getActiveFertilizer();
      const createdFertilizerSchedule = await FertilizerRepository.getAllFertilizerSchedule();
      res.status(status.OK).json({activeFertilizer, fertilizerSchedule: createdFertilizerSchedule});
    } catch (error) {
      console.log(error)
    }
  }

}

export default FertilizerController;
