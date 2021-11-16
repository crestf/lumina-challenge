import * as mainAction from './main.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Coin } from '../entity/coin.model';

export const featureName = 'main';

export interface AppState {
  searchedTerm: string;
  searchedCoin: Array<Coin>;
  searchedCoinTotalElements: number;
  searchedCoinCurrentPage: number;
  loading: boolean;
  sortBy: string;
  sortDirUp: boolean;
  trackedCoin: Array<Coin>;
}

export const initialState: AppState = {
  searchedTerm: '',
  searchedCoin: [],
  searchedCoinTotalElements: 0,
  searchedCoinCurrentPage: 0,
  loading: false,
  sortBy: '',
  sortDirUp: true,
  trackedCoin: []
};

export function reducer(state: AppState = initialState, action: mainAction.Actions): AppState {
  switch (action.type) {
    case mainAction.SEARCH_COIN: {
      return Object.assign({}, state, {
        searchedTerm: action.term
      });
    }

    case mainAction.SEARCH_COIN_SUCCESS: {
      return Object.assign({}, state, {
        searchedCoin: action.coins
      });
    }

    case mainAction.TRACK_COIN_SUCCESS: {
      return Object.assign({}, state, {
        trackedCoin: action.coins
      });
    }

    case mainAction.SORT: {
      return Object.assign({}, state, {
        sortBy: action.by,
        sortDirUp: action.dir
      });
    }


    default:
      return state;
  }
}

export const getAttendanceState = createFeatureSelector<AppState>(featureName);

export const getSearchedTerm = createSelector(getAttendanceState, (state: AppState) => state.searchedTerm);
export const getSearchedCoin = createSelector(getAttendanceState, (state: AppState) => state.searchedCoin);
export const getSearchedCoinTotalElements = createSelector(getAttendanceState, (state: AppState) => state.searchedCoinTotalElements);
export const getSearchedCoinCurrentPage = createSelector(getAttendanceState, (state: AppState) => state.searchedCoinCurrentPage);
export const getTrackedCoin = createSelector(getAttendanceState, (state: AppState) => state.trackedCoin);
export const getLoading = createSelector(getAttendanceState, (state: AppState) => state.loading);
export const getSort = createSelector(getAttendanceState, (state: AppState) => ({
  by: state.sortBy,
  dir: state.sortDirUp
}));
export const getSortBy = createSelector(getAttendanceState, (state: AppState) => state.sortBy);
export const getSortDirUp = createSelector(getAttendanceState, (state: AppState) => state.sortDirUp);
