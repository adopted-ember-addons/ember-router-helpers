// Allows apps not yet using strict mode templates to consume the Glint types,
// see the README.
import type IsActiveHelper from './helpers/is-active.ts';
import type ReplaceWithHelper from './helpers/replace-with.ts';
import type RootURLHelper from './helpers/root-url.ts';
import type RouteParamsHelper from './helpers/route-params.ts';
import type TransitionToHelper from './helpers/transition-to.ts';
import type UrlForHelper from './helpers/url-for.ts';

export default interface Registry {
  'is-active': typeof IsActiveHelper;
  'replace-with': typeof ReplaceWithHelper;
  'root-url': typeof RootURLHelper;
  'route-params': typeof RouteParamsHelper;
  'transition-to': typeof TransitionToHelper;
  'url-for': typeof UrlForHelper;
}
