import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as fromReducer from './main.reducer';
import { AppState } from './main.reducer';
import { select, Store } from '@ngrx/store';
import * as action from './main.action';
import { Observable } from 'rxjs';
import { SearchComponent } from '../component/search/search.component';
import { Coin } from '../entity/coin.model';
import { SearchResultComponent } from '../component/search-result/search-result.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild('searchContainer', { static: false }) searchContainer: SearchComponent;
  @ViewChild('searchResultContainer', { static: false }) searchResultContainer: SearchResultComponent;

  searchedTerm$: Observable<string>;
  searchedCoin$: Observable<Array<Coin>>;
  trackedCoin$: Observable<Array<Coin>>;
  sortBy$: Observable<string>;
  sortDirectionUp$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.searchedTerm$ = this.store.pipe(select(fromReducer.getSearchedTerm));
    this.searchedCoin$ = this.store.pipe(select(fromReducer.getSearchedCoin));
    this.trackedCoin$ = this.store.pipe(select(fromReducer.getTrackedCoin));
    this.sortBy$ = this.store.pipe(select(fromReducer.getSortBy));
    this.sortDirectionUp$ = this.store.pipe(select(fromReducer.getSortDirUp));

    this.store.dispatch(new action.LoadTrackedCoinAction());
    this.store.dispatch(new action.FetchAllCoinAction());
  }

  ngAfterViewInit() {
    this.handleSearchObservable();
  }

  handleSearchObservable() {
    this.searchContainer.term$.subscribe((term) => {
      this.store.dispatch(new action.SearchCoinAction(term));
    });
  }

  onAddCoin(id: string) {
    this.store.dispatch(new action.TrackCoinAction(id));
    this.searchContainer.clear();
  }

  onRemoveCoin(id: string) {
    this.store.dispatch(new action.UntrackCoinAction(id));
  }

  onChangeSort(sort: { by: string, dir: boolean }) {
    this.store.dispatch(new action.SortAction(sort.by, sort.dir));
    this.store.dispatch(new action.LoadTrackedCoinAction());
  }

  doFocus() {
    this.searchResultContainer.refocus();
  }
}
