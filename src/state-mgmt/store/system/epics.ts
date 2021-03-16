import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import {
  mergeMap,
  startWith,
  filter,
  map,
  catchError,
  // mergeMapTo,
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
} from './slice';

import { RootState, store } from '../index';
// import axios from 'axios';
import {
  getInfoReq,
  addInfoReq,
  completeInfoReq,
  deleteInfoReq,
  editInfoReq,
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
  | typeof completeInfoSuccess;
type Action = ActionType<SourceActions>;

export const getInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(getInfo.match),
    mergeMap(() =>
      from(getInfoReq()).pipe(
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
    tap(() => store.dispatch(getInfo()))
    // mergeMapTo([getInfoStart()])
  );

export const completeInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(completeInfo.match),
    mergeMap((action) =>
      from(
        // axios.post(
        //   `http://localhost:5000/progress/complete/${action.payload._id}`,
        //   {
        //     completed: action.payload.completed,
        //   }
        // )
        completeInfoReq(action.payload)
      ).pipe(
        map((response) => completeInfoSuccess(response)),
        startWith(start()),
        catchError(() => of(fail()))
      )
    ),
    tap(() => store.dispatch(getInfo()))
  );

export const editInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(editInfo.match),
    mergeMap((action) =>
      from(
        // axios.post(
        //   `http://localhost:5000/progress/update/${action.payload._id}`,
        //   {
        //     title: action.payload.title,
        //   }
        // )
        editInfoReq(action.payload)
      ).pipe(
        map((response) => editInfoSuccess(response)),
        startWith(start()),
        catchError(() => of(fail()))
      )
    ),
    tap(() => store.dispatch(getInfo()))
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
    tap(() => store.dispatch(getInfo()))
  );
