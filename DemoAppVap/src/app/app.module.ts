import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { DepartmentComponent } from './departments/department/department.component';
import { DepartmentlistComponent } from './departments/departmentlist/departmentlist.component';
import { EmployeelistComponent } from './employees/employeelist/employeelist.component';
import { DepartmentService } from './services/department.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { NotificationsService } from './services/notifications.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DepartmentComponent,
    EmployeeComponent,
    TestcomponentComponent,
    DepartmentlistComponent,
    EmployeelistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DepartmentService, EmployeeService, NotificationsService],
  bootstrap: [AppComponent],
  entryComponents: [DepartmentComponent],
})
export class AppModule { }
