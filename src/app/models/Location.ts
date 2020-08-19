import { Country } from './Country';
import { Image } from './Image';
export class Location {
  constructor(public locationId, public locationName: string,
              public latitude: string, public longitude: string, public country: Country, public imageList?: Array<Image>) {}
}
