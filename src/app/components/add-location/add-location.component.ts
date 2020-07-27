import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/Country';
import { Location as Locat} from 'src/app/models/Location';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit, OnDestroy {

  countryList: Array<Country>;
  private onDestroy: Subject<void> = new Subject();
  locationForm: FormGroup;

  constructor(private countryService: CountryService , private fb: FormBuilder, private cd: ChangeDetectorRef) {

    this.locationForm = this.fb.group({
      locationName: ['', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)]}],
      locationCountry: ['', {validators: [Validators.required]}],
      locationCoordinates: ['', {validators: [Validators.required,
        Validators.pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)]}]
    });

    this.locationForm.statusChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => cd.markForCheck());
  }

  ngOnInit(): void {
    this.countryService.getAllCountries().pipe(takeUntil(this.onDestroy)).subscribe(countries => {
      this.countryList = countries;
    });
  }

  get locationName() {
    return this.locationForm.get('locationName');
  }

  get locationCountry() {
    return this.locationForm.get('locationCountry');
  }

  get locationCoordinates() {
    return this.locationForm.get('locationCoordinates');
  }



  addLocation() {
    if (this.locationForm.valid) {
      const coordinates = this.locationCoordinates.value.split(' ');
      console.log(this.countryList);
      const country = this.countryList.find(c => c.countryId === parseInt(this.locationCountry.value));


      const location = new Locat(0 , this.locationName.value, coordinates[0], coordinates[1], country);
      console.log(location);
    } else {
      alert('dipa');
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
