import { createReducer } from '@ngrx/store';
import { employeeState } from './Employee.State';

const _employeeReducer = createReducer(employeeState);
export function employeeReducer(state: any, action: any) {
  return _employeeReducer(state, action);
}
