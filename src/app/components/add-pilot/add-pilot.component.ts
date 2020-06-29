import { Component, OnInit } from '@angular/core';

import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/Country';

import { FormBuilder, Validators } from '@angular/forms';
import { invalidEmail } from 'src/app/shared/EmailValidator';
import { firstNameValidator } from 'src/app/shared/FirstNameValidator';

@Component({
  selector: 'app-add-pilot',
  templateUrl: './add-pilot.component.html',
  styleUrls: ['./add-pilot.component.css']
})
export class AddPilotComponent implements OnInit {

  public countries: Array<Country>;

  constructor(private fb: FormBuilder, public countryService: CountryService){ }

  public pilotForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), firstNameValidator(/Pawel/)]],
    lastName: [''],
    email: ['', [Validators.required, invalidEmail]],
    birthDate: [],
    country: ['']
  });

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(data => {
      this.countries = data;
    }, (error) => {
        console.error(error);
    });
  }

  get firstName() {
    return this.pilotForm.get('firstName');
  }

  get Email() {
    return this.pilotForm.get('email');
  }

  get LastName() {
    return this.pilotForm.get('lastName');
  }

}
