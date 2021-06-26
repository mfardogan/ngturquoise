import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { DoctorGroupsComponent } from './components/doctor/doctor-groups/doctor-groups.component';
import { DoctorGroupItemComponent } from './components/doctor/doctor-group-item/doctor-group-item.component';
import DoctorGroupHttp from './components/doctor/doctor-group-http';
import { AlertBoxComponent } from './components/layout/alert-box/alert-box.component';
import { DoctorsComponent } from './components/doctor/doctors/doctors.component';
import { DoctorProfileComponent } from './components/doctor/doctor-profile/doctor-profile.component';
import DoctorHttp from './components/doctor/doctor-http';
import { Error500Component } from './components/layout/error500/error500.component';
import { Error404Component } from './components/layout/error404/error404.component';
import { Error401Component } from './components/layout/error401/error401.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoiceGroupsComponent,
    ChoiceGroupItemComponent,
    SideBarComponent,
    NavBarComponent,
    FooterComponent,
    ContentComponent,
    DoctorGroupsComponent,
    DoctorGroupItemComponent,
    AlertBoxComponent,
    DoctorsComponent,
    DoctorProfileComponent,
    Error500Component,
    Error404Component,
    Error401Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ChoiceGroupHttp,
    DoctorGroupHttp,
    DoctorHttp,
    BackendConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(dependency: Injector) {
    Dependency = dependency;
  }
}

export let Dependency: Injector;
