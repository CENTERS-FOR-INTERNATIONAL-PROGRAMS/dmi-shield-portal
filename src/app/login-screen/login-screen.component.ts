import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {FetchLoginDataType, LoginType} from "../types/LoginType";
import {VerifyCodeType} from "../types/VerifyCodeType";
import {delay} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  loginForm: FormGroup;
  isLoginLoading: boolean;
  loginError: boolean = false;
  verificationForm: FormGroup;
  emailToVerify: string;
  showVerificationForm: boolean = false;
  isVerificationLoading: boolean = false;
  verificationError: boolean = false;


  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.createForm();
    this.createVerifyForm();

  }


  createForm() {
    // Define your form controls here
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createVerifyForm(){
    this.verificationForm = this.fb.group({
      verificationCode: ['', Validators.required]
    });
  }

  onLoginFormSubmit() {
    if(this.loginForm.valid){
      this.isLoginLoading = true;

      const payload : LoginType = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      }

      // this.isLoginLoading = false;
      // this.router.navigate(['/dashboard']);
      this.authService.loginUser(payload)
          .subscribe({
            next: (responseData) => {
              console.log('Login successful:', responseData);
              this.showVerificationForm = true;
              this.emailToVerify = payload.email;
            },
            error: (error) => {
              console.error('Login error:', error);
              this.isLoginLoading = false;
              this.loginError = true;
              // Handle error
            },
            complete: () => {
              this.isLoginLoading = false;
            }
          });

    }

  }


  onVerificationFormSubmit(){
    if(this.verificationForm.valid){
      const payload : VerifyCodeType = {
        email: this.emailToVerify,
        verificationCode: this.verificationForm.get('verificationCode').value
      }

      const fetchLogin : FetchLoginDataType = {
        email: this.emailToVerify
      }

      console.log(payload);
      this.authService.verifyCode(payload)
          .pipe(
              delay(2000)
          )
          .subscribe({
            next: (responseData) => {
              console.log('Verification successful:', responseData);

              this.authService.saveUser(responseData['data'])
              this.router.navigate(['/dashboard']);
              this.snackBar.open('Email Verified', 'Close', {
                duration: 5000,
                panelClass: ['success-snackbar'],
                verticalPosition: 'top',
              });
            },
            error: (error) => {
              console.error('Login error:', error);
              this.isVerificationLoading = false;
              this.verificationError = true;
            },
            complete: () => {
              this.isVerificationLoading = false;
            }
          });
    }
  }

}
