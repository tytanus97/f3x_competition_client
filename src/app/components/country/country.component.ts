import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  public Countries = [{ id: 1, name: 'Polska', code: 'POL' },
  { id: 2, name: 'Niemcy', code: 'GER' },
  { id: 3, name: 'USA', code: 'USA' },
  { id: 4, name: 'Rosja', code: 'RUS' },
  { id: 5, name: 'Brazylia', code: 'BRA' }];


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectCountry(country) {
    this.router.navigate(['/countries/', country.id]);
  
  }

}
