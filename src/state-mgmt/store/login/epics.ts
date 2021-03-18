import { Epic } from 'redux-observable';
import { filter, mapTo } from 'rxjs/operators';
import { ActionType } from 'typesafe-actions';
import { login, logout, loginSuccess, logoutSuccess } from './slice';

import { RootState } from '../index';
// import axios from 'axios';

type SourceActions =
  | typeof login
  | typeof logout
  | typeof loginSuccess
  | typeof logoutSuccess;
type Action = ActionType<SourceActions>;

export const loginEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(filter(login.match), mapTo(loginSuccess()));

export const logoutEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(filter(logout.match), mapTo(logoutSuccess()));
