import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseValidators } from '@fuse/validators';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-new',
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.scss']
})
export class AdminNewComponent implements OnInit {

    formData: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _Service: AdminService,
    public location: Location,
  ) { }

  ngOnInit(): void {
    this.formData = this._formBuilder.group({
        user_id: ['', Validators.required],
        name: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
        status: [true],
        permission_id: [1]
    },{
        validators: FuseValidators.mustMatch('password', 'passwordConfirm')
    });
  }

  submit(){
    if (this.formData.invalid) {
        return
    }

    this._Service.createAdmin(this.formData.value).subscribe({
        complete:() => {
            this.location.back();
        },
    })
  }
}
