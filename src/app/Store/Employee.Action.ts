import { createAction, props } from '@ngrx/store';
import { Employee } from '../model/Employee';

export const LOAD_EMPLOYEE = 'employee get all';
export const LOAD_EMPLOYEE_SUCCESS = 'employee get all success';
export const LOAD_EMPLOYEE_FAILURE = 'employee get all failure';
const loadEmployee = createAction(LOAD_EMPLOYEE);
const loadEmployeeSuccess = createAction(
  LOAD_EMPLOYEE_SUCCESS,
  props<{ list: Employee[] }>()
);
const loadEmployeeFailure = createAction(
  LOAD_EMPLOYEE_FAILURE,
  props<{ errorMessage: string }>()
);
