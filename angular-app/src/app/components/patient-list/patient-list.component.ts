import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})

export class PatientListComponent implements OnInit {
  
  Patient:any = [];

  constructor(private apiService: ApiService) { 
    this.readPatient();
  }

  ngOnInit() {}

  readPatient(){
    this.apiService.getPatients().subscribe((data) => {
     this.Patient = data;
    })    
  }

  removePatient(patient, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deletePatient(patient._id).subscribe((data) => {
          this.Patient.splice(index, 1);
        }
      )    
    }
  }

}