import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FerdousPageModule} from "./ferdous-page/ferdous-page.module";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import {componentStateReducer} from "./ComponentStateReducer";
import {ShaifulPageModule} from "./shaiful-page/shaiful-page.module";
import {MotherPageModule} from "./mother-page/mother-page.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FerdousPageModule,
    ShaifulPageModule,
    MotherPageModule,
    //StoreModule.forRoot({}, {}),
    StoreModule.forRoot({ componentState: componentStateReducer}),
    StoreDevtoolsModule.instrument(
      { maxAge: 25, logOnly: environment.production }
    ),
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
