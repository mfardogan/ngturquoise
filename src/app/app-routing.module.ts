import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { EditAdminProfileComponent } from './components/admin/edit-admin-profile/edit-admin-profile.component';
import { ChoiceGroupItemComponent } from './components/choice/choice-group-item/choice-group-item.component';
import { ChoiceGroupsComponent } from './components/choice/choice-groups/choice-groups.component';
import { DoctorGroupItemComponent } from './components/doctor/doctor-group-item/doctor-group-item.component';
import { DoctorGroupsComponent } from './components/doctor/doctor-groups/doctor-groups.component';
import { DoctorProfileComponent } from './components/doctor/doctor-profile/doctor-profile.component';
import { DoctorsComponent } from './components/doctor/doctors/doctors.component';
import { Error401Component } from './components/layout/error401/error401.component';
import { Error404Component } from './components/layout/error404/error404.component';
import { Error500Component } from './components/layout/error500/error500.component';

const routes: Routes = [
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
    path: 'groups',
    component: DoctorGroupsComponent
  }, {
    path: 'group',
    component: DoctorGroupItemComponent
  }, {
    path: 'group/:id',
    component: DoctorGroupItemComponent
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
