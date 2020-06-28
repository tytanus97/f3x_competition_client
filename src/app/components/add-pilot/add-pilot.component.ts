import { Component, OnInit } from '@angular/core';
import { AddPilotService } from 'src/app/services/add-pilot.service';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/entities/Country';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-pilot',
  templateUrl: './add-pilot.component.html',
  styleUrls: ['./add-pilot.component.css']
})
export class AddPilotComponent implements OnInit {
 /*  public pilotFirstName: string;
  public pilotLastName: string;
  public pilotEmail: string;
  public pilotCountry: Country;
  public pilotBirthDate: Date; */
  public countries: Array<Country>;

  public addPilotForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl(''),
    birthDate: new FormControl('')
  });

  constructor(private httpService: HttpService, private addPilotService: AddPilotService, public countryService: CountryService) { }




  ngOnInit(): void {

      this.httpService.getCountries().subscribe(data => {
        this.countries = data;
      });
  }

}
