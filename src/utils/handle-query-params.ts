import type RouterService from '@ember/routing/router-service';

export type RouteArgs = Parameters<RouterService['transitionTo']>;
// `urlFor` requires a route name, unlike the other router methods
export type UrlForArgs = [routeName: string, ...modelsAndOptions: unknown[]];

// shape produced by the legacy `(query-params foo="bar")` template helper
interface LegacyQueryParams {
  isQueryParams: true;
  values: Record<string, unknown>;
}

function isLegacyQueryParams(value: unknown): value is LegacyQueryParams {
  return Boolean(value && (value as Partial<LegacyQueryParams>).isQueryParams);
}

export default function handleQueryParams<T extends RouteArgs>(params: T): T {
  const possibleQueryParams = params[params.length - 1];

  if (isLegacyQueryParams(possibleQueryParams)) {
    // copy instead of mutating, to handle potentially frozen arrays
    return [
      ...params.slice(0, -1),
      { queryParams: possibleQueryParams.values },
    ] as unknown as T;
  }

  return params;
}
