import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './@core/services/auth-guard.service';
import { AdminItemComponent } from './components/layout/dash/admin/admin-item/admin-item.component';
import { AdminProfileComponent } from './components/layout/dash/admin/admin-profile/admin-profile.component';
import { AdminsComponent } from './components/layout/dash/admin/admins/admins.component';
import { EditAdminProfileComponent } from './components/layout/dash/admin/edit-admin-profile/edit-admin-profile.component';
import { ChoiceGroupItemComponent } from './components/layout/dash/choice/choice-group-item/choice-group-item.component';
import { ChoiceGroupsComponent } from './components/layout/dash/choice/choice-groups/choice-groups.component';
import { ContentComponent } from './components/layout/dash/content/content.component';
import { DoctorProfileComponent } from './components/layout/dash/doctor/doctor-profile/doctor-profile.component';
import { DoctorsComponent } from './components/layout/dash/doctor/doctors/doctors.component';
import { EditDoctorProfileComponent } from './components/layout/dash/doctor/edit-doctor-profile/edit-doctor-profile.component';
import { OverviewComponent } from './components/layout/dash/overview/overview.component';
import { SettingsComponent } from './components/layout/dash/settings/settings.component';
import { CreateSurveyComponent } from './components/layout/dash/survey/create-survey/create-survey.component';
import { SurveyItemComponent } from './components/layout/dash/survey/survey-item/survey-item.component';
import { SurveysComponent } from './components/layout/dash/survey/surveys/surveys.component';
import { DoctorLayoutComponent } from './components/layout/doctor/doctor-layout/doctor-layout.component';
import { JoinSurveyComponent } from './components/layout/doctor/join-survey/join-survey.component';
import { Error401Component } from './components/layout/noauth/error401/error401.component';
import { Error404Component } from './components/layout/noauth/error404/error404.component';
import { Error500Component } from './components/layout/noauth/error500/error500.component';
import { NoAuthLayoutComponent } from './components/layout/noauth/no-auth-layout/no-auth-layout.component';
import { SignInAdminComponent } from './components/layout/noauth/sign-in-admin/sign-in-admin.component';
import { SignInComponent } from './components/layout/noauth/sign-in/sign-in.component';
import { SignUpComponent } from './components/layout/noauth/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ContentComponent, canActivate: [AuthGuardService] },
  {
    path: '',
    component: DoctorLayoutComponent,
    children: [
      { path: 'join/:id', component: JoinSurveyComponent, pathMatch: 'full' },
    ]
  },
  {
    path: '',
    component: NoAuthLayoutComponent,
    children: [
      { path: '401', component: Error401Component, pathMatch: 'full' },
      { path: '404', component: Error404Component, pathMatch: 'full' },
      { path: '500', component: Error500Component, pathMatch: 'full' },
      { path: 'signin/admin', component: SignInAdminComponent, pathMatch: 'full' },
      { path: 'signin', component: SignInComponent, pathMatch: 'full' },
      { path: 'signup', component: SignUpComponent, pathMatch: 'full' },
    ]
  },

  {
    path: 'dash',
    canActivate: [AuthGuardService],
    component: ContentComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'update-admin/:id', component: AdminItemComponent },
      { path: 'new-admin', component: AdminItemComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'dash', component: ContentComponent },
      { path: 'survey/:id', component: SurveyItemComponent },
      { path: 'surveys', component: SurveysComponent },
      { path: 'add-survey', component: CreateSurveyComponent },
      { path: 'edit-doctor', component: EditDoctorProfileComponent },
      { path: 'edit-admin', component: EditAdminProfileComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'admin/:id', component: AdminProfileComponent },
      { path: 'choices', component: ChoiceGroupsComponent },
      { path: 'choice', component: ChoiceGroupItemComponent },
      { path: 'choice/:id', component: ChoiceGroupItemComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'doctor/:id', component: DoctorProfileComponent }
    ]
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
