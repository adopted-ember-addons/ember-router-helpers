import Helper from '@ember/component/helper';
import * as emberService from '@ember/service';
import type RouterService from '@ember/routing/router-service';

const service = emberService.service ?? emberService.inject;

export interface RootURLSignature {
  Return: string;
}

export default class RootURLHelper extends Helper<RootURLSignature> {
  @service declare router: RouterService;

  compute(): string {
    return this.router.rootURL;
  }
}
