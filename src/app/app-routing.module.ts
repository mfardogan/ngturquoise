import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { EditAdminProfileComponent } from './components/admin/edit-admin-profile/edit-admin-profile.component';
import { ChoiceGroupItemComponent } from './components/choice/choice-group-item/choice-group-item.component';
import { ChoiceGroupsComponent } from './components/choice/choice-groups/choice-groups.component';
import { DoctorProfileComponent } from './components/doctor/doctor-profile/doctor-profile.component';
import { DoctorsComponent } from './components/doctor/doctors/doctors.component';
import { EditDoctorProfileComponent } from './components/doctor/edit-doctor-profile/edit-doctor-profile.component';
import { Error401Component } from './components/layout/error401/error401.component';
import { Error404Component } from './components/layout/error404/error404.component';
import { Error500Component } from './components/layout/error500/error500.component';
import { SignInAdminComponent } from './components/sign-in-admin/sign-in-admin.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CreateSurveyComponent } from './components/survey/create-survey/create-survey.component';
import { SurveyItemComponent } from './components/survey/survey-item/survey-item.component';
import { SurveysComponent } from './components/survey/surveys/surveys.component';

const routes: Routes = [
  {
    path: 'signin/admin',
    component: SignInAdminComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'survey/:id',
    component: SurveyItemComponent
  },
  {
    path: 'surveys',
    component: SurveysComponent
  },
  {
    path: 'add-survey',
    component: CreateSurveyComponent
  },
  {
    path: 'edit-doctor',
    component: EditDoctorProfileComponent
  },
  {
    path: 'edit-admin',
    component: EditAdminProfileComponent
  },
  {
    path: 'admins',
    component: AdminsComponent
  }, {
    path: 'admin/:id',
    component: AdminProfileComponent
  },
  {
    path: '401',
    component: Error401Component
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '500',
    component: Error500Component
  },
  {
    path: 'choices',
    component: ChoiceGroupsComponent
  }, {
    path: 'choice',
    component: ChoiceGroupItemComponent
  }, {
    path: 'choice/:id',
    component: ChoiceGroupItemComponent
  }, {
    path: 'doctors',
    component: DoctorsComponent
  }, {
    path: 'doctor/:id',
    component: DoctorProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
