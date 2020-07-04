import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-plane',
  templateUrl: './add-plane.component.html',
  styleUrls: ['./add-plane.component.css']
})
export class AddPlaneComponent implements OnInit {
  public planeForm;
  constructor(private fb: FormBuilder) {

    this.planeForm = this.fb.group({
      planeName: ['', { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)], updateOn: 'blur' }],
      planeColor: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)], updateOn: 'blur' }],
      planeWingSpan: ['', { validators: [Validators.required, Validators.min(0.1), Validators.max(5)], updateOn: 'blur' }],
      planeWeight: ['', { validators: [Validators.required, Validators.min(0), Validators.max(5)], updateOn: 'blur' }]
    });

  }

  ngOnInit(): void {
  }

  planeFormSubmit() {

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

}
