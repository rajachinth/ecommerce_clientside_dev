import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgRedux, DevToolsExtension, NgReduxModule} from '@angular-redux/store';
import { RootStoreState, rootReducer, INITIALSTATE } from './redux/corestore';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgReduxModule
  ],
  exports:
  [
    NgReduxModule
  ]
})
export class StoreModuleModule {
  constructor(ngRedux: NgRedux<RootStoreState>, devTools: DevToolsExtension) {
    const enhancer = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIALSTATE, [], enhancer);
  }
}
