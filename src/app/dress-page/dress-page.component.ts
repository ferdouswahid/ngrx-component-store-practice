import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DressStore} from "./dress.store";
import {Observable} from "rxjs";
import {DressDto} from "./DressDto";

@Component({
  selector: 'app-dress-page',
  templateUrl: './dress-page.component.html',
  styleUrls: ['./dress-page.component.scss'],
})
export class DressPageComponent implements OnInit {

  dressList$ : Observable<DressDto[]> = this.dressStore.dressDtoList$;
  favouriteDressList$ : Observable<DressDto[]> = this.dressStore.userPreferredDressList$;

  defaultId = 1;

  constructor(private route: ActivatedRoute,
              private readonly dressStore: DressStore) {}

  ngOnInit(): void {
  }


  add(dressName: string) {
    this.dressStore.addDress({ name: dressName + this.defaultId, id: this.defaultId });
    this.defaultId = this.defaultId + 1;
  }

  update(dress: DressDto) {
    this.dressStore.updateDress({ ...dress, name: "Updated " + dress.name });
  }

  remove(dress: DressDto) {
    this.dressStore.removeDress({ ...dress});
  }

  resetDressState() {
    this.dressStore.resetDressState();
    this.defaultId = 1;
  }


  favourite(dress: DressDto) {
    this.dressStore.addFavouriteDress({ ...dress});
  }
}
