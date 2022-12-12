import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SettingService } from '../setting.service';

@Component({
  selector: 'settings-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _service: SettingService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      value: [],
    });

    this._service.getByKey("MERCHANTID").subscribe((res) => {
      this.form.patchValue({
        value: res.value
      })
    })
  }

  save(){
    this._service.updateByKey("MERCHANTID", this.form.value.value).subscribe((res) => {
      window.location.reload();
    })
  }

}
