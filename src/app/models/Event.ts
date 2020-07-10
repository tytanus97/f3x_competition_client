import { Location } from './Location';

export class Event {
  constructor(public eventId: number, public eventRoundCount: number,
              public eventName: string, public location: Location,
              public competitionClass: string, public startDate: Date, public endDate: Date, public eventPilotCount: number) { }
}
