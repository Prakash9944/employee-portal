import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './departments/department/department.component';
import { DepartmentlistComponent } from './departments/departmentlist/departmentlist.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeelistComponent } from './employees/employeelist/employeelist.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';

const routes: Routes = [
  {path: "", component: EmployeeComponent}, 
  // {path: "", component: TestcomponentComponent}, 
  {path: "dashboard", component: DashboardComponent},
  {path: "department", component: DepartmentComponent},
  {path: "employee", component: EmployeeComponent},
  {path: "departmentlist", component: DepartmentlistComponent},
  {path: "employeelist", component: EmployeelistComponent}, 
  {path: "testcomponent", component: TestcomponentComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
