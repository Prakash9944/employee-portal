import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  constructor(private _http: HttpClient) { }

  form: FormGroup = new FormGroup({
    empid: new FormControl(null),
    empcode: new FormControl(''),
    empname: new FormControl('', Validators.required),
    gender: new FormControl(''),
    dob: new FormControl(''),
    mob: new FormControl('', Validators.minLength(8)),
    email: new FormControl('', Validators.email),
    deptid: new FormControl(''),
    deptname: new FormControl(''),
    imgpath: new FormControl(''),
    updby: new FormControl(''),
    updon: new FormControl(''),
    photoimg: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      empid: '',
      empcode: '',
      empname: '',
      gender: '',
      dob: '',
      mob: '',
      email: '',
      deptid: '',
      deptname: '',
      imgpath: '',
      updby: '',
      updon: '',
      photoimg: '',
    });
  }

  populateForm (employee: any) {
    var dateOfBirth: Date = new Date(employee.dob);
    employee.dob = dateOfBirth;
    console.log(employee)
    this.form.setValue(employee);
  }

  getAllEmployee (): Observable<any> {
    return this._http.get("http://localhost:5000/api/employee/getAllEmployee");
  }

  insertEmloyee (Emloyee: Employee): Observable<any>  {
    const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})}
    return this._http.post("http://localhost:5000/api/employee/addEmployee", Emloyee, httpOptions);
  }

  updateEmployee (Emloyee: Employee): Observable<any>  {
    const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})}
    return this._http.put("http://localhost:5000/api/employee/updateEmployee", Emloyee, httpOptions);
  }

  deleteEmployee (id: number): Observable<any>  {
    return this._http.delete("http://localhost:5000/api/employee/deleteEmployee/"+ id)
  }

    //Refersh grid tables
    private _listners = new Subject<any>();
    listen(): Observable<any>  {
      return this._listners.asObservable();
    }
  
    filter (filterBy: string) {
      this._listners.next(filterBy)
    }

}
