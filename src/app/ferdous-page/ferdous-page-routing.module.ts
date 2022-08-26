import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FerdousPageModule} from "./ferdous-page.module";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FerdousPageRoutingModule { }
