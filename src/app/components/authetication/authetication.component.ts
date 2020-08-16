import { PilotCredentials } from './../../models/PilotCredentials';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';
import { Subject } from 'rxjs';
import { takeUntil, catchError, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-authetication',
  templateUrl: './authetication.component.html',
  styleUrls: ['./authetication.component.css']
})
export class AutheticationComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService,private location: Location) { }

  public badCredentials = false;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', {validators: [Validators.required]}],
      password: ['', {validators: [Validators.required]}]
    });
  }


  submitLogin() {
    if (this.loginForm.valid && !this.loginForm.pending) {
        const credentials: PilotCredentials = new PilotCredentials(this.username.value, this.password.value);
        // tslint:disable-next-line: max-line-length
        this.authService.authenticate(credentials).pipe(takeUntil(this.onDestroy))
        .subscribe(res => {
          this.authService.setToken(res);
          this.badCredentials = false;
        }, err => {

          this.badCredentials = true;
        });


    } else {
      this.loginForm.setErrors({'emptyForm': 'Wypelnij pola'});
    }
  }

  navigateBack() {
    this.location.back();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
