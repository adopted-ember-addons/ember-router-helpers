import * as emberService from '@ember/service';
import Helper from '@ember/component/helper';
import type RouterService from '@ember/routing/router-service';
import handleQueryParams, {
  type RouteArgs,
} from '../utils/handle-query-params.ts';
import trackActiveRoute from '../utils/track-active-route.ts';

const service = emberService.service ?? emberService.inject;

export interface IsActiveSignature {
  Args: { Positional: RouteArgs };
  Return: boolean;
}

export default class IsActiveHelper extends Helper<IsActiveSignature> {
  @service declare router: RouterService;

  compute(_params: RouteArgs): boolean {
    trackActiveRoute(this.router);

    const params = handleQueryParams(_params);

    return this.router.isActive(...params);
  }
}
