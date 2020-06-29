import { Location } from './Location';
import { CompetitionClass } from './CompetitionClass';

export class Event {
  constructor(eventId: number, eventRoundCount: number,
              eventName: string, location: Location,
              competitionClass: CompetitionClass, startDate: Date, endDate: Date) { }
}
