import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { PilotService } from 'src/app/services/pilot.service';
import { Router, ActivatedRoute } from '@angular/router';
import { iif, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-all-pilots',
  templateUrl: './all-pilots.component.html',
  styleUrls: ['./all-pilots.component.css']
})
export class AllPilotsComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public pilots: Array<Pilot>;
  public countries: Array<Country>;

  constructor(private pilotService: PilotService, private router: Router, private route: ActivatedRoute,private countryService: CountryService) { }


  ngOnInit(): void {
    this.pilotService.getAllPilots().pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.pilots = data.sort((a, b) => a.pilotRating - b.pilotRating);
    });

    this.countryService.getAllCountries().pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.countries = data;
    });
  }

  showPilotDetails(pilotId) {
    this.pilotService.showPilotDetails(pilotId);
  }

  onSelectCountryChange(countryName: string) {
    iif(()=> countryName !== 'all',this.pilotService.findAllPilotsByCountryName(countryName),this.pilotService.getAllPilots())
    .pipe(take(1)).subscribe(data => {
      this.pilots = data;
    });
  
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }



}
