import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public version?: string;
  public apiEndpoint?: string;
  public socketEndpoint?: string;

  constructor(private http: HttpClient) { }

  load(): Promise<any> {
    let promise: any;

    if (!environment.production) {
      promise = this.http.get('assets/config/config.json')
        .toPromise()
        .then(data => {
          Object.assign(this, data);
          return data;
        });

    }
    return promise;
  }
}
