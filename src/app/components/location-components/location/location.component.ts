import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private locationService: LocationService) { }

  ngOnInit(): void {

  }

  goToAddLocation() {
    this.router.navigate(['locationForm'], {relativeTo: this.route});
  }

}
