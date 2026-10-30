import * as emberService from '@ember/service';
import Helper from '@ember/component/helper';
import RouteParams from '../utils/route-params';

const service = emberService.service ?? emberService.inject;

export default class RouteParamsHelper extends Helper {
  @service router;

  compute(params) {
    return new RouteParams(this.router, params);
  }
}
