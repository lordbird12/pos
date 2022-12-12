import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTablesResponse } from 'app/shared/datatable.types';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { Admin } from './admin.type';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _httpClient: HttpClient) { }

  getAdminPage(dataTablesParameters: any): Observable<DataTablesResponse> {
    return this._httpClient.post(environment.API_URL + 'api/user_page', dataTablesParameters).pipe(
      switchMap((response: any) => {
        return of(response.data);
      })
    );
  }

  getAdmin(id: any): Observable<Admin> {
    return this._httpClient.get(environment.API_URL + 'api/user/' + id).pipe(
      switchMap((response: any) => {
        return of(response.data);
      })
    );
  }
}
