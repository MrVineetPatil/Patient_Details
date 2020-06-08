import { Patient } from './../../model/Patient';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})

export class PatientEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  patientData: Patient[];
  PatientProfile: any = ['Male', 'Female']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updatePatient();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPatient(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      symptoms: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
      // name: ['', [Validators.required]],
      // age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // gender: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // symptoms: ['', [Validators.required]],
      // phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('gender').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getPatient(id) {
    this.apiService.getPatient(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        age: data['age'],
        gender: data['gender'],
        email: data['email'],
        symptoms: data['symptoms'],
        phoneNumber: data['phoneNumber'],
      });
    });
  }

  updatePatient() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      symptoms: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updatePatient(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/patients-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}