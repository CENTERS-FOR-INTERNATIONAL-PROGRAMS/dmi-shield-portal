import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {UploadDocumentService} from "../services/upload-document.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    uploadCsvFrom: FormGroup;
    selectedCsvType: string;
    selectedCsvFilePath: string
    isUploadLoading: boolean;
    uploadError: boolean = false;
    uploadResponse: string;
    uploadSuccess: boolean;

    constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private uploadService: UploadDocumentService) { }

    ngOnInit() {
        this.createForm();
    }

    taken_actions = [
        { value: 'sari_ili', viewValue: 'SARI ILI' },
        { value: 'moh_503', viewValue: 'MOH 503' },
        { value: 'IDSR Climate Diseases', viewValue: 'IDSR Climate Diseases' },
    ];

    csvTypes = [
        { value: 'sari_ili', viewValue: 'SARI ILI' },
        { value: 'moh_503', viewValue: 'MOH 503' },
        { value: 'IDSR Climate Diseases', viewValue: 'IDSR Climate Diseases' },
    ];

    downloadCSV() {
        if(this.selectedCsvType === 'sari_ili')
        {
            this.selectedCsvFilePath = 'assets/csv_samples/SARI_ILI_Dataset_sample.csv';
        }
        else if(this.selectedCsvType === 'moh_503')
        {
            this.selectedCsvFilePath = 'assets/csv_samples/MOH_503.csv';
        }

        const fileName = this.selectedCsvFilePath.split('/').pop();

        this.http.get(this.selectedCsvFilePath, { responseType: 'blob' })
            .subscribe((data: any) => {
                const blob = new Blob([data], { type: 'application/csv' });
                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.download = fileName || 'your-downloaded-file.csv';
                downloadLink.click();
            });


    }


    createForm() {
        // Define your form controls here
        this.uploadCsvFrom = this.fb.group({
            csvFile: [],
            csvDate: [new Date(), Validators.required],
            csvType: ['', Validators.required],
        });
    }

    onFormSubmit() {
        // Handle form submission logic here
        if(this.uploadCsvFrom.valid){
            // const file = this.uploadCsvFrom.get('csvFile').value;
            const formData = this.uploadCsvFrom.value;

            // this.uploadService.uploadDocument(formData.csvFile)
            this.uploadService.uploadDocument(formData.csvFile, formData.csvType, formData.csvDate)
                .subscribe({
                    next: (responseData) => {
                        console.log('Upload successful:', responseData);
                        this.isUploadLoading = false;
                        this.uploadResponse = responseData['message'];
                        this.uploadSuccess = responseData['success'];
                        //{"message":"Document submitted successfully","data":null,"success":true}
                    },
                    error: (error) => {
                        if (error.status === 401) {
                            // Handle 401 Unauthorized error here
                            this.router.navigate(['/login']);
                        }
                        this.isUploadLoading = false;
                        this.uploadError = true;
                        this.uploadResponse = error.error['message'];
                        // Handle error
                    },
                    complete: () => {
                        this.isUploadLoading = false;
                    }
                });

        }

    }

    // uploadDocument(file: File) {
    //     let url = "http://localhost:5001/saveToSql";
    //
    //     // Create FormData object
    //     const formData: FormData = new FormData();
    //
    //     // Append the file to FormData
    //     formData.append('csvFile', file, file.name);
    //
    //     // You can append additional data if needed
    //     // formData.append('otherKey', 'otherValue');
    //
    //     // Make the HTTP request
    //     return this.http.post(url, formData);
    // }

    // onFileChange(event) {
    //     // Handle file input change, if needed
    //     const file = event.target.files[0];
    //     this.uploadCsvFrom.patchValue({ csvFile: file });
    // }

    onFileChange(event: any) {
        const fileList: FileList = event.target.files;

        if (fileList.length > 0) {
            const file: File = fileList[0];
            this.uploadCsvFrom.patchValue({
                csvFile: file
            });
        }
    }

}
