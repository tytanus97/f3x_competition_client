import { Component, OnInit, AfterContentInit, Inject } from '@angular/core';

import { CountryService } from 'src/app/services/country.service';


import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { PilotService } from 'src/app/services/pilot.service';
import { Pilot } from 'src/app/models/Pilot';
import { Country } from 'src/app/models/Country';
import { invalidEmail, emailTaken } from 'src/app/shared/EmailValidator';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-pilot',
  templateUrl: './add-pilot.component.html',
  styleUrls: ['./add-pilot.component.css']
})
export class AddPilotComponent implements OnInit {

  public countries: Array<Country>;
  public pilotForm;

  constructor(private fb: FormBuilder, private countryService: CountryService,
    private pilotService: PilotService, private router: Router) {

    this.pilotForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, invalidEmail], [emailTaken(pilotService)]],
      birthDate: [formatDate(new Date('2000-01-01'), 'yyyy-MM-dd', 'en'), [Validators.required]],
      country: ['', [Validators.required]]
    });
  }

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

  get lastName() {
    return this.pilotForm.get('lastName');
  }
  get birthDate() {
    return this.pilotForm.get('birthDate');
  }

  pilotFormSubmit() {
    if (this.pilotForm.valid) {
      console.log('kraj1 ' + this.pilotForm.get('country').value);
      const country = this.countries.find(c => c.countryId === parseInt(this.pilotForm.get('country').value));
      console.log('kraj ' + country);
      const pilot = new Pilot(0, this.firstName.value, this.lastName.value, country, this.Email.value, this.birthDate.value, 0);
      console.log(pilot);
      this.pilotService.addPilot(pilot).subscribe(response => {
        switch (response.status) {
          case 201: {
            console.log('Success!');
            console.log(response.body);
          }         break;
          case 406: {
            console.log('Błąd!');
            console.log(response);
          }
        }

      }
        , error => {
          console.error(error);
        });
      this.pilotForm.reset({ birthDate: formatDate(new Date('2000-01-01'), 'yyyy-MM-dd', 'en') });
    } else {
      alert('Wypełnij formularz prawidłowo!');
    }
  }

}
