import { Component, OnInit } from '@angular/core';
import { AddPilotService } from 'src/app/services/add-pilot.service';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/entities/Country';
import { HttpService } from 'src/app/services/http.service';
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

  constructor(private fb: FormBuilder, private httpService: HttpService, public countryService: CountryService){ }

  public pilotForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), firstNameValidator(/Pawel/)]],
    lastName: [''],
    email: ['', [Validators.required, invalidEmail]],
    birthDate: [],
    country: ['']
  });

  ngOnInit(): void {

      this.httpService.getCountries().subscribe(data => {
        this.countries = data;
      });
  }

  get firstName() {
    return this.pilotForm.get('firstName');
  }

  get Email() {
    return this.pilotForm.get('email');
  }

}
