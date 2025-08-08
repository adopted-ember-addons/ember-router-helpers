import * as emberService from '@ember/service';
import Helper from '@ember/component/helper';
import handleQueryParams from '../utils/handle-query-params';

const service = emberService.service ?? emberService.inject;
export default class UrlForHelper extends Helper {
  @service router;

  compute(_params) {
    let params = handleQueryParams(_params);
    return this.router.urlFor(...params);
  }
}
