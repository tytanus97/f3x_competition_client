import { Pilot } from './Pilot';
import { Round } from './Round';

export class Flight {

  constructor(public flightId?: number, public pilot?: Pilot,
              public flightDuration?: number, public flightLanding?: number, public flightPenalty?: number) {}
}
