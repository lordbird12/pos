import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private _httpClient: HttpClient) { }

  getByKey(key: string): Observable<any> {
    return this._httpClient.post(environment.API_URL + 'api/get_env_by_key', { "key": key }).pipe(
      switchMap((response: any) => {
        return of(response.data);
      })
    );
  }

  updateByKey(key: any, value: any): Observable<any> {

    const formData = new FormData()
    formData.append('key', key);
    formData.append('value', value);

    return this._httpClient.post(environment.API_URL + 'api/update_by_key', formData).pipe(
      switchMap((response: any) => {
        return of(response.data);
      })
    );
  }
}
