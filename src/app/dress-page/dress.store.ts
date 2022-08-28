import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {linkToGlobalState} from "../ComponentStateReducer";
import {DressDto} from "./DressDto";


export class DresssState {
  dressDtoList: DressDto[];
  userPreferredDressIdList: number[];

  public constructor(o?: Partial<DresssState>) {
    Object.assign(this, o);
  }
}

export const initialState: DresssState = {
  dressDtoList: [],
  userPreferredDressIdList: [],
};

@Injectable()
export class DressStore extends ComponentStore<DresssState> {

  constructor(private globalStore: Store) {
    super(initialState);
    linkToGlobalState(this.state$, 'DressState', this.globalStore);
  }

  readonly dressDtoList$ = this.select(state => state.dressDtoList);

  readonly addDress = this.updater((state: DresssState, dress: DressDto) => {
      return {
        ...state,
        dressDtoList: [...state.dressDtoList, dress]
      }
    }
  );

  readonly updateDress = this.updater((state: DresssState, dress: DressDto) => {
      const newDressList: DressDto[] = Object.assign([], state.dressDtoList);
      const index = newDressList.findIndex(val => val.id == dress.id);
      newDressList[index] = dress;

      return {
        ...state,
        dressDtoList: newDressList,
      };
    }
  );

  readonly removeDress = this.updater((state: DresssState, dress: DressDto) => {
      const newDressList: DressDto[] = Object.assign([], state.dressDtoList);
      const removeDressList = newDressList.filter(val => val.id !== dress.id);
      return {
        ...state,
        dressDtoList: removeDressList,
      };
    }
  );

  readonly resetDressState = this.updater((state: DresssState) => {
      return {
        ...state, ...initialState
      }
    }
  );


  // favourite
  readonly userPreferredDressIdList$ = this.select(state => state.userPreferredDressIdList);

  readonly userPreferredDressList$ = this.select(
    this.dressDtoList$,
    this.userPreferredDressIdList$,
    (dresss, ids) => dresss.filter(dress => ids.includes(dress.id ?? 0)),
    {debounce: true}, // setting this selector to debounce
  );


  checkDressAlreadyExistInFavList(userPreferredDressIdList: Array<number>, dressId:number): boolean{
    return userPreferredDressIdList.includes(dressId);
  }

  getFavouriteIdList(userPreferredDressIdList: Array<number>, dress:DressDto): Array<number>{
    if(!this.checkDressAlreadyExistInFavList(userPreferredDressIdList, dress.id??0) && dress.id){
      return [...userPreferredDressIdList, dress.id]
    }
    return userPreferredDressIdList
  }

  readonly addFavouriteDress = this.updater((state: DresssState, dress: DressDto) => ({
      ...state, userPreferredDressIdList: this.getFavouriteIdList(state.userPreferredDressIdList, dress)
    })
  );

}
