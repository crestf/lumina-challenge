import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';


import { Observable } from 'rxjs';

@Injectable()
export class NetworkService {

  constructor(protected http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(url);
  }
}
