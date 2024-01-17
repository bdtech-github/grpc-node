// Original file: ../proto/Entities.proto

import type { Bike as _DriveYourCity_Bike, Bike__Output as _DriveYourCity_Bike__Output } from './Bike';

export interface Dock {
  'id'?: (number);
  'bikes'?: (_DriveYourCity_Bike)[];
}

export interface Dock__Output {
  'id'?: (number);
  'bikes'?: (_DriveYourCity_Bike__Output)[];
}
