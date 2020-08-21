import { Location } from './Location';
import { Pilot } from './Pilot';

export class Event {
  constructor(public eventId: number, public eventRoundCount: number,
              public eventName: string, public location: Location,
              public startDate: Date, public endDate: Date, public pilotDirector: Pilot) { }
}
