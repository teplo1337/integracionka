import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationsService {

  constructor(public httpClient: HttpClient) { }

  getLocation(params) {
    return this.httpClient.get('/api/', {params});
  }
}
