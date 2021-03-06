import { Component, OnInit, AfterContentInit, Inject, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';

import { CountryService } from 'src/app/services/country.service';


import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { PilotService } from 'src/app/services/pilot.service';
import { Pilot } from 'src/app/models/Pilot';
import { Country } from 'src/app/models/Country';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { passwordMatch, emailTakenValidator, invalidEmail, usernameTaken } from 'src/app/shared/CustomValidators';
import { PilotCredentials } from 'src/app/models/PilotCredentials';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-pilot',
  templateUrl: './add-pilot.component.html',
  styleUrls: ['./add-pilot.component.css']
})
export class AddPilotComponent implements OnInit, OnDestroy {

  private readonly onDestroy = new Subject<void>();

  public countries: Array<Country>;
  public pilotForm;
  public pilot;
  public addBtnLabel = 'Dodaj pilota';

  constructor(private fb: FormBuilder, private countryService: CountryService,
              private pilotService: PilotService, private router: Router, private route: ActivatedRoute,
              private location: Location) {

    this.pilotService.currentPilot.pipe(takeUntil(this.onDestroy)).subscribe(pilot => {
      this.pilot = pilot;
      console.log('otrzymane pilot id ' + this.pilot.pilotId);

      this.pilotForm = this.fb.group({
        firstName: [this.pilot.pilotFirstName, [Validators.required, Validators.minLength(3)]],
        lastName: [this.pilot.pilotLastName, Validators.required],
        username: ['', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
          asyncValidators: [usernameTaken(pilotService, this.pilot.pilotId === 'undefined' ? 0 : this.pilot.pilotId)], updateOn: 'blur'
        }],
        password: ['', {validators: [Validators.required, Validators.minLength(8)]}],
        confirmPassword: ['', {validators: [Validators.required]}],
        email: [this.pilot.pilotEmail, {
          validators: [Validators.required, invalidEmail],
          asyncValidators: [emailTakenValidator(pilotService, this.pilot.pilotId === 'undefined' ? 0 : this.pilot.pilotId)], updateOn: 'blur'
        }],
        birthDate: [formatDate(typeof this.pilot.pilotBirthDate === 'undefined' ? '2000-01-01' : this.pilot.pilotBirthDate,
          'yyyy-MM-dd', 'en'), [Validators.required]],
        country: [typeof this.pilot.country === 'undefined' ? 1 : this.pilot.country.countryId
          , [Validators.required]]
      }, { validators: passwordMatch('password', 'confirmPassword') });

      if (typeof this.pilot.pilotId !== 'undefined') {
        this.addBtnLabel = 'Zauktualizuj';
      }
    }
    );

  }


  ngOnInit(): void {
    this.countryService.getAllCountries().pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.countries = data;
    }, (error) => {
      console.error(error);
    });

  }

  pilotFormSubmit() {
    console.log(this.pilotForm.pending);
    if (this.pilotForm.valid && !this.pilotForm.pending) {

      const country = this.countries.find(c => c.countryId === parseInt(this.pilotForm.get('country').value));

      const pilot = new Pilot(this.pilot.pilotId, this.firstName.value.trim(), this.lastName.value.trim(),
        country, this.Email.value, this.birthDate.value, this.pilot.pilotRating);

      const pilotCredentials = new PilotCredentials(this.username.value.trim(), this.password.value);

      this.pilotService.addPilot(pilot).pipe(switchMap(result => {
          return this.pilotService.addPilotCredentials(result.body.pilotId, pilotCredentials);
      }),takeUntil(this.onDestroy))
      .subscribe(response => {
        switch (response.status) {
          case 201: {
            console.log('Success!');
            console.log(response.body);
            this.pilotForm.reset({ birthDate: formatDate(new Date('2000-01-01'), 'yyyy-MM-dd', 'en') });
            this.router.navigate(['../pilots/allPilots']);
          }         break;
          case 406: {
            console.log('Błąd!');
            console.log(response);
          }         break;
        }
      }
        , error => {
          console.error(error);
        });

    } else {
      alert('Wypełnij formularz prawidłowo!');
    }
  }


  navigateBack() {
      this.location.back();
  }

  get firstName() {
    return this.pilotForm.get('firstName');
  }

  get username() {
    return this.pilotForm.get('username');
  }

  get password() {
    return this.pilotForm.get('password');
  }
  get confirmPassword() {
    return this.pilotForm.get('confirmPassword');
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

  get form() {
    return this.pilotForm;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
