import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DressStore} from "./dress.store";
import {Observable} from "rxjs";
import {DressDto} from "./DressDto";
import {FormGroup} from "@angular/forms";
import {BookDto} from "../book-page/BookDto";
import {FormService} from "../common/form-service";

@Component({
  selector: 'app-dress-page',
  templateUrl: './dress-page.component.html',
  styleUrls: ['./dress-page.component.scss'],
})
export class DressPageComponent implements OnInit {

  dressList$ : Observable<DressDto[]> = this.dressStore.dressDtoList$;
  favouriteDressList$ : Observable<DressDto[]> = this.dressStore.userPreferredDressList$;
  defaultId = 1;

  dressFg: FormGroup;
  dressDto: DressDto;

  constructor(private route: ActivatedRoute,
              private formService: FormService,
              private readonly dressStore: DressStore) {}

  ngOnInit(): void {
    this.makeDressForm(new DressDto());
  }

  makeDressForm(dressDto: DressDto): void {
    this.dressFg = this.formService.makeBlankForm(dressDto);
  }

  saveDress() {
    const dressDto = new BookDto(this.dressFg.value);
    if (dressDto.id == null) {
      dressDto.id = this.defaultId;
    }

    this.dressStore.addDress({ ...dressDto });
    this.defaultId = this.defaultId + 1;
    this.makeDressForm(new DressDto());
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
