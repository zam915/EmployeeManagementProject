import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EmployeeService } from '../service/employee.service';

@Injectable()
export class empEffect {
  constructor(private action$: Actions, private service: EmployeeService) {}
}
