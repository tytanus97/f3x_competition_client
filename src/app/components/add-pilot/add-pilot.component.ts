import { Component, OnInit, AfterContentInit, Inject, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';

import { CountryService } from 'src/app/services/country.service';


import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { PilotService } from 'src/app/services/pilot.service';
import { Pilot } from 'src/app/models/Pilot';
import { Country } from 'src/app/models/Country';
import { invalidEmail, emailTakenValidator } from 'src/app/shared/EmailValidator';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-pilot',
  templateUrl: './add-pilot.component.html',
  styleUrls: ['./add-pilot.component.css']
})
export class AddPilotComponent implements OnInit,OnDestroy {

  private readonly onDestroy = new Subject<void>();

  public countries: Array<Country>;
  public pilotForm;
  public pilot;
  public addBtnLabel = 'Dodaj pilota';

  constructor(private fb: FormBuilder, private countryService: CountryService,
              private pilotService: PilotService, private router: Router, private route: ActivatedRoute,
              private cd: ChangeDetectorRef) {

    this.pilotService.currentPilot.pipe(takeUntil(this.onDestroy)).subscribe(pilot => {
      this.pilot = pilot;
      console.log('otrzymane pilot id ' + this.pilot.pilotId);

      this.pilotForm = this.fb.group({
        firstName: [this.pilot.pilotFirstName, [Validators.required, Validators.minLength(3)]],
        lastName: [this.pilot.pilotLastName, Validators.required],
        email: [this.pilot.pilotEmail, { validators: [Validators.required, invalidEmail],
           asyncValidators: [emailTakenValidator(pilotService, this.pilot.pilotId === 'undefined' ? 0 : this.pilot.pilotId)], updateOn: 'blur'}],
        birthDate: [formatDate(typeof this.pilot.pilotBirthDate === 'undefined' ? '2000-01-01' : this.pilot.pilotBirthDate,
          'yyyy-MM-dd', 'en'), [Validators.required]],
        country: [typeof this.pilot.country === 'undefined' ? 1 : this.pilot.country.countryId
          , [Validators.required]]
      });

      if (typeof this.pilot.pilotId !== 'undefined') {
        this.addBtnLabel = 'Zauktualizuj';
      }
    }
    );

    this.pilotForm.statusChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => cd.markForCheck());
  }


  ngOnInit(): void {
    this.countryService.getAllCountries().pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.countries = data;
    }, (error) => {
      console.error(error);
    });

  }

  pilotFormSubmit() {
    if (this.pilotForm.valid && !this.pilotForm.pending) {
      const country = this.countries.find(c => c.countryId === parseInt(this.pilotForm.get('country').value));
      console.log('otrzymane pilot id w submicie ' + this.pilot.pilotId);
      const pilot = new Pilot(this.pilot.pilotId, this.firstName.value.trim(), this.lastName.value.trim(),
        country, this.Email.value, this.birthDate.value, this.pilot.pilotRating);
      this.pilotService.addPilot(pilot).pipe(takeUntil(this.onDestroy)).subscribe(response => {
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
          }          break;
        }
      }
        , error => {
          console.error(error);
        });

    } else {
      alert('Wypełnij formularz prawidłowo!');
    }
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

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
