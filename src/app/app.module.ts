import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendConfigService } from './@core/services/backend-config.service';
import { AdminsComponent } from './components/layout/dash/admin/admins/admins.component';
import { AdminProfileComponent } from './components/layout/dash/admin/admin-profile/admin-profile.component';
import AdminHttp from './components/layout/dash/admin/admin-http';
import { EditAdminProfileComponent } from './components/layout/dash/admin/edit-admin-profile/edit-admin-profile.component';
import AuthHttp from './components/auth-http';
import { AuthInterceptor } from './components/auth.ineterceptor';
import { Error401Component } from './components/layout/noauth/error401/error401.component';
import { Error500Component } from './components/layout/noauth/error500/error500.component';
import { Error404Component } from './components/layout/noauth/error404/error404.component';
import { SignInComponent } from './components/layout/noauth/sign-in/sign-in.component';
import { SignUpComponent } from './components/layout/noauth/sign-up/sign-up.component';
import { SignInAdminComponent } from './components/layout/noauth/sign-in-admin/sign-in-admin.component';
import { NoAuthLayoutComponent } from './components/layout/noauth/no-auth-layout/no-auth-layout.component';
import { ChoiceGroupsComponent } from './components/layout/dash/choice/choice-groups/choice-groups.component';
import { ChoiceGroupItemComponent } from './components/layout/dash/choice/choice-group-item/choice-group-item.component';
import { SideBarComponent } from './components/layout/dash/side-bar/side-bar.component';
import { NavBarComponent } from './components/layout/dash/nav-bar/nav-bar.component';
import { FooterComponent } from './components/layout/dash/footer/footer.component';
import { ContentComponent } from './components/layout/dash/content/content.component';
import { AlertBoxComponent } from './components/layout/dash/alert-box/alert-box.component';
import { DoctorsComponent } from './components/layout/dash/doctor/doctors/doctors.component';
import { DoctorProfileComponent } from './components/layout/dash/doctor/doctor-profile/doctor-profile.component';
import { CreateSurveyComponent } from './components/layout/dash/survey/create-survey/create-survey.component';
import { SurveysComponent } from './components/layout/dash/survey/surveys/surveys.component';
import { SurveyItemComponent } from './components/layout/dash/survey/survey-item/survey-item.component';
import { EditDoctorProfileComponent } from './components/layout/dash/doctor/edit-doctor-profile/edit-doctor-profile.component';
import { SurveyActivityComponent } from './components/layout/dash/survey/survey-activity/survey-activity.component';
import { SurveyGeneralComponent } from './components/layout/dash/survey/survey-general/survey-general.component';
import ChoiceGroupHttp from './components/layout/dash/choice/choice-group-http';
import DoctorHttp from './components/layout/dash/doctor/doctor-http';
import SurveyHttp from './components/layout/dash/survey/survey-http';
import AnswerHttp from './components/layout/dash/answer/answer-http';
import { JoinSurveyComponent } from './components/layout/doctor/join-survey/join-survey.component';
import { DoctorLayoutComponent } from './components/layout/doctor/doctor-layout/doctor-layout.component';
import { SettingsComponent } from './components/layout/dash/settings/settings.component';
import { SettingsHttp } from './components/layout/dash/settings/settings-http';
import { SurveyEditComponent } from './components/layout/dash/survey/survey-edit/survey-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoiceGroupsComponent,
    ChoiceGroupItemComponent,
    SideBarComponent,
    NavBarComponent,
    FooterComponent,
    ContentComponent,
    AlertBoxComponent,
    DoctorsComponent,
    DoctorProfileComponent,
    Error500Component,
    Error404Component,
    Error401Component,
    AdminsComponent,
    AdminProfileComponent,
    EditAdminProfileComponent,
    CreateSurveyComponent,
    SurveysComponent,
    SurveyItemComponent,
    EditDoctorProfileComponent,
    SignInComponent,
    SignUpComponent,
    SignInAdminComponent,
    SurveyActivityComponent,
    SurveyGeneralComponent,
    NoAuthLayoutComponent,
    JoinSurveyComponent,
    DoctorLayoutComponent,
    SettingsComponent,
    SurveyEditComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ChoiceGroupHttp,
    DoctorHttp,
    AdminHttp,
    SurveyHttp,
    AuthHttp,
    AnswerHttp,
    SettingsHttp,
    BackendConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(dependency: Injector) {
    Dependency = dependency;
  }
}

export let Dependency: Injector;
