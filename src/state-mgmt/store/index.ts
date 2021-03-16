import systemReducer, {
  getInfoStart,
  getInfoSuccess,
  getInfoFailed,
  addInfoStart,
  addInfoSuccess,
  addInfoFailed,
  editInfoStart,
  editInfoSuccess,
  editInfoFailed,
  deleteInfoStart,
  deleteInfoSuccess,
  deleteInfoFailed,
  completeInfoStart,
  completeInfoSuccess,
  completeInfoFailed,
} from "./system/slice";
import {compose, createStore, applyMiddleware} from "redux"
import {
  combineReducers,
  // configureStore,
} from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import {
  getInfoEpic,
  addInfoEpic,
  completeInfoEpic,
  deleteInfoEpic,
  editInfoEpic,
} from "./system/epics";
import { ActionType } from "typesafe-actions";
import {
  connectRouter,
  // routerMiddleware,
  RouterState,
} from "connected-react-router";

type SystemActionsWithPayload =
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

type SystemActions = ActionType<SystemActionsWithPayload>;

type finalActions = SystemActions;

const epics = combineEpics(
  getInfoEpic,
  addInfoEpic,
  completeInfoEpic,
  deleteInfoEpic,
  editInfoEpic
);

export const history = createBrowserHistory<RouterState>();
export const rootReducer = combineReducers({
  router: connectRouter(history),
  system: systemReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const epicMiddleware = createEpicMiddleware<
  finalActions, // input actions
  finalActions, // output actions
  RootState
>();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


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
  rootReducer,composeEnhancers(applyMiddleware(epicMiddleware))
)
epicMiddleware.run(epics);
