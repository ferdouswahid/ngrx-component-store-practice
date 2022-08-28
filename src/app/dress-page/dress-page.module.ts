import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { DressPageRoutingModule } from './dress-page-routing.module';
import { DressPageComponent } from './dress-page.component';
import {DressStore} from "./dress.store";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";


@NgModule({
  declarations: [
    DressPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    DressPageRoutingModule
  ],
  exports: [
    DressPageComponent
  ],
  providers:[
    DressStore
  ]
})
export class DressPageModule {

}
