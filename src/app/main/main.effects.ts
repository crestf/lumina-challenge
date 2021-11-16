import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { AppState } from './main.reducer';
import { Observable, of } from 'rxjs';
import * as mainAction from './main.action';
import * as fromMain from './main.reducer';
import { FailingAction } from './main.action';
import { catchError, map, share, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { NetworkService } from '../data/network.service';
import { Coin } from '../entity/coin.model';
import { DataStoreService } from '../data/data-store/data-store.service';

@Injectable()
export class MainEffects{

  @Effect()
  loadTrackedCoin$: Observable<Action> = this.actions$.pipe(
    ofType(mainAction.LOAD_TRACKED_COIN),
    withLatestFrom(
      this.store.pipe(select(fromMain.getSort)),
      (action, sort: any) => sort
    ),
    map((sort) => {
      const { by, dir } = sort;

      const ids = this.dataStoreService.getTrackedCoinId();
      const coins = this.dataStoreService.getTrackedCoin(ids, by, dir);

      return new mainAction.TrackCoinSuccessAction(coins);
    })
  );

  @Effect()
  fetchAllCoins$: Observable<Action> = this.actions$.pipe(
    ofType(mainAction.FETCH_ALL_COIN),
    switchMap(() => {
      const url = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false';

      return this.service.get(url).pipe(
        map((result: Array<Coin>) => {
          this.dataStoreService.setAllCoins(result);
          return new mainAction.FetchAllCoinSuccessAction(result);
        }),
        catchError((error: Error) => of(new mainAction.FailingAction(error.message)))
      );
    })
  );

  @Effect()
  searchCoin$: Observable<Action> = this.actions$.pipe(
    ofType(mainAction.SEARCH_COIN),
    map((action: mainAction.SearchCoinAction) => {
      const { term } = action;
      if (!term) {
        return new mainAction.SearchCoinSuccessAction([]);
      }

      const coins = this.dataStoreService.getAllCoin();
      const searchedCoin = coins.filter((coin: Coin) => {
        return coin.symbol.indexOf(term) > -1 || coin.name.indexOf(term) > -1
      });
      return new mainAction.SearchCoinSuccessAction(searchedCoin);
    })
  );

  @Effect()
  trackCoin$: Observable<Action> = this.actions$.pipe(
    ofType(mainAction.TRACK_COIN),
    map((action: mainAction.TrackCoinAction) => {
      const { id } = action;
      if (!id) {
        return new mainAction.FailingAction('No id selected');
      }

      const trackedIds = this.dataStoreService.addTrackedCoin(id);
      return new mainAction.TrackCoinSuccessAction(trackedIds);
    })
  );

  @Effect()
  untrackCoin$: Observable<Action> = this.actions$.pipe(
    ofType(mainAction.UNTRACK_COIN),
    map((action: mainAction.UntrackCoinAction) => {
      const { id } = action;
      if (!id) {
        return new mainAction.FailingAction('No id selected');
      }

      const trackedIds = this.dataStoreService.removeTrackedCoin(id);
      return new mainAction.TrackCoinSuccessAction(trackedIds);
    })
  );

  @Effect()
  failingAction$: Observable<Action> = this.actions$.pipe(
    ofType(mainAction.FAILING),
    tap((action: FailingAction) => {
      console.log('ERROR: ' + action.errorMessage);
    }),
    share()
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private service: NetworkService,
    private dataStoreService: DataStoreService,
  ) {}
}
