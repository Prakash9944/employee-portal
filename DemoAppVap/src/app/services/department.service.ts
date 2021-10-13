import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Department } from '../models/department.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _http: HttpClient) { }
  MaxOrdNo: number = 0;

  form: FormGroup = new FormGroup({
    deptid: new FormControl(null),
    deptname: new FormControl('', Validators.required),
    ordno: new FormControl('', Validators.required),
    mstatus: new FormControl(''),
    updby: new FormControl(''),
    updon: new FormControl(''), 
  });

  populateForm (department: any) {
    this.form.setValue(department)
  }

  initializeFormGroup() {
    this.form.setValue({
      deptid: 0,
      deptname: '',
      ordno: this.MaxOrdNo,
      mstatus: '',
      updby: '',
      updon: '',
    });
  }

  getAllDepartment(): Observable<any> {
    return this._http.get("http://localhost:5000/api/department/GetAllDepartment");
  }

  getDepartmentMaxOrdNo(): Observable <number> {
    return this._http.get<number>("http://localhost:5000/api/department/GetDepartmentMaxOrdNo");
  }

  insertDepartment (department: Department): Observable<any>  {
    const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})}
    return this._http.post("http://localhost:5000/api/department/insertDepartment", department, httpOptions);
  }

  updateDepartment (department: Department): Observable<any>  {
    const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})}
    return this._http.put("http://localhost:5000/api/department/updateDepartment", department, httpOptions);
  }

  deleteDepartment (id: number): Observable<any>  {
    return this._http.delete("http://localhost:5000/api/department/deleteDepartment/"+ id)
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
 