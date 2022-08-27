import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FerdousPageComponent} from "./ferdous-page/ferdous-page.component";
import {ShaifulPageComponent} from "./shaiful-page/shaiful-page.component";
import {MotherPageComponent} from "./mother-page/mother-page.component";

const routes: Routes = [
  {path: 'ferdous-page', component: FerdousPageComponent},
  {path: 'shaiful-page', component: ShaifulPageComponent},
  {path: 'mother-page', component: MotherPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
