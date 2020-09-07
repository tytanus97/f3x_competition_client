import { BehaviorSubject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Round } from 'src/app/models/Round';
import { Pilot } from 'src/app/models/Pilot';
import { Flight } from 'src/app/models/Flight';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {

  @Input()
  public pilots: Array<Pilot>;
  @Input()
  public round: Round;

  @Output()
  public emitFlight = new EventEmitter<Flight>();

  public landingPoints: Array<number>;

  public flightForm;

  constructor(private fb: FormBuilder) {

    this.initializeLandingPointsArray();
   }

  ngOnInit(): void {

    this.flightForm = this.fb.group({
      pilot: [null, {validators: [Validators.required]}],
      duration: ['', { validators: [Validators.required, Validators.min(0), Validators.max(300)]}],
      landing: ['', { validators: [Validators.required, Validators.min(0), Validators.max(50)]}],
      penalty:  ['', { validators: [Validators.required, Validators.min(0), Validators.max(100)]}],
    });

  }

    private initializeLandingPointsArray() {
      this.landingPoints = new Array<number>();

      for (let i = 0; i <= 50; i += 5) {
        this.landingPoints.push(i);
      }
    }

  submitFlight() {
    if (!this.flightForm.invalid && !this.flightForm.pending) {
      const duration = this.flightForm.controls.duration.value;
      const pilotId = Number(this.flightForm.controls.pilot.value);
      const landing =  Number(this.flightForm.controls.landing.value);
      const penalty =  this.flightForm.controls.penalty.value;
      const total = duration + landing - penalty;

      const pilot = this.pilots.find(p => p.pilotId === pilotId);

      const flight = new Flight(0, pilot, duration, landing, penalty, total);

      this.emitFlight.emit(flight);
      console.log('dupa1');
    }
  }

}
