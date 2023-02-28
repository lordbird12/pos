import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { Service } from '../../members/page.service';
import { AdminService } from '../admin.service';

@Component({
    selector: 'app-admin-detail',
    templateUrl: './admin-detail.component.html',
    styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {

    itemData: any = [];
    formData: FormGroup;
    changePasswordForm: UntypedFormGroup;
    Id: any;
    transections: any[] = [];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _Service: AdminService,
        private _matDialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        public location: Location,
    ) {
    }

    ngOnInit(): void {
        this.formData = this._formBuilder.group({
            user_id: ['', Validators.required],
            name: ['', Validators.required],
            status: [true]
        });

        this.changePasswordForm = this._formBuilder.group({
            password: '',
            confirm_password: '',
        });

        this.Id = this._activatedRoute.snapshot.paramMap.get('id');

        this._Service.getAdmin(this.Id).subscribe(
            (resp: any) => {
                this.itemData = resp;

                this.formData.patchValue({
                    user_id: resp.user_id,
                    name: resp.name,
                    status: resp.status == 'Yes' ? true : false,
                });

                this._Service.getTransactionPage({
                    "member_id": null,
                    "username": resp.user_id,
                    "date_start": null,
                    "date_end": null,
                    "status": null,
                    "draw": 1,
                    "columns": [],
                    "order": [
                        {
                            "column": 0,
                            "dir": "asc"
                        }
                    ],
                    "start": 0,
                    "length": 10000000,
                    "search": {
                        "value": "",
                        "regex": false
                    }
                }).subscribe((res) => {
                    this.transections = res.data
                    this._changeDetectorRef.markForCheck()
                });
            }
        )
    }

    submit() {
        if (this.formData.invalid) {
            return;
        }

        this.formData.patchValue({
            status: this.formData.value.status ? "Yes" : "No"
        });

        this._Service.updateAdmin(this.Id, this.formData.value).subscribe({
            complete() {
                window.location.reload()
            },
        })
    }

    changePassword() {
        this._Service.changePassword(this.Id, this.changePasswordForm.value).subscribe({
            complete() {
                window.location.reload()
            },
        })
    }
}
