import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KVFormControl} from "../models/KVFormControl.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    FCUploadCsv: KVFormControl = {};
    uploadCsvFrom: FormGroup;
    currentUser: any;

    constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService) { }

    ngOnInit() {
        this.getCurrentUser();
    }

    getCurrentUser(){
        this.currentUser = this.authService.getUserData();
    }

    signOut(){
        this.authService.removeUserData()
    }

    createForm() {
        // Define your form controls here
        this.uploadCsvFrom = this.fb.group({
            csvFile: [null, Validators.required],
            csvDate: ['', Validators.required]
        });
    }

    onFormSubmit() {
        // Handle form submission logic here
        console.log(this.uploadCsvFrom.value);
    }

    onFileChange(event) {
        // Handle file input change, if needed
        const file = event.target.files[0];
        this.uploadCsvFrom.patchValue({ csvFile: file });
    }

}
