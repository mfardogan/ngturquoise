import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Administrator from 'src/app/@core/models/administrator';
import ModifyAdminPassword from 'src/app/@core/models/modify-admin-pass';
import { Dependency } from 'src/app/app.module';
import AdminHttp from '../admin-http';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css']
})
export class AdminItemComponent implements OnInit {

  constructor
    (
      private toastr: ToastrService,
      private route: Router,
      private router: ActivatedRoute
    ) { }

  id!: number;
  clearedAvatar: boolean = false;
  confirmToDelete: boolean = false;
  passwordScore: number = 0;
  data: Administrator = new Administrator();

  passwordChangeConfirm: string = '';
  password: ModifyAdminPassword = new ModifyAdminPassword();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const id = this.router.snapshot.paramMap.get('id');
    if (!(id == undefined || id == '')) {
      this.id = Number(id);
      this.password.id = this.id;
      Dependency.get(AdminHttp).get(this.id).subscribe(
        (data: Administrator) => {
          this.data = data;
          console.log(this.data);
        });
    }
  }

  save() {
    const httpService = Dependency.get(AdminHttp);
    if (this.id > 0) {
      httpService.update(this.data)
        .subscribe(() => {
          this.route.navigate(['/dash/admins']);
        });
    } else {
      httpService.add(this.data)
        .subscribe(() => {
          this.route.navigate(['/dash/admins']);
        });
    }
  }

  setGender(gender: number, event: any) {
    if (event.target.value) {
      this.data.gender = gender;
    }
  }

  passstrenth() {
    const password = this.password.newPassword;
    if (password.length < 5) {
      this.passwordScore = 0;
      this.passwordScore = 0;
    }
    this.passwordScore = Math.floor(Math.random() * 100);
  }

  hasImage(): boolean {
    return this.id > 0 && this.data.image != null
  }

  remove() {
    if (!this.confirmToDelete) {
      this.toastr.warning("Silme işlemini onaylayın!", "Dikkat!");
      return;
    }

    Dependency.get(AdminHttp)
      .remove(this.id)
      .subscribe(() => {
        this.route.navigate(['/dash/admins']);
        this.toastr.success("Silme işlemini tamamlandı!", "Dikkat!");
      });
  }

  clearAvatar() {
    Dependency.get(AdminHttp)
      .clearAvatarById(this.id)
      .subscribe(() => {
        this.clearedAvatar = true;
        this.toastr.success("Avatar silme işlemini tamamlandı!", "Dikkat!");
      });
  }

  changePassword() {
    if (this.password.newPassword == '') {
      this.toastr.warning("Şifre alanları boş olamaz!", "Dikkat!");
      return;
    }
    if (this.password.newPassword != this.passwordChangeConfirm) {
      this.toastr.warning("Şifre alanları eşleşmedi!", "Dikkat!");
      return;
    }

    Dependency.get(AdminHttp)
      .modifyadminPassword(this.password)
      .subscribe(() => {
        this.route.navigate(['/dash/admins']);
        this.toastr.success("Şifre değiştirme işlemi yapıldı!", "Dikkat!");
      });
  }
}
