import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentComponent } from 'src/app/departments/department/department.component';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  imageError!: string;
  isImageSaved!: string;
  cardImageBase64!: string;
  imageURL!: '../../assets/1998614.png';
  empCode!: string;
  department!: any[];


  constructor(public _service: EmployeeService, public _notification: NotificationsService, 
    public _deptservice: DepartmentService, public _dialogRef: MatDialogRef<DepartmentComponent>) { }

  ngOnInit(): void {
    this.getDepartment()
  }

  onClose () {
    this._service.form.reset();
    this._service.initializeFormGroup();
    this._dialogRef.close();
    this._service.filter('');
  }

  onClear () {

  }

  onSubmit () {
    var oemp = new Employee();
    oemp.empid = (this._service.form.value["empid"] == null || this._service.form.value["empid"] == "") ?
    0 : this._service.form.value["empid"];
    oemp.empname = this._service.form.value["empname"];
    oemp.dob = this._service.form.value["dob"];
    oemp.mob = this._service.form.value["mob"];
    oemp.email = this._service.form.value["email"];
    oemp.gender = this._service.form.value["gender"];
    oemp.deptid = this._service.form.value["deptid"];
    oemp.empname = this._service.form.value["empname"];
    oemp.empcode = this._service.form.value["empcode"];
    // let mycurrentDate: Date = new Date();
    // oemp.updon = mycurrentDate.;

    this._service.insertEmloyee(oemp).subscribe(result => {
      console.log('result', result)
      this._service.form.reset();
      this._service.initializeFormGroup();
      this._notification.success("Submitted successfully")
      this.onClose();   
    })
  }

  getDepartment () {
    this._deptservice.getAllDepartment().subscribe(result => {
      this.department = result;
    }, error => {
      console.error(error)
    });
    return this.department;
  }
}
