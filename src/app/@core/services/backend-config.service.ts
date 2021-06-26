import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendConfigService {

  constructor() { }

  private address: string = 'http://localhost:5001';

  public getUrl(): string {
    return this.address;
  }
}
