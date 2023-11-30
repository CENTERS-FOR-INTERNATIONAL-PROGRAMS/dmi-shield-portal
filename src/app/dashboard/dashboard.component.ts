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
