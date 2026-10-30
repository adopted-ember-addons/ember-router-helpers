import * as emberService from '@ember/service';
import Helper from '@ember/component/helper';
import handleQueryParams from '../utils/handle-query-params';
import trackActiveRoute from '../utils/track-active-route';

const service = emberService.service ?? emberService.inject;
export default class IsActiveHelper extends Helper {
  @service router;

  compute(_params) {
    trackActiveRoute(this.router);

    let params = handleQueryParams(_params);

    return this.router.isActive(...params);
  }
}
