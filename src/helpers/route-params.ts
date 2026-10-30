import * as emberService from '@ember/service';
import Helper from '@ember/component/helper';
import type RouterService from '@ember/routing/router-service';
import type { UrlForArgs } from '../utils/handle-query-params.ts';
import RouteParams from '../utils/route-params.ts';

const service = emberService.service ?? emberService.inject;

export interface RouteParamsSignature {
  Args: { Positional: UrlForArgs };
  Return: RouteParams;
}

export default class RouteParamsHelper extends Helper<RouteParamsSignature> {
  @service declare router: RouterService;

  compute(params: UrlForArgs): RouteParams {
    return new RouteParams(this.router, params);
  }
}
