import { Params, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActionReducerMap } from '@ngrx/store';
import { RouterReducerState, RouterStateSerializer, routerReducer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  outletParams?: Params;
  fragment: string;
}

export interface RouterState {
  router: RouterReducerState<RouterStateUrl>;
}

export const routerReducers: ActionReducerMap<RouterState> = {
  router: routerReducer
};

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
      const { url } = routerState;
      const { queryParams } = routerState.root;

      let state: ActivatedRouteSnapshot = routerState.root;
      while (state.firstChild) {
          state = state.firstChild;
      }
      let outletParams;
      if (state.root.children.length > 1) {
        outletParams = state.root.children[1].params;
      }
      const { params, fragment } = state;

      return { url, queryParams, params, outletParams, fragment };
  }
}

export const RouterStateSerializerProvider = {
  provide: RouterStateSerializer,
  useClass: CustomSerializer
};
