import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotherPageRoutingModule } from './mother-page-routing.module';
import { MotherPageComponent } from './mother-page.component';


@NgModule({
  declarations: [
    MotherPageComponent
  ],
  imports: [
    CommonModule,
    MotherPageRoutingModule
  ]
})
export class MotherPageModule { }
