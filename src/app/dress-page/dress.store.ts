import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {linkToGlobalState} from "../ComponentStateReducer";


export interface Dress {
  id: number;
  name: string;
  description?: string;
}

export interface DresssState {
  dressList: Dress[];
  userPreferredDressIdList: number[];
}

export const initialState: DresssState = {
  dressList: [],
  userPreferredDressIdList: []
};

@Injectable()
export class DressStore extends ComponentStore<DresssState> {

  constructor(private globalStore: Store) {
    super(initialState);
    linkToGlobalState(this.state$, 'DressState', this.globalStore);
  }

  readonly dressList$ = this.select(state => state.dressList);

  readonly addDress = this.updater((state: DresssState, dress: Dress) => {
      return {
        ...state,
        dressList: [...state.dressList, dress]
      }
    }
  );

  readonly updateDress = this.updater((state: DresssState, dress: Dress) => {
      const newDressList: Dress[] = Object.assign([], state.dressList);
      const index = newDressList.findIndex(val => val.id == dress.id);
      newDressList[index] = dress;

      return {
        ...state,
        dressList: newDressList,
      };
    }
  );

  readonly removeDress = this.updater((state: DresssState, dress: Dress) => {
      const newDressList: Dress[] = Object.assign([], state.dressList);
      const removeDressList = newDressList.filter(val => val.id !== dress.id);
      return {
        ...state,
        dressList: removeDressList,
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
    this.dressList$,
    this.userPreferredDressIdList$,
    (dresss, ids) => dresss.filter(dress => ids.includes(dress.id)),
    {debounce: true}, // setting this selector to debounce
  );

  readonly addFavouriteDress = this.updater((state: DresssState, dress: Dress) => {
    const newList: number[] = Object.assign([], state.userPreferredDressIdList);
    if(newList.includes(dress.id)){
      return {
        ...state
      }
    }else{
      return {
        ...state,
        userPreferredDressIdList: [...state.userPreferredDressIdList, dress.id]
      }
    }

    }
  );

}
