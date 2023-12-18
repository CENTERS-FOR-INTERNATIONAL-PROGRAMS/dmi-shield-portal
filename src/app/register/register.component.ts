import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginType} from "../types/LoginType";
import {RegisterType} from "../types/RegisterType";
import {AuthService} from "../services/auth.service";
import {delay} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VerifyCodeType} from "../types/VerifyCodeType";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isRegisterLoading: boolean;
  registerForm: FormGroup;
  registerError: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  onRegisterFormSubmit() {
    if(this.registerForm.valid){
      this.isRegisterLoading = true;

      const payload : RegisterType = {
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        firstName: this.registerForm.get('firstName').value,
        lastName: this.registerForm.get('lastName').value,
      }

      this.authService.registerUser(payload)
          .pipe(
              delay(2000)
          )
          .subscribe({
            next: (responseData) => {
              console.log('Register successful:', responseData);

              this.snackBar.open('Registration successful', 'Close', {
                duration: 3000,
                panelClass: ['success-snackbar'],
                verticalPosition: 'top',
              });
              this.router.navigate(['/login']);
            },
            error: (error) => {
              console.error('Login error:', error);
              this.isRegisterLoading = false;
              this.registerError = true;
            },
            complete: () => {
              this.isRegisterLoading = false;
            }
          });

    }
  }



}
