import { Component, OnInit } from '@angular/core';
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
        console.log(this.settings);
      });
  }

  /**
   * Upsert
   */
  upsertCurrentSettings() {
    this.settingsHttp.upsertCurrentSettings(this.settings)
      .subscribe(() => { });
  }
}
