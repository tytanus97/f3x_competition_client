import { Country } from './Country';

export class Location {
  constructor(public locationId, public locationName: string,
              public lattitude: string, public longitude: string, public country: Country) {}
}
