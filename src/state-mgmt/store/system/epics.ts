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
  getInfo,
  getInfoStart,
  getInfoSuccess,
  getInfoFailed,
  addInfo,
  addInfoStart,
  addInfoSuccess,
  addInfoFailed,
  editInfo,
  editInfoStart,
  editInfoSuccess,
  editInfoFailed,
  deleteInfo,
  deleteInfoStart,
  deleteInfoSuccess,
  deleteInfoFailed,
  completeInfo,
  completeInfoStart,
  completeInfoSuccess,
  completeInfoFailed,
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
  | typeof getInfoStart
  | typeof getInfoSuccess
  | typeof getInfoFailed
  | typeof addInfoStart
  | typeof addInfoSuccess
  | typeof addInfoFailed
  | typeof editInfoStart
  | typeof editInfoSuccess
  | typeof editInfoFailed
  | typeof deleteInfoStart
  | typeof deleteInfoSuccess
  | typeof deleteInfoFailed
  | typeof completeInfoStart
  | typeof completeInfoSuccess
  | typeof completeInfoFailed;
type Action = ActionType<SourceActions>;

export const getInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(getInfo.match),
    mergeMap(() =>
      from(getInfoReq()).pipe(
        map((response) => getInfoSuccess(response.data)),
        startWith(getInfoStart()),
        catchError(() => of(getInfoFailed()))
      )
    )
  );

export const addInfoEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(addInfo.match),
    mergeMap((action) =>
      from(addInfoReq(action.payload)).pipe(
        map((response) => addInfoSuccess(response.data)),
        startWith(addInfoStart()),
        catchError(() => of(addInfoFailed()))
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
        startWith(completeInfoStart()),
        catchError(() => of(completeInfoFailed()))
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
        startWith(editInfoStart()),
        catchError(() => of(editInfoFailed()))
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
        startWith(deleteInfoStart()),
        catchError(() => of(deleteInfoFailed()))
      )
    ),
    tap(() => store.dispatch(getInfo()))
  );
