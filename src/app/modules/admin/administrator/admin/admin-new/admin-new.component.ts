import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseValidators } from '@fuse/validators';

@Component({
  selector: 'app-admin-new',
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.scss']
})
export class AdminNewComponent implements OnInit {

    formData: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public location: Location,
  ) { }

  ngOnInit(): void {
    this.formData = this._formBuilder.group({
        user_id: ['', Validators.required],
        name: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
        status: [true],
    },{
        validators: FuseValidators.mustMatch('password', 'passwordConfirm')
    });
  }

  submit(){}
}
