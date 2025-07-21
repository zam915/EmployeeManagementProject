import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from '../../Store/Employee.Action';
import { selectEmployee } from '../../Store/Employee.Selector';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  // constructor(
  //   private service: EmployeeService,
  //   private ref: MatDialogRef<AddEmployeeComponent>,
  //   private toastr: ToastrService,
  //   @Inject(MAT_DIALOG_DATA) public data: any
  // ) {}

  constructor(
    private store: Store,
    private ref: MatDialogRef<AddEmployeeComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  title = 'Add Employee';
  dialogdata: any;
  isEdit = false;
  roles = ['Developer', 'Tester', 'Manager', 'HR'];
  ngOnInit(): void {
    this.dialogdata = this.data;
    if (this.dialogdata.code > 0) {
      this.title = 'Edit Employee';
      this.isEdit = true;
      this.store.dispatch(getEmployee({ empId: this.dialogdata.code }));
      this.store.select(selectEmployee).subscribe((item) => {
        let _data = item;
        if (_data !== null) {
          this.empForm.setValue({
            id: _data.id,
            name: _data.name,
            doj: _data.doj,
            role: _data.role,
            salary: _data.salary,
          });
        }
      });
      // this.service.Get(this.dialogdata.code).subscribe((item) => {
      //   let _data = item;
      //   if (_data !== null) {
      //     this.empForm.setValue({
      //       id: _data.id,
      //       name: _data.name,
      //       doj: _data.doj,
      //       role: _data.role,
      //       salary: _data.salary,
      //     });
      //   }
      // });
    }
  }

  empForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
  });

  SaveEmployee() {
    if (this.empForm.valid) {
      // console.log('Employee Data:', this.empForm.value);
      let _data: Employee = {
        id: this.empForm.value.id as number,
        name: this.empForm.value.name as string,
        doj: new Date(this.empForm.value.doj as Date),
        role: this.empForm.value.role as string,
        salary: this.empForm.value.salary as number,
      };
      if (!this.isEdit) {
        // this.service.Update(_data).subscribe((item) => {
        //   this.toastr.success('Employee Updated Successfully', 'Updated');
        //   this.closePopUp();
        // });
        this.store.dispatch(addEmployee({ data: _data }));
      } else {
        // this.service.Create(_data).subscribe((item) => {
        //   this.toastr.success('Employee Created Successfully', 'Success');
        //   this.closePopUp();
        // });
        this.store.dispatch(updateEmployee({ data: _data }));
      }
      this.closePopUp();
    } else {
      console.error('Form is invalid');
      this.empForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
    }
  }
  closePopUp() {
    this.ref.close();
  }
}
