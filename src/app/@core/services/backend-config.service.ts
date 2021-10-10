import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendConfigService {

  constructor() { }

  public getUrl(): string {
    const api = environment.apiUrl;
    return api;
  }
}
