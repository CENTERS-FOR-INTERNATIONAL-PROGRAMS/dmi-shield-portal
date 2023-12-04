import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {LoginType} from "../types/LoginType";


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  loginForm: FormGroup;
  isLoginLoading: boolean;
  loginError: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    // Define your form controls here
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginFormSubmit() {
    if(this.loginForm.valid){
      this.isLoginLoading = true;

      const payload : LoginType = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      }

      this.isLoginLoading = false;
      this.router.navigate(['/dashboard']);
      // this.authService.loginUser(payload)
      //     .subscribe({
      //       next: (responseData) => {
      //         console.log('Login successful:', responseData);
      //         this.authService.saveUser(responseData['data'])
      //         this.router.navigate(['/dashboard']);
      //       },
      //       error: (error) => {
      //         console.error('Login error:', error);
      //         this.isLoginLoading = false;
      //         this.loginError = true;
      //         // Handle error
      //       },
      //       complete: () => {
      //         this.isLoginLoading = false;
      //       }
      //     });

    }

  }

}
