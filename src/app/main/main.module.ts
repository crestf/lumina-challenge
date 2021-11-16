import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromMain from './main.reducer';
import { SearchComponent } from '../component/search/search.component';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './main.effects';
import { NetworkService } from '../data/network.service';
import { DataStoreService } from '../data/data-store/data-store.service';
import { SearchResultComponent } from '../component/search-result/search-result.component';
import { TrackedListComponent } from '../component/tracked-list/tracked-list.component';

@NgModule({
  declarations: [
    MainComponent,
    SearchComponent,
    SearchResultComponent,
    TrackedListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    StoreModule.forFeature(fromMain.featureName, fromMain.reducer),
    EffectsModule.forFeature([MainEffects])
  ],
  providers: [
    NetworkService,
    DataStoreService
  ]
})
export class MainModule { }
