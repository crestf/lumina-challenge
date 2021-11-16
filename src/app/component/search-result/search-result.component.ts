import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Coin } from '../../entity/coin.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent {

  @Input() coins: Array<Coin>;
  @Input() term: string;
  @Output() onAddCoin: EventEmitter<string> = new EventEmitter<string>();

  focus: boolean = true;

  constructor(private eRef: ElementRef,
              private cdr: ChangeDetectorRef) {
  }

  get resultShown() {
    return !!this.term && this.focus;
  }

  @HostListener('document:click', ['$event'])
  clickOut() {
    if (this.resultShown) {
      this.focus = false;
      this.cdr.markForCheck();
    }
  }

  refocus() {
    this.focus = true;
    this.cdr.markForCheck();
  }

  addCoin(id: string) {
    this.focus = false;
    this.onAddCoin.emit(id);
    this.cdr.markForCheck();
  }
}
