import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FerdousPageComponent} from "./ferdous-page/ferdous-page.component";

const routes: Routes = [
  {path: 'ferdous-page', component: FerdousPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
