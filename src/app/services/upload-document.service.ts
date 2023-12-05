import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LoginType} from "../types/LoginType";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  uploadDocument(file: File, csvType: string, dateUploaded: Date) {
    // let url = "http://localhost:5001/saveToSql";
    let url = "http://localhost:3001/api/v1/documents";

    // Create FormData object
    const formData: FormData = new FormData();

    let params = new HttpParams()
        .set('uploadDocType', csvType)
        .set('dateUploaded', dateUploaded.toISOString());

    // Append the file to FormData
    formData.append('csvFile', file, file.name);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getUserToken()}`  // Adjust this based on your actual authentication service
    });

    // Make the HTTP request
    return this.http.post(url, formData, {  headers: headers, params: params });
    // return this.http.post(url, formData);
  }
}
