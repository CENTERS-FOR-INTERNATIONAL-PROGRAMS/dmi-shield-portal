import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginType} from "../types/LoginType";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';
  private userDataKey = 'userData';

  constructor(private http: HttpClient) { }

  loginUser(loginPayload : LoginType){
    let url = "http://localhost:3001/api/v1/login";


    return this.http.post(url, loginPayload)
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
