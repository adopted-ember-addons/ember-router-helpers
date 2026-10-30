import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import handleQueryParams, { type UrlForArgs } from './handle-query-params.ts';
import trackActiveRoute from './track-active-route.ts';

export default class RouteParams {
  _router: RouterService;
  _inputParams: UrlForArgs;
  _transitionTo: ((maybeEvent?: Event) => Transition) | undefined;
  _replaceWith: (() => Transition) | undefined;
  _processedParams: UrlForArgs | undefined;

  constructor(router: RouterService, params: UrlForArgs) {
    this._router = router;
    this._inputParams = params;
    this._transitionTo = undefined;
    this._replaceWith = undefined;
    this._processedParams = undefined;
  }

  get isActive(): boolean {
    trackActiveRoute(this._router);

    return this._router.isActive(...this._params);
  }

  get url(): string {
    return this._router.urlFor(...this._params);
  }

  get transitionTo(): (maybeEvent?: Event) => Transition {
    if (this._transitionTo === undefined) {
      this._transitionTo = (maybeEvent?: Event) => {
        if (
          maybeEvent !== undefined &&
          typeof maybeEvent.preventDefault === 'function'
        ) {
          maybeEvent.preventDefault();
        }
        return this._router.transitionTo(...this._params);
      };
    }

    return this._transitionTo;
  }

  get replaceWith(): () => Transition {
    if (this._replaceWith === undefined) {
      this._replaceWith = () => {
        return this._router.replaceWith(...this._params);
      };
    }

    return this._replaceWith;
  }

  get _params(): UrlForArgs {
    if (!this._processedParams) {
      this._processedParams = handleQueryParams(this._inputParams);
    }

    return this._processedParams;
  }
}
