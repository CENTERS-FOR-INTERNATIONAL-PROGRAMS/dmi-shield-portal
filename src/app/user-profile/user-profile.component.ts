import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KVFormControl} from "../models/KVFormControl.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    FCUploadCsv: KVFormControl = {};
    uploadCsvFrom: FormGroup;

    constructor(private http: HttpClient, private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    downloadCSV() {
        // Replace 'your-csv-file.csv' with the actual file path in your project
        const filePath = 'assets/csv_samples/KENYA_MOH_503.xlsx';

        const fileName = filePath.split('/').pop();

        this.http.get(filePath, { responseType: 'blob' })
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
