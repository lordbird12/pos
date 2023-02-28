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

    getTransactionPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.API_URL + 'api/transection_page',
                dataTablesParameters,
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    createAdmin(data: any) {
        return this._httpClient.post(environment.API_URL + 'api/user', data);
    }

    updateAdmin(id: number, data: any) {
        data = {
            ...data,
            id: +id,
        }
        return this._httpClient.post(environment.API_URL + 'api/update_user', data);
    }

    changePassword(id: number, data: any){
        return this._httpClient.put(environment.API_URL + 'api/update_password_user/' + id, data);
    }

    deleteAdmin(id: number) {
        return this._httpClient.delete(environment.API_URL + 'api/user/' + id);
    }
}
