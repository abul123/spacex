import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
public url : string = "https://api.spacexdata.com/v2/launches";

  constructor(private httpClient: HttpClient) { }
  getSpacexData(): Observable<any> {
    return this.httpClient.get<Observable<any>>(this.url);
  }
}
