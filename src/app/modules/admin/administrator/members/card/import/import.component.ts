import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { lastValueFrom } from 'rxjs';
import { Service } from '../../page.service';
import { CardDetailsComponent } from '../details/details.component';

@Component({
    selector: 'import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
    cardForm: FormGroup;
    fileName: string = '';
    last_row: string = '';
    new_asset: string = '';
    existing: string = '';
    row_error: string = '';
    rows_error: any;

    constructor(
        public matDialogRef: MatDialogRef<CardDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _Service: Service,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.cardForm = this._formBuilder.group({
            id: [null],
        });
    }

    onChange(event: any) {
        const formData = new FormData();
        if (event.target.files[0] != null) {
            this.fileName = event.target.files[0].name;
            formData.append(
                'file',
                event.target.files[0],
                event.target.files[0].name
            );
            this._Service.uploadFile(formData).subscribe((file) => {
                location.reload();
            });
        }
    }

    importData(): void {
        // this._briefService.importOsm(this.cardForm.value)
        //   .subscribe((res) => {
        //     // alert(res.data.error);
        //     this.row_error = res.data.error;
        //     if (this.row_error !== '' && this.row_error != '0') {
        //       this.rows_error = res.data.errors;
        //     } else {
        //       const confirmation = this._fuseConfirmationService.open({
        //         title: "File imported!",
        //         message: "Your choose file imported!",
        //         icon: {
        //           show: false,
        //           name: "heroicons_outline:check-circle",
        //           color: "success"
        //         },
        //         actions: {
        //           confirm: {
        //             show: true,
        //             label: "Confirm",
        //             color: "primary"
        //           },
        //           cancel: {
        //             show: false
        //           }
        //         },
        //         dismissible: true
        //       });
        //       confirmation.afterClosed().subscribe((res) => {
        //         console.log(res);
        //         this.matDialogRef.close(res);
        //       })
        //     }
        //   }, (err: HttpErrorResponse) => {
        //     // console.log(err);
        //     const confirmation = this._fuseConfirmationService.open({
        //       "title": "Someting went wrong!",
        //       "message": err.error.error.message,
        //       "icon": {
        //         "show": false,
        //         "name": "heroicons_outline:emoji-sad",
        //         "color": "warning"
        //       },
        //       "actions": {
        //         "confirm": {
        //           "show": false,
        //           "label": "Confirm",
        //           "color": "primary"
        //         },
        //         "cancel": {
        //           "show": true,
        //           "label": "Close"
        //         }
        //       },
        //       "dismissible": true
        //     });
        //   });
    }
}
