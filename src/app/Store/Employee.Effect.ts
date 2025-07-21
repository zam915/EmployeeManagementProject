import { inject, Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../service/employee.service';
import {
  addEmployee,
  addEmployeeSuccess,
  deleteEmployee,
  deleteEmployeeSuccess,
  emptyAction,
  loadEmployee,
  loadEmployeeFailure,
  loadEmployeeSuccess,
  updateEmployee,
  updateEmployeeSuccess,
} from './Employee.Action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class empEffect {
  // constructor(private action$: Actions, private service: EmployeeService) {}
  action$ = inject(Actions);
  service = inject(EmployeeService);
  toastr = inject(ToastrService);
  _loadEmployee = createEffect(() =>
    this.action$.pipe(
      ofType(loadEmployee),
      exhaustMap((action) => {
        return this.service.GetAll().pipe(
          map((data) => {
            return loadEmployeeSuccess({ list: data });
          }),
          catchError((err) =>
            of(loadEmployeeFailure({ errorMessage: err.message }))
          )
        );
      })
    )
  );
  _deleteEmployee = createEffect(() =>
    this.action$.pipe(
      ofType(deleteEmployee),
      switchMap((action) => {
        return this.service.Delete(action.empId).pipe(
          switchMap((data) => {
            return of(
              deleteEmployeeSuccess({ empId: action.empId }),
              this.Showalert('Employee Deleted', 'pass')
            );
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        );
      })
    )
  );

  _addEmployee = createEffect(() =>
    this.action$.pipe(
      ofType(addEmployee),
      switchMap((action) => {
        return this.service.Create(action.data).pipe(
          switchMap((data) => {
            return of(
              addEmployeeSuccess({ data: action.data }),
              this.Showalert('Employee created', 'pass')
            );
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        );
      })
    )
  );

  _updateEmployee = createEffect(() =>
    this.action$.pipe(
      ofType(updateEmployee),
      switchMap((action) => {
        return this.service.Update(action.data).pipe(
          switchMap((data) => {
            return of(
              updateEmployeeSuccess({ data: action.data }),
              this.Showalert('Employee updated', 'pass')
            );
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        );
      })
    )
  );

  Showalert(message: string, response: string) {
    if (response == 'pass') {
      this.toastr.success(message);
    } else {
      this.toastr.error(message);
    }
    return emptyAction();
  }
}
