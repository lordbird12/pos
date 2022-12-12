import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  Id: any;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: FormBuilder,
    private _Service: AdminService,
    private _matDialog: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.formData = this._formBuilder.group({
      user_id: [''],
      name: [''],
      transections: this._formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.Id = this._activatedRoute.snapshot.paramMap.get('id');

    this._Service.getAdmin(this.Id).subscribe(
      (resp: any) => {
        this.itemData = resp;
        this.itemData.transections = [];

        this.formData.patchValue({
          user_id: resp.user_id,
          name: resp.name,
          transections: [],
        });
      }
    )
  }

}
