import * as emberService from '@ember/service';
import Helper from '@ember/component/helper';
import type RouterService from '@ember/routing/router-service';
import handleQueryParams, {
  type UrlForArgs,
} from '../utils/handle-query-params.ts';

const service = emberService.service ?? emberService.inject;

export interface UrlForSignature {
  Args: { Positional: UrlForArgs };
  Return: string;
}

export default class UrlForHelper extends Helper<UrlForSignature> {
  @service declare router: RouterService;

  compute(_params: UrlForArgs): string {
    const params = handleQueryParams(_params);
    return this.router.urlFor(...params);
  }
}
