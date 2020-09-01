import { Flight } from './Flight';

export class Round {
  constructor(public roundId: number, public  event?: Event,
              public  roundNumber?: number, public roundStatus?: number,
               public flightList?: Array<Flight> ) {}
}
