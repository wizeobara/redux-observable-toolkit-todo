import systemReducer, {
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
} from './system/slice';
import userReducer, { login, loginSuccess, logout } from './login/slice';
import { compose, createStore, applyMiddleware } from 'redux';
import {
  combineReducers,
  // configureStore,
} from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
  getInfoEpic,
  addInfoEpic,
  completeInfoEpic,
  deleteInfoEpic,
  editInfoEpic,
  paramsInfoEpic,
} from './system/epics';
import { loginEpic, logoutEpic } from './login/epics';
import { ActionType } from 'typesafe-actions';
import {
  connectRouter,
  // routerMiddleware,
  RouterState,
} from 'connected-react-router';

type SystemActionsWithPayload =
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
  | typeof paramsInfoSuccess;
type LoginActionsWithPayload = typeof login | typeof logout | typeof loginSuccess;

type SystemActions = ActionType<SystemActionsWithPayload>;
type LoginActions = ActionType<LoginActionsWithPayload>;
type finalActions = SystemActions | LoginActions;

const epics = combineEpics(
  getInfoEpic,
  addInfoEpic,
  completeInfoEpic,
  deleteInfoEpic,
  editInfoEpic,
  paramsInfoEpic,
  loginEpic,
  logoutEpic
);

export const history = createBrowserHistory<RouterState>();
export const rootReducer = combineReducers({
  router: connectRouter(history),
  system: systemReducer,
  user: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const epicMiddleware = createEpicMiddleware<
  finalActions, // input actions
  finalActions, // output actions
  RootState
>();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// function configureAppStore(initialState?: any) {
//   // configure middlewares
//   const middlewares = [routerMiddleware(history), composeEnhancers(epicMiddleware)];
//   // create store
//   return configureStore<RootState>({
//     reducer: rootReducer,
//     middleware: middlewares,
//     preloadedState: initialState,
//   });
// }

// export const store = configureAppStore();

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);
epicMiddleware.run(epics);
