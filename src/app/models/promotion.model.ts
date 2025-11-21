export type WeekType = 'I' | 'II' | 'III' | 'IV';

export interface LeaderboardItem {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
}

export interface WheelSector {
  number: number;
  angle: number;
}
