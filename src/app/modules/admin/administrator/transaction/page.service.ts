import {
    HttpClient,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpInterceptor,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    filter,
    map,
    Observable,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';
import {
    AssetItem,
    Store,
    AssetType,
    Chat,
    // PermissionProductDetailOSM,
    BranchPagination,
    BranchProduct,
    StoreType,
    AssetSize,
    Supplier,
    Division,
    DataUser,
    DataBank,
} from './page.types';
import { environment } from 'environments/environment';
import { AssetCategory } from 'app/shared/asset-category';
import { DataTablesResponse } from 'app/shared/datatable.types';
// import { UserDetail } from '../user/user.types';
const token = localStorage.getItem('accessToken') || null;
@Injectable({
    providedIn: 'root',
})
export class Service {
    // Private
    private _pagination: BehaviorSubject<BranchPagination | null> =
        new BehaviorSubject(null);
    private _product: BehaviorSubject<BranchProduct | null> =
        new BehaviorSubject(null);
    private _products: BehaviorSubject<BranchProduct[] | null> =
        new BehaviorSubject(null);
    private _list_data: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    httpOptionsFormdata = {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    };

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<BranchPagination> {
        return this._pagination.asObservable();
    }

    /**
     * Getter for product
     */
    get product$(): Observable<BranchProduct> {
        return this._product.asObservable();
    }

    /**
     * Getter for products
     */
    get products$(): Observable<BranchProduct[]> {
        return this._products.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */

    uploadFile(item: FormData): Observable<any> {
        return this._httpClient
            .post<any>(
                environment.API_URL + 'api/upload',
                item,
                this.httpOptionsFormdata
            )
            .pipe(catchError(this.handlerError));
    }
    Z;

    handlerError(error): Observable<never> {
        let errorMessage = 'Error unknown';
        if (error) {
            errorMessage = `${error.error.message}`;
        }
        // window.alert(errorMessage);
        return throwError(errorMessage);
    }

    ///create branch////
    newBank(bank: any): Observable<any> {
        // Throw error, if the user is already logged in
        //  if (this._authenticated) {
        //     return throwError('User is already logged in.');
        // }
        return this._httpClient
            .post(
                environment.API_URL + 'api/bank',
                bank,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    getAll(dataTablesParameters: any): Observable<any> {
        return this._httpClient
            .post<any>(
                `${environment.API_URL}api/branch_page`,
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                map((resp: any) => {
                    return resp;
                })
            );
    }

    // get Users //
    getList(): Observable<any[]> {
        return this._httpClient
            .get<any[]>(environment.API_URL + 'api/get_member')
            .pipe(
                tap((meterial) => {
                    this._list_data.next(meterial);
                })
            );
    }

    //   * get branch by id
    getById(Id: string): Observable<any> {
        return this._httpClient.get<DataBank>(
            environment.API_URL + 'api/member/' + Id
        );
    }

    //   * update branch
    // update(data: any, Id): Observable<any> {
    //     return this._httpClient
    //         .put(
    //             environment.API_URL + 'api/member/' + Id,
    //             data,
    //             this.httpOptionsFormdata
    //         )
    //         .pipe(
    //             switchMap((response: any) => {
    //                 // Return a new observable with the response
    //                 return of(response);
    //             })
    //         );
    // }

    getTransactionPage(
        dataTablesParameters: any
    ): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.API_URL + 'api/bank_trans_page',
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.API_URL + 'api/transection_page',
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    uploadImg(img: FormData): Observable<any> {
        return this._httpClient
            .post(
                environment.API_URL + 'api/upload_images',
                img,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    newTransaction(data: FormData): Observable<DataUser> {
        return this._httpClient.post<DataUser>(
            environment.API_URL + 'api/bank_trans',
            data,
            { headers: this.httpOptionsFormdata.headers }
        );
    }

    updateTransaction(data: FormData): Observable<DataUser> {
        return this._httpClient.post<DataUser>(
            environment.API_URL + 'api/update_bank_trans',
            data,
            { headers: this.httpOptionsFormdata.headers }
        );
    }

    ///create branch////
    new(data: any): Observable<any> {
        // Throw error, if the user is already logged in
        //  if (this._authenticated) {
        //     return throwError('User is already logged in.');
        // }
        return this._httpClient
            .post(
                environment.API_URL + 'api/vendor',
                data,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    ///update ////
    update(data: any): Observable<any> {
        // Throw error, if the user is already logged in
        //  if (this._authenticated) {
        //     return throwError('User is already logged in.');
        // }
        return this._httpClient
            .post(
                environment.API_URL + 'api/update_vendor',
                data,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }
}
