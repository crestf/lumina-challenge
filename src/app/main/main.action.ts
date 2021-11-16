import { Action } from '@ngrx/store';
import { Coin } from '../entity/coin.model';

export const LOAD_TRACKED_COIN = '[Main] LOAD_TRACKED_COIN';
export const FETCH_ALL_COIN = '[Main] FETCH_ALL_COIN';
export const FETCH_ALL_COIN_SUCCESS = '[Main] FETCH_ALL_COIN_SUCCESS';
export const SEARCH_COIN = '[Main] SEARCH_COIN';
export const SEARCH_COIN_SUCCESS = '[Main] SEARCH_COIN_SUCCESS';
export const TRACK_COIN = '[Main] TRACK_COIN';
export const TRACK_COIN_SUCCESS = '[Main] TRACK_COIN_SUCCESS';
export const UNTRACK_COIN = '[Main] UNTRACK_COIN_SUCCESS';
export const SORT = '[Main] SORT';
export const FAILING = '[Main] FAILING';


export class LoadTrackedCoinAction implements Action {
  readonly type = LOAD_TRACKED_COIN;
}

export class FetchAllCoinAction implements Action {
  readonly type = FETCH_ALL_COIN;
}

export class FetchAllCoinSuccessAction implements Action {
  readonly type = FETCH_ALL_COIN_SUCCESS;

  constructor(public coins: Array<Coin>) {}
}

export class SearchCoinAction implements Action {
  readonly type = SEARCH_COIN;

  constructor(public term: string) {}
}

export class SearchCoinSuccessAction implements Action {
  readonly type = SEARCH_COIN_SUCCESS;

  constructor(public coins: Array<Coin>) {}
}

export class TrackCoinAction implements Action {
  readonly type = TRACK_COIN;

  constructor(public id: string) {}
}

export class TrackCoinSuccessAction implements Action {
  readonly type = TRACK_COIN_SUCCESS;

  constructor(public coins: Array<Coin>) {}
}

export class UntrackCoinAction implements Action {
  readonly type = UNTRACK_COIN;

  constructor(public id: string) {}
}

export class SortAction implements Action {
  readonly type = SORT;

  constructor(public by: string, public dir: boolean) {}
}

export class FailingAction implements Action {
  readonly type = FAILING;

  constructor(public errorMessage: string) {}
}

export type Actions =
  | LoadTrackedCoinAction
  | FetchAllCoinAction
  | FetchAllCoinSuccessAction
  | SearchCoinAction
  | SearchCoinSuccessAction
  | TrackCoinAction
  | TrackCoinSuccessAction
  | UntrackCoinAction
  | SortAction
  | FailingAction;
