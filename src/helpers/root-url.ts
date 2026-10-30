import Helper from '@ember/component/helper';
import * as emberService from '@ember/service';

const service = emberService.service ?? emberService.inject;

export default class RootURLHelper extends Helper {
  @service router;

  compute() {
    return this.router.rootURL;
  }
}
