import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FerdousPageRoutingModule } from './ferdous-page-routing.module';
import { FerdousPageComponent } from './ferdous-page.component';
import {MoviesStore} from "./movies.store";
import {ComponentStore} from "@ngrx/component-store";


@NgModule({
  declarations: [
    FerdousPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FerdousPageRoutingModule
  ],
  providers:[
    MoviesStore
  ]
})
export class FerdousPageModule{

}
