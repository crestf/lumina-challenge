import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnChanges {
  @ViewChild('term', { static: true }) term: ElementRef;

  @Input() value: string = '';
  @Input() debounceTime: number = 400;
  @Input() placeholder: string;
  @Output() onFocus: EventEmitter<any> = new EventEmitter<any>();

  private termSubject$: Subject<string> = new Subject<string>();

  constructor(private cdRef: ChangeDetectorRef) {}

  get term$(): Observable<string> {
    return this.termSubject$.asObservable().pipe(
      debounceTime(this.debounceTime)
      //  Temporary disabled until we get new best practice for handling `@Input() value: string;`
      //  distinctUntilChanged()
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['value'];
    if (change) {
      this.term.nativeElement.value = change.currentValue || '';
    }
  }

  emitValue(val: any) {
    this.termSubject$.next(val);
  }

  clear() {
    this.term.nativeElement.value = '';
    this.emitValue(this.term.nativeElement.value);
    this.cdRef.markForCheck();
  }
}
