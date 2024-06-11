export interface IFertilizerSchedule {
  key: number;
  name: string;
  type: string;
  mixVolume: number;
  waterVolume: number;
  duration: number;
}

export interface IActiveFertilizer {
  mixerId?: number;
  startedAt?: Date;
  endedAt?: Date;
  pumpIn?: boolean;
  pumpOut?: boolean;
  areaId?: number;
  status?: number;
}
