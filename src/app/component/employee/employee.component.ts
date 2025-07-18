import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../service/employee.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private service: EmployeeService) {}

  empList: Employee[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'doj',
    'role',
    'salary',
    'actions',
  ];
  dataSource!: MatTableDataSource<Employee>;
  subscription = new Subscription();
  ngOnInit(): void {
    this.GetAllEmployee();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  GetAllEmployee() {
    let sub = this.service.GetAll().subscribe((item) => {
      this.empList = item;
      this.dataSource = new MatTableDataSource<Employee>(this.empList);
    });
    this.subscription.add(sub);
  }
  AddEmployee() {
    // Logic to add an employee will go here
    this.OpenPopup(0);
  }
  DeleteEmployee(empId: number) {
    if (confirm('Are You Sure?')) {
      let sub = this.service.Delete(empId).subscribe((item) => {
        this.GetAllEmployee();
      });
      this.subscription.add(sub);
    }
  }
  EditEmployee(empId: number) {
    this.OpenPopup(empId);
  }
  OpenPopup(empId: number) {
    this.dialog
      .open(AddEmployeeComponent, {
        width: '50%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
        data: {
          code: empId,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        this.GetAllEmployee();
      });
  }
}
