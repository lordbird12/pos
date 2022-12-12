import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';

@Component({
  selector: 'settings-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  files: File[] = [];

  imagePath: string;

  constructor(private _service: SettingService) { }

  ngOnInit(): void {
    this._service.getByKey("WELCOME").subscribe(
      (res) => {
        this.imagePath = res.value;
      })
  }

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  save() {
    this._service.updateByKey("WELCOME", this.files[0]).subscribe((res) => {window.location.reload()});
  }
}
