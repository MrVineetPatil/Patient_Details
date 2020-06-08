import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientCreateComponent } from './components/patient-create/patient-create.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientEditComponent } from './components/patient-edit/patient-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-patient' },
  { path: 'create-patient', component: PatientCreateComponent },
  { path: 'edit-patient/:id', component: PatientEditComponent },
  { path: 'patients-list', component: PatientListComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }