import { PilotCredentials } from './../../models/PilotCredentials';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';

@Component({
  selector: 'app-authetication',
  templateUrl: './authetication.component.html',
  styleUrls: ['./authetication.component.css']
})
export class AutheticationComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', {validators: [Validators.required]}],
      password: ['', {validators: [Validators.required]}]
    });
  }


  submitLogin() {
    if (this.loginForm.valid && !this.loginForm.pending) {
        const credentials: PilotCredentials = new PilotCredentials(this.username.value,this.password.value);
        this.authService.authenticate(credentials);
    }
  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
