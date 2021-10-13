import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  
  constructor(public _service: DepartmentService, public _dialogRef: MatDialogRef<DepartmentComponent>, 
    public notification: NotificationsService, public _router: Router) { }

  ngOnInit(): void {
  }

  onClose () {
    this._service.form.reset();
    this._service.initializeFormGroup();
    this._dialogRef.close();
    this._service.filter('');
  }

  onClear () {
    this._service.form.reset();
    this._service.initializeFormGroup();
  }

  onSubmit () {
    var odept = new Department();
    odept.deptid = (this._service.form.value["deptid"] == null ||
    this._service.form.value["deptid"] == "") ? 0: this._service.form.value["deptid"];
    odept.deptname = this._service.form.value["deptname"];
    odept.ordno = this._service.form.value["ordno"]

    this._service.insertDepartment(odept).subscribe ((data) => {
      this._service.form.reset();
      this._service.initializeFormGroup();
      this.notification.success("Submitted successfully")
      this.onClose();   
    });


  }
}
