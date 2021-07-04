import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoiceGroupItemComponent } from './components/choice/choice-group-item/choice-group-item.component';
import { BackendConfigService } from './@core/services/backend-config.service';
import ChoiceGroupHttp from './components/choice/choice-group-http';
import { ChoiceGroupsComponent } from './components/choice/choice-groups/choice-groups.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ContentComponent } from './components/layout/content/content.component';
import { AlertBoxComponent } from './components/layout/alert-box/alert-box.component';
import { DoctorsComponent } from './components/doctor/doctors/doctors.component';
import { DoctorProfileComponent } from './components/doctor/doctor-profile/doctor-profile.component';
import DoctorHttp from './components/doctor/doctor-http';
import { Error500Component } from './components/layout/error500/error500.component';
import { Error404Component } from './components/layout/error404/error404.component';
import { Error401Component } from './components/layout/error401/error401.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import AdminHttp from './components/admin/admin-http';
import SurveyHttp from './components/survey/survey-http';
import { EditAdminProfileComponent } from './components/admin/edit-admin-profile/edit-admin-profile.component';
import { CreateSurveyComponent } from './components/survey/create-survey/create-survey.component';
import { SurveysComponent } from './components/survey/surveys/surveys.component';
import { SurveyItemComponent } from './components/survey/survey-item/survey-item.component';
import { SurveyFileComponent } from './components/survey/survey-file/survey-file.component';
import { EditDoctorProfileComponent } from './components/doctor/edit-doctor-profile/edit-doctor-profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import AuthHttp from './components/auth-http';
import { AuthInterceptor } from './components/auth.ineterceptor';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInAdminComponent } from './components/sign-in-admin/sign-in-admin.component';
import { SurveyActivityComponent } from './components/survey/survey-activity/survey-activity.component';
import { SurveyGeneralComponent } from './components/survey/survey-general/survey-general.component';

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
    SurveyFileComponent,
    EditDoctorProfileComponent,
    SignInComponent,
    SignUpComponent,
    SignInAdminComponent,
    SurveyActivityComponent,
    SurveyGeneralComponent,
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
