import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  
  grdlistData!: MatTableDataSource<any>;
  displayedColumns: string [] = ['empid','empcode', 'empname', 'dob', 'mob', 'email', 'deptname', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string ;

  constructor(public _service: EmployeeService, private _dialog: MatDialog, 
    public _notification: NotificationsService) {
      this._service.listen().subscribe(res => {
        this.fillGrid();
      });
  }

  ngOnInit(): void {
    this.fillGrid();
  }

  fillGrid () {
    this._service.getAllEmployee().subscribe(response => {
      this.grdlistData = new MatTableDataSource(response);
      this.grdlistData.sort = this.sort;
      this.grdlistData.paginator = this.paginator;
    });
  }

  applyFilter() {
    this.grdlistData.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  onCreate () {
    this._service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";

    this._dialog.open(EmployeeComponent, dialogConfig);
  }

  onDelete (empId: any) {
    this._service.deleteEmployee(empId).subscribe(res => {
      this._notification.warn('Deleted Successfully!');
      this._service.filter('');
    });
  }
}
