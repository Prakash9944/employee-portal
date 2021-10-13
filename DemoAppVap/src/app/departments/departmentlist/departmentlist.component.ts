import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { DepartmentComponent } from '../department/department.component';


@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.css']
})
export class DepartmentlistComponent implements OnInit {

  constructor(private _service: DepartmentService, public _notification: NotificationsService, public _dialog: MatDialog,
    public _router: Router) {
      this._service.listen().subscribe(m => {
        this.fillGrid();
      });
     }
  
  grdlistData!: MatTableDataSource<any>;
  displayedColumns: string [] = ['deptid', 'deptname', 'ordno', 'actions'];
  @ViewChild(MatSort) sort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string ;

  ngOnInit(): void {
    this.fillGrid()
  }

  fillGrid() {
    this._service.getAllDepartment()
    .subscribe(response => {
        this.grdlistData = new MatTableDataSource(response);
        this.grdlistData.sort = this.sort;

    }, (err) => {
        console.log("err", err)
    });
  }

  applyFilter() {
    this.grdlistData.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  onDelete (id: any) {
    this._service.deleteDepartment(id).subscribe( (result) => {
      this._notification.warn('You clicked Delete!');
    }); 
  }

  onEdit (row: any) {
    this._service.updateDepartment(row).subscribe(() => {
      this._notification.success('You clicked Edit!');
    });    
  }

  onCreate () {
    this._service.getDepartmentMaxOrdNo()
    .subscribe(data =>  {
      this._service.MaxOrdNo = 1;
      this._service.initializeFormGroup();
    });
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";

    this._dialog.open(DepartmentComponent, dialogConfig);
    this._router.onSameUrlNavigation = 'reload';
    // this._router.
    
  }
}
