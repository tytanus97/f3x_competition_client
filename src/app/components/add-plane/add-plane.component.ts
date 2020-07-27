import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Plane } from 'src/app/models/Plane';
import { PilotService } from 'src/app/services/pilot.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { ImageMaxValidator } from 'src/app/shared/CustomValidators';


@Component({
  selector: 'app-add-plane',
  templateUrl: './add-plane.component.html',
  styleUrls: ['./add-plane.component.css']
})
export class AddPlaneComponent implements OnInit, OnDestroy {
  public planeForm;
  private readonly onDestroy = new Subject<void>();
  private pilotId;
  @Output() planeAdded = new EventEmitter<Plane>();

  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private pilotService: PilotService, private cd: ChangeDetectorRef) {


    this.planeForm = this.fb.group({
      planeName: ['', { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)], updateOn: 'blur' }],
      planeColor: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)], updateOn: 'blur' }],
      planeWingSpan: ['', { validators: [Validators.required, Validators.min(0.1), Validators.max(5)], updateOn: 'blur' }],
      planeWeight: ['', { validators: [Validators.required, Validators.min(0), Validators.max(5)], updateOn: 'blur' }],
      planeImages: [null, ImageMaxValidator]
    });

  }

  ngOnInit(): void {

    this.pilotId = this.route.snapshot.paramMap.get('pilotId');

  }

  planeFormSubmit() {

    if (this.planeForm.valid && !this.planeForm.pending) {
      const plane = new Plane(0, this.planeWingSpan.value, this.planeColor.value, this.planeName.value, this.planeWeight.value, null);
      const formData = new FormData();
      //  console.log(this.planeForm.get('planeImages').value);
      // console.log(this.planeForm.get('planeImages').value);
      // const images: FileList = this.planeForm.get('planeImages').value;
      const images: Array<File> = Array.from(this.planeForm.get('planeImages').value);
      for (let image of images) {
        formData.append('images', image);
      }
      formData.append('planeBody', JSON.stringify(plane));

      this.pilotService.addPlaneToPilot(this.pilotId, formData).pipe(takeUntil(this.onDestroy)).subscribe(response => {
        this.planeAdded.emit(response as Plane);
        this.planeForm.reset();
        console.log(response as Plane);
      });
    } else {
      alert('Wypełnij formularz poprawnie!');
    }

  }
  onFileChanged(event) {

    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      this.planeForm.patchValue({
        planeImages: files
      });
      console.log(files);
    }


    /*  const files = event.target.files;
     console.log(files); */
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

  get planeImages() {
    return this.planeForm.get('planeImages');
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
