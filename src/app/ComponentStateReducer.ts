import {createAction, createReducer, on, props, Store} from '@ngrx/store';
import {isEqual} from 'lodash';
import {Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

export const updateComponentState = createAction(
  '[Component Store] Update Action',
  props<{ componentName: any, componentState:any }>()
);

export const initialState: any = {};

export const componentStateReducer = createReducer(
  initialState,
  on(updateComponentState, (state, {componentName, componentState}) => {
    return ({[componentName]: {...componentState}});
  })
);

export const linkToGlobalState = (componentState$: Observable<any>, componentName: string, globalStore: Store) => {
  componentState$.pipe(
    distinctUntilChanged((prev, next) => isEqual(prev, next))
  ).subscribe(componentState => {
    globalStore.dispatch(updateComponentState({componentName, componentState}));
  });
};
