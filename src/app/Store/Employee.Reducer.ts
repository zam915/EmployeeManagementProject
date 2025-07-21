import { createReducer, on } from '@ngrx/store';
import { employeeState } from './Employee.State';
import {
  addEmployeeSuccess,
  deleteEmployeeSuccess,
  getEmployee,
  loadEmployeeFailure,
  loadEmployeeSuccess,
  updateEmployeeSuccess,
} from './Employee.Action';

const _employeeReducer = createReducer(
  employeeState,
  on(loadEmployeeSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errorMessage: '',
    };
  }),
  on(loadEmployeeFailure, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(deleteEmployeeSuccess, (state, action) => {
    const _newdata = state.list.filter((o) => o.id != action.empId);
    return {
      ...state,
      list: _newdata,
      errorMessage: '',
    };
  }),
  on(addEmployeeSuccess, (state, action) => {
    const _newdata = { ...action.data };
    return {
      ...state,
      list: [...state.list, _newdata],
      errorMessage: '',
    };
  }),
  on(updateEmployeeSuccess, (state, action) => {
    const _newdata = state.list.map((o) => {
      return o.id === action.data.id ? action.data : o;
    });
    return {
      ...state,
      list: _newdata,
      errorMessage: '',
    };
  }),
  on(getEmployee, (state, action) => {
    let _newdata = state.list.find((o) => o.id === action.empId);
    if (_newdata == null) {
      _newdata = state.empobj;
    }
    return {
      ...state,
      empobj: _newdata,
    };
  })
);
export function employeeReducer(state: any, action: any) {
  return _employeeReducer(state, action);
}
