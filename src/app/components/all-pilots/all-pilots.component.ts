import { Component, OnInit } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { PilotService } from 'src/app/services/pilot.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-pilots',
  templateUrl: './all-pilots.component.html',
  styleUrls: ['./all-pilots.component.css']
})
export class AllPilotsComponent implements OnInit {

  public pilots: Array<Pilot>;
  constructor(private pilotService: PilotService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pilotService.getAllPilots().subscribe(data => {

    //  data.sort((a, b) => a.pilotRating - b.pilotRating);
      this.pilots = data;
      console.log(data);
    });
  }



  showPilotDetails(pilotId) {
    this.router.navigate(['../pilotDetails', { id: pilotId}], { relativeTo: this.route});
  }

}
