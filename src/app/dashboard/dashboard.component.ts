import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    uploadCsvFrom: FormGroup;
    selectedCsvType: string;
    selectedCsvFilePath: string

    constructor(private http: HttpClient, private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    taken_actions = [
        { value: 'sari_ili', viewValue: 'SARI ILI' },
        { value: 'moh_503', viewValue: 'MOH 503' },
    ];

    csvTypes = [
        { value: 'sari_ili', viewValue: 'SARI ILI' },
        { value: 'moh_503', viewValue: 'MOH 503' },
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
            csvFile: [null, Validators.required],
            csvDate: ['', Validators.required],
            csvType: ['', Validators.required],
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
