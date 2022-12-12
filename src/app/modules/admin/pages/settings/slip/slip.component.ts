import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SettingService } from '../setting.service';

@Component({
  selector: 'settings-slip',
  templateUrl: './slip.component.html',
  styleUrls: ['./slip.component.scss']
})
export class SlipComponent implements OnInit {

  companyForm: UntypedFormGroup;
  addressForm: UntypedFormGroup;
  headerForm: UntypedFormGroup;
  files: File[] = [];
  imagePath: string;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _service: SettingService,
  ) { }

  ngOnInit(): void {
    this.companyForm = this._formBuilder.group({
      value: ['']
    });
    this.addressForm = this._formBuilder.group({
      value: ['']
    });
    this.headerForm = this._formBuilder.group({
      value: ['']
    });

    this._service.getByKey("COMPANY").subscribe(
      (res) => {
        this.companyForm.patchValue({
          value: res.value
        })
      }
    );

    this._service.getByKey("ADDRESS").subscribe(
      (res) => {
        this.addressForm.patchValue({
          value: res.value
        })
      }
    );

    this._service.getByKey("LOGO").subscribe(
      (res) => {
        this.imagePath = res.value
      }
    );

    this._service.getByKey("HEADER").subscribe(
      (res) => {
        this.headerForm.patchValue({
          value: res.value
        })
      }
    );


  }

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  saveLogo() {
    this._service.updateByKey("LOGO", this.files[0]).subscribe((res) => {window.location.reload()});
   }

  saveCompany() {
    this._service.updateByKey("COMPANY", this.companyForm.value.value).subscribe((res) => {window.location.reload()});
  }

  saveAddress() {
    this._service.updateByKey("ADDRESS", this.addressForm.value.value).subscribe((res) => {window.location.reload()});
  }

  saveHeader() {
    this._service.updateByKey("HEADER", this.headerForm.value.value).subscribe((res) => {window.location.reload()});
  }
}
