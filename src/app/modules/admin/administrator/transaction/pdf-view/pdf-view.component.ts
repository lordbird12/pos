import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Service } from '../page.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pdf-view',
    templateUrl: './pdf-view.component.html',
    styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {

    show: boolean = false;
    users$: Observable<any>;
    pdfSrc: any = {
        // url: 'https://huawei-pos-gateway.ddns.net/api/public/api/report_machine_topup_PDF?date_start=2019-01-01&date_end=2026-01-01&create_by=admin',
        // withCredentials: true,
        // httpHeaders: {}
    }

    create_by: FormControl = new FormControl(null);

    start = new FormControl(null);
    end = new FormControl(null);

    constructor(
        private _Service: Service,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this.users$ = this._Service.getUser();
    }

    view() {
        const start = moment(this.start.value).format("YYYY-MM-DD");
        const end = moment(this.end.value).format("YYYY-MM-DD");

        this.show = true;
        this.pdfSrc = {
            url: `https://huawei-pos-gateway.ddns.net/api/public/api/report_machine_topup_PDF?date_start=${start}&date_end=${end}&create_by=${this.create_by.value}`,
            // withCredentials: true,
            httpHeaders: {}
        }
    }

    save() {
        window.open(this.pdfSrc.url, "_blank");
    }
}
