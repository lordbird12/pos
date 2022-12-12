import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dataRow: any[];
  isLoading: boolean = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _service: AdminService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      responsive: true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
      },
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.status = 'Yes';
        that._service
          .getAdminPage(dataTablesParameters)
          .subscribe((resp) => {
            this.dataRow = resp.data;

            callback({
              recordsTotal: resp.total,
              recordsFiltered: resp.total,
              data: [],
            });
            this._changeDetectorRef.markForCheck();
          });
      },
      columns: [
        { data: 'No' },
        { data: 'user_id' },
        { data: 'name' },
        { data: 'status' },
        { data: 'actice', orderable: false },
      ],
    };
  }

  edit(id: string): void {
    this._router.navigate(['admin/detail/' + id]);
}
}
