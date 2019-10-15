import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { AppState } from 'alias/app';
import { reducer } from './reducer';
import { Action } from './actions';

export const store = createStore(reducer, applyMiddleware(thunk));

export const dispatch: ThunkDispatch<AppState, undefined, Action> = store.dispatch;
