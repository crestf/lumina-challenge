import { Injectable } from '@angular/core';
import { Coin } from '../../entity/coin.model';

@Injectable()
export class DataStoreService {

  readonly KEY_ALL_COIN = 'ALL_COIN';
  readonly KEY_TRACKED_COIN = 'TRACKED_COIN';

  constructor() {}

  getAllCoin(): Array<Coin> {
    return JSON.parse(localStorage.getItem(this.KEY_ALL_COIN));
  }
  setAllCoins(coins: Array<Coin>) {
    const jsonData = JSON.stringify(coins);
    localStorage.setItem(this.KEY_ALL_COIN, jsonData);
  }

  getTrackedCoinId(): Array<string> {
    return JSON.parse(localStorage.getItem(this.KEY_TRACKED_COIN)) || [];
  }
  getTrackedCoin(ids: Array<string>, by?: string, dir?: boolean): Array<Coin> {
    console.log(by, dir);
    const coin = this.getAllCoin();
    const selectedCoin = coin.filter((coin: Coin) => ids.includes(coin.id));
    // if (!!by && !!dir) {
    //   selectedCoin.sort((a, b) => (a[by] > b[by]) ? 1 : -1);
    // } else {
      return selectedCoin;
    // }
  }
  addTrackedCoin(id: string): Array<Coin> {
    const tracked = this.getTrackedCoinId();
    let newTracked = [...tracked];
    if (tracked.indexOf(id) < 0) {
      newTracked = [...tracked, id];
    }
    const jsonData = JSON.stringify(newTracked);
    localStorage.setItem(this.KEY_TRACKED_COIN, jsonData);
    return this.getTrackedCoin(newTracked);
  }
  removeTrackedCoin(id: string): Array<Coin> {
    const tracked = this.getTrackedCoinId();
    const newTracked = tracked.filter(trackedId => trackedId != id);
    const jsonData = JSON.stringify(newTracked);
    localStorage.setItem(this.KEY_TRACKED_COIN, jsonData);
    return this.getTrackedCoin(newTracked);
  }
}
