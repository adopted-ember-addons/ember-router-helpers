import type RouterService from '@ember/routing/router-service';

export default function trackActiveRoute(router: RouterService): void {
  // ensure we recompute anytime `router.currentURL` changes
  void router.currentURL;

  // ensure we recompute whenever the `router.currentRouteName` changes
  // this is slightly overlapping with router.currentURL but there are
  // cases where route.currentURL doesn't change but the
  // router.currentRouteName has (e.g. loading and error states)
  void router.currentRouteName;
}
