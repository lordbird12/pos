import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import * as moment from 'moment';
import { assign, startCase } from 'lodash-es';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Service } from '../../page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
    selector: 'card-details',
    templateUrl: './details.component.html',
    styles: [
        /* language=SCSS */
        `
            table {
                width: 100%;
            }

            .mat-dialog-container {
                border-radius: 5px !important;
            }

            table td {
                text-align: left;
            }

            .td-left {
                width: 250px;
            }

            .bg-gray-50 {
                background: #feedee !important;
                font-weight: bold !important;
                padding: 5px;
            }

            .mat-dialog-container {
                border-radius: 0px !important;
            }
        `,
    ],
    // encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
    approveForm: FormGroup;
    files: File[] = [];
    transFile: any = null;
    hasTrans: boolean = false;
    hasReject: boolean = false;
    fileUpload: string = 'Upload Artwork';
    fileUploadData: any;
    me: any;
    env_path = environment.API_URL;
    index_trans: any;
    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    selectedProduct: any;
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<CardDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _service: Service,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Prepare the search form with defaults
        // this.index_trans = this.selectedProduct.attributes.brief_translation_files.data[this.selectedProduct.attributes.brief_translation_files.data.length].attributes.file.data.attributes.url
        // this.approveForm.get('translation_cost').patchValue(this.selectedProduct.attributes.translation_cost);
        // console.log(this.selectedProduct);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onChange(event) {
        const formData = new FormData();
        formData.append(
            'files',
            event.target.files[0],
            event.target.files[0].name
        );
        this._service.uploadFile(formData).subscribe((file) => {
            this.fileUpload = file[0].name;
            this.fileUploadData = file[0];
            // console.log(file);
        });
    }

    onSelect(event) {
        // console.log(event);
        this.files.push(...event.addedFiles);

        const formData = new FormData();

        for (var i = 0; i < this.files.length; i++) {
            //   formData.append("file[]", this.files[i]);
            formData.append('files', this.files[i], this.files[i].name);
        }

        this._service.uploadFile(formData).subscribe((file) => {
            // console.log(file);
            this.transFile = file[0];
            this.hasTrans = true;
            // console.log(this.hasTrans);
        });
    }

    cancelReject(): void {
        this.hasReject = false;
    }

    confirmApprove(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Approve this translation?',
            message: 'Are you sure approve this translation file ?',
            icon: {
                show: false,
                name: 'heroicons_outline:exclamation',
                color: 'success',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Confirm',
                    color: 'accent',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                let approve_trans = [];

                const user = JSON.parse(localStorage.getItem('user')) || null;

                approve_trans.push({
                    data: {
                        approve: true,
                        reject_reason: '',
                    },
                });
            }
        });
    }

    rejectApprove(): void {
        if (this.hasReject) {
            if (this.approveForm.get('reject').invalid) {
                return;
            }

            // Open the confirmation dialog
            const confirmation = this._fuseConfirmationService.open({
                title: 'Confirm reject translation!',
                message: 'Are you confirm reject this file ?',
                icon: {
                    show: false,
                    name: 'heroicons_outline:exclamation',
                    color: 'success',
                },
                actions: {
                    confirm: {
                        show: true,
                        label: 'Confirm',
                        color: 'primary',
                    },
                    cancel: {
                        show: true,
                        label: 'Cancel',
                    },
                },
                dismissible: true,
            });

            // Subscribe to the confirmation dialog closed action
            confirmation.afterClosed().subscribe((result) => {
                // If the confirm button pressed...
                if (result === 'confirmed') {
                    let approve_trans_file = [];
                    const user =
                        JSON.parse(localStorage.getItem('user')) || null;

                    approve_trans_file.push({
                        data: {
                            reason: this.approveForm.value.reject,
                            file:
                                this.fileUploadData === undefined
                                    ? null
                                    : this.fileUploadData.id,
                            new: true,
                            // createdBy: user.id,
                        },
                    });

                    const approve_trans = {
                        data: {
                            status: 'rejected_translation',
                            brief_translation_file: approve_trans_file,
                        },
                    };
                }
            });
        } else {
            this.hasReject = true;
        }
    }

    importData(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Confirm import data!',
            message: 'Are you confirm import this file ?',
            icon: {
                show: false,
                name: 'heroicons_outline:exclamation',
                color: 'success',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Confirm',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // this._service.import({ id: "" }, 'production_list').subscribe((res) => {
                //     const confirmation = this._fuseConfirmationService.open({
                //         "title": "Import success!",
                //         "message": "Import success!",
                //         "icon": {
                //             "show": false,
                //             "name": "heroicons_outline:check-circle",
                //             "color": "success"
                //         },
                //         "actions": {
                //             "confirm": {
                //                 "show": true,
                //                 "label": "Confirm",
                //                 "color": "primary"
                //             },
                //             "cancel": {
                //                 "show": true,
                //                 "label": "Cancel"
                //             }
                //         },
                //         "dismissible": true
                //     });
                //     // Subscribe to the confirmation dialog closed action
                //     confirmation.afterClosed().subscribe((result) => {
                //         // If the confirm button pressed...
                //         if (result === 'confirmed') {
                //             this._router.navigate(['marketing/data/new-item-list-checking']);
                //         }
                //     });
                // });
            }
        });
    }

    textStatus(status: string): string {
        let _status = status;
        return startCase(_status);
    }
}
