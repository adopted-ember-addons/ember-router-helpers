# ember-router-helpers

[![CI Build](https://github.com/adopted-ember-addons/ember-router-helpers/workflows/CI/badge.svg)](https://github.com/adopted-ember-addons/ember-router-helpers/actions?query=workflow%3A%22CI%22)

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.28 or above
* Embroider or ember-auto-import >= 2


Installation
------------------------------------------------------------------------------

```
ember install ember-router-helpers
```

Usage
------------------------------------------------------------------------------

* `route-params`

```hbs
{{#let (route-params "parent.child") as |routeParams|}}
  <a href={{routeParams.url}} class={{if routeParams.isActive "active" "inactive"}}>Blah</a>
{{/let}}
```

* `transition-to`

```hbs
<button {{on "click" (transition-to "parent.child")}}></button>
```

* `replace-with`

```hbs
<button onclick={{replace-with "parent.child"}}></button>
```

* `is-active`

```hbs
{{is-active "parent.child"}}
```

* `url-for`
```hbs
{{url-for "parent.child"}}
```

Template tag (`.gjs` / `.gts`)
------------------------------------------------------------------------------

Import the helpers directly:

```gts
import isActive from 'ember-router-helpers/helpers/is-active';
import rootUrl from 'ember-router-helpers/helpers/root-url';
import routeParams from 'ember-router-helpers/helpers/route-params';
import transitionTo from 'ember-router-helpers/helpers/transition-to';
import urlFor from 'ember-router-helpers/helpers/url-for';
import { on } from '@ember/modifier';

<template>
  {{#if (isActive "parent.child")}}active{{/if}}
  <a href={{urlFor "parent.child"}}>child</a>
  <button type="button" {{on "click" (transitionTo "parent.child")}}>go</button>
  {{#let (routeParams "parent.child") as |rp|}}
    <a href={{rp.url}} class={{if rp.isActive "active"}}>child</a>
  {{/let}}

  {{! a helper without arguments must be invoked explicitly inside attributes }}
  <a href="{{(rootUrl)}}profile">profile</a>
</template>
```

TypeScript and Glint
------------------------------------------------------------------------------

Type declarations are included. In strict mode templates the imported helpers
are typed automatically. For loose mode (`.hbs`) templates, add the helpers to
the Glint registry:

```ts
import type RouterHelpersRegistry from 'ember-router-helpers/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends RouterHelpersRegistry {}
}
```
