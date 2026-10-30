import * as emberService from '@ember/service';
import Helper from '@ember/component/helper';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import handleQueryParams, {
  type RouteArgs,
} from '../utils/handle-query-params.ts';

const service = emberService.service ?? emberService.inject;

export interface TransitionToSignature {
  Args: { Positional: RouteArgs };
  Return: (maybeEvent?: Event) => Transition;
}

export default class TransitionToHelper extends Helper<TransitionToSignature> {
  @service declare router: RouterService;

  compute(_params: RouteArgs): (maybeEvent?: Event) => Transition {
    return (maybeEvent?: Event) => {
      if (
        maybeEvent !== undefined &&
        typeof maybeEvent.preventDefault === 'function'
      ) {
        maybeEvent.preventDefault();
      }

      const params = handleQueryParams(_params);
      return this.router.transitionTo(...params);
    };
  }
}
