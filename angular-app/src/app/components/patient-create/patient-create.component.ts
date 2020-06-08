import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})

export class PatientCreateComponent implements OnInit {  
  submitted = false;
  patientForm: FormGroup;
  PatientProfile:any = ['Male','Female']
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.patientForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      symptoms: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
      // name: ['', [Validators.required]],
      // age: ['', [Validators.required, Validators.pattern('^[0-100]+$')]],
      // gender: ['', [Validators.required]],
      //email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
     // symptoms: ['', [Validators.required]],
      //phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose gender with select dropdown
  updateProfile(e){
    this.patientForm.get('gender').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.patientForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.patientForm.valid) {
      console.log("Pattern match failed!")
      return false;
    } else {
      this.apiService.createPatient(this.patientForm.value).subscribe(
        (res) => {
          console.log('Patient successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/patients-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}