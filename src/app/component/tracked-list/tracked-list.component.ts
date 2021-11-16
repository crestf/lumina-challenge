import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Coin } from '../../entity/coin.model';

@Component({
  selector: 'app-tracked-list',
  templateUrl: './tracked-list.component.html',
  styleUrls: ['./tracked-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackedListComponent {

  @Input() coins: Array<Coin>;
  @Input() sort: string;
  @Input() sortDirectionUp: boolean;
  @Output() onRemoveCoin: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChangeSort: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  get sortSymbolIcon() {
    if (this.sort === 'symbol') {
      if (this.sortDirectionUp) {
        return '^';
      } else {
        return 'v';
      }
    } else {
      return '^v';
    }
  }
  get sortNameIcon() {
    if (this.sort === 'name') {
      if (this.sortDirectionUp) {
        return '^';
      } else {
        return 'v';
      }
    } else {
      return '^v';
    }
  }

  removeCoin(id: string) {
    this.onRemoveCoin.emit(id);
    this.cdr.markForCheck();
  }

  showPopup() {

  }

  sortBy(by: string) {
    if (this.sort === by) {
      this.onChangeSort.emit({ by, dir: !this.sortDirectionUp });
    } else {
      this.onChangeSort.emit({ by, dir: true });
    }
  }
}
