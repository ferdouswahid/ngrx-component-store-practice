import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DressPageComponent} from "./dress-page/dress-page.component";
import {BookPageComponent} from "./book-page/book-page.component";
import {ParentPageComponent} from "./parent-page/parent-page.component";

const routes: Routes = [
  {path: 'dress-page', component: DressPageComponent},
  {path: 'book-page', component: BookPageComponent},
  {path: 'parent-page', component: ParentPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
