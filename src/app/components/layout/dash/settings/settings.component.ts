import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Settings from 'src/app/@core/models/settings';
import { SettingsHttp } from './settings-http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings = new Settings();

  constructor(
    private toastr: ToastrService,
    private settingsHttp: SettingsHttp
  ) { }

  ngOnInit(): void {
    this.getCurrentSettings();
  }

  /**
   * Get
   */
  getCurrentSettings() {
    this.settingsHttp.getCurrentSettings()
      .subscribe((settings: Settings) => {
        this.settings = settings;
      });
  }

  /**
   * Upsert
   */
  upsertCurrentSettings() {
    this.settingsHttp.upsertCurrentSettings(this.settings)
      .subscribe(() => {
        this.toastr.success("Ayarlar kaydedildi!", "Dikkat!");
      });
  }
}
