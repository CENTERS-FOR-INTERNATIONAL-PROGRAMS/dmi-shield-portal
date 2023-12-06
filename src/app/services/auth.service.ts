import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FetchLoginDataType, LoginType} from "../types/LoginType";
import {ConfigService} from "./config.service";
import {RegisterType} from "../types/RegisterType";
import {VerifyCodeType} from "../types/VerifyCodeType";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';
  private userDataKey = 'userData';

  constructor(private http: HttpClient, private configService: ConfigService) { }

  loginUser(loginPayload : LoginType){
    const url = `${this.configService.getBaseUrl()}/login`;
    return this.http.post(url, loginPayload);
  }

  registerUser(loginPayload : RegisterType){
    const url = `${this.configService.getBaseUrl()}/signup`;
    return this.http.post(url, loginPayload);
  }

  verifyCode(loginPayload : VerifyCodeType){
    const url = `${this.configService.getBaseUrl()}/verify-code`;
    return this.http.post(url, loginPayload);
  }

  fetchLoginData(payload : FetchLoginDataType){
    const url = `${this.configService.getBaseUrl()}/fetch-login-data`;
    return this.http.post(url, payload);
  }



  saveUser(data: any): void {
    localStorage.removeItem(this.userDataKey);
    localStorage.setItem(this.userDataKey, JSON.stringify(data));

    this.saveToken(data.token);
  }

  saveToken(token: string): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.setItem(this.tokenKey, token);
  }



  getUserData(): any | null {
    const dataString = localStorage.getItem(this.userDataKey);
    return dataString ? JSON.parse(dataString) : null;
  }

  getUserToken(): any | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeUserData(): void {
    localStorage.removeItem(this.userDataKey);
    localStorage.removeItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
