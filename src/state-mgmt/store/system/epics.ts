import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import {
  mergeMap,
  startWith,
  filter,
  map,
  catchError,
  tap,
} from 'rxjs/operators';
import { ActionType } from 'typesafe-actions';

import {
  start,
  fail,
  getInfo,
  getInfoSuccess,
  addInfo,
  addInfoSuccess,
  editInfo,
  editInfoSuccess,
  deleteInfo,
  deleteInfoSuccess,
  completeInfo,
  completeInfoSuccess,
  paramsInfo,
  paramsInfoSuccess,
  paramsInfoAdd,
  paramsInfoAddSuccess,
} from './slice';

import { RootState, store } from '../index';
import {
  getInfoReq,
  addInfoReq,
  completeInfoReq,
  deleteInfoReq,
  editInfoReq,
  paramsInfoReq,
  paramsInfoAddReq,
} from '../../../services/api/api';

type SourceActions =
  | typeof start
  | typeof fail
  | typeof getInfo
  | typeof getInfoSuccess
  | typeof addInfo
  | typeof addInfoSuccess
  | typeof editInfo
  | typeof editInfoSuccess
  | typeof deleteInfo
  | typeof deleteInfoSuccess
  | typeof completeInfo
  | typeof completeInfoSuccess
  | typeof paramsInfo
  | typeof paramsInfoSuccess
  | typeof paramsInfoAdd
  | typeof paramsInfoAddSuccess;
type Action = ActionType<SourceActions>;

const username = sessionStorage.getItem('usertoken');
const params = window.location.pathname.slice(1);

export const getInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(getInfo.match),
    mergeMap((action) =>
      from(getInfoReq(action.payload)).pipe(
        map((response) => getInfoSuccess(response.data)),
        startWith(start()),
        catchError(() => of(fail()))
      )
    )
  );

export const addInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(addInfo.match),
    mergeMap((action) =>
      from(addInfoReq(action.payload)).pipe(
        map((response) => addInfoSuccess(response.data)),
        startWith(start()),
        catchError(() => of(fail()))
      )
    ),
    tap(() => store.dispatch(getInfo(username)))
  );

export const completeInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(completeInfo.match),
    mergeMap((action) =>
      from(completeInfoReq(action.payload)).pipe(
        map((response) => completeInfoSuccess(response)),
        startWith(start()),
        catchError(() => of(fail()))
      )
    ),
    tap(() => store.dispatch(getInfo(username))),
    tap(() => store.dispatch(paramsInfo(params)))
  );

export const editInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(editInfo.match),
    mergeMap((action) =>
      from(editInfoReq(action.payload)).pipe(
        map((response) => editInfoSuccess(response)),
        startWith(start()),
        catchError(() => of(fail()))
      )
    ),
    tap(() => store.dispatch(getInfo(username))),
    tap(() => store.dispatch(paramsInfo(params)))
  );

export const deleteInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(deleteInfo.match),
    mergeMap((action) =>
      from(deleteInfoReq(action.payload)).pipe(
        map((response) => deleteInfoSuccess(response)),
        startWith(start()),
        catchError(() => of(fail()))
      )
    ),
    tap(() => store.dispatch(getInfo(username))),
    tap(() => store.dispatch(paramsInfo(params)))
  );

export const paramsInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(paramsInfo.match),
    mergeMap((action) =>
      from(paramsInfoReq(action.payload)).pipe(
        map((response) => paramsInfoSuccess(response)),
        startWith(start()),
        catchError(() => of(fail()))
      )
    )
  );

export const paramsInfoAddEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(paramsInfoAdd.match),
    mergeMap((action) =>
      from(paramsInfoAddReq(action.payload)).pipe(
        map((response) => paramsInfoAddSuccess(response)),
        startWith(start()),
        catchError(() => of(fail()))
      )
    ),
    tap(() => store.dispatch(paramsInfo(params)))
  );
