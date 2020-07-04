import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Plane } from 'src/app/models/Plane';
import { PilotService } from 'src/app/services/pilot.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-plane',
  templateUrl: './add-plane.component.html',
  styleUrls: ['./add-plane.component.css']
})
export class AddPlaneComponent implements OnInit,OnDestroy {
  public planeForm;
  private readonly onDestroy = new Subject<void>();
  private pilotId;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private pilotService: PilotService) {


    this.planeForm = this.fb.group({
      planeName: ['', { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)], updateOn: 'blur' }],
      planeColor: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)], updateOn: 'blur' }],
      planeWingSpan: ['', { validators: [Validators.required, Validators.min(0.1), Validators.max(5)], updateOn: 'blur' }],
      planeWeight: ['', { validators: [Validators.required, Validators.min(0), Validators.max(5)], updateOn: 'blur' }]
    });

  }


  ngOnInit(): void {

    this.pilotId = this.route.snapshot.paramMap.get('pilotId');

  }

  planeFormSubmit() {

    if(this.planeForm.valid && !this.planeForm.pending) {
      const plane = new Plane(0, this.planeWingSpan.value, this.planeColor.value, this.planeName.value, this.planeWeight.value, null);
      this.pilotService.addPlaneToPilot(this.pilotId, plane).pipe(takeUntil(this.onDestroy)).subscribe(response => {
          if (response.status === 200) {
            console.log('udalo sie dodac samolot do pilota');
            this.planeForm.reset();
          }
      }, error => {
        console.error(error);
      });
    }

  }

  get planeName() {
    return this.planeForm.get('planeName');
  }

  get planeColor() {
    return this.planeForm.get('planeColor');
  }

  get planeWingSpan() {
    return this.planeForm.get('planeWingSpan');
  }

  get planeWeight() {
    return this.planeForm.get('planeWeight');
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
