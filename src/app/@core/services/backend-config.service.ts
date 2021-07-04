import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendConfigService {

  constructor() { }

 // private address: string = 'http://localhost:5005';
  private address: string = 'http://192.168.1.33:1000';

  public getUrl(): string {
    return this.address;
  }
}
