import Service from '@ember/service';
import { on } from '@ember/modifier';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import type EmberRouter from '@ember/routing/router';
import isActive from 'ember-router-helpers/helpers/is-active';
import replaceWith from 'ember-router-helpers/helpers/replace-with';
import rootUrl from 'ember-router-helpers/helpers/root-url';
import routeParams from 'ember-router-helpers/helpers/route-params';
import transitionTo from 'ember-router-helpers/helpers/transition-to';
import urlFor from 'ember-router-helpers/helpers/url-for';

module('template tag usage', function (hooks) {
  setupRenderingTest(hooks);

  test('helpers can be imported and invoked', async function (assert) {
    // eslint-disable-next-line ember/no-private-routing-service
    const router = this.owner.lookup('router:main') as EmberRouter & {
      setupRouter(): void;
    };
    router.setupRouter();

    const options = { queryParams: { foo: 'bar' } };

    await render(
      <template>
        <span id="active">{{isActive "parent.child"}}</span>
        <span id="url">{{urlFor "parent.child" options}}</span>
        {{! without arguments a helper has to be invoked explicitly in attributes }}
        <a id="root" href="{{(rootUrl)}}profile">Profile</a>
        {{#let (routeParams "parent.child") as |rp|}}
          <a
            id="params"
            href={{rp.url}}
            class={{if rp.isActive "active"}}
          >Child</a>
        {{/let}}
      </template>,
    );

    assert.dom('#active').hasText('false');
    assert.dom('#url').hasText('/child?foo=bar');
    assert.dom('#root').hasAttribute('href', '/profile');
    assert.dom('#params').hasAttribute('href', '/child');
  });

  test('transition helpers work with the on modifier', async function (assert) {
    const calls: unknown[][] = [];
    this.owner.register(
      'service:router',
      class extends Service {
        transitionTo(...args: unknown[]) {
          calls.push(['transitionTo', ...args]);
        }
        replaceWith(...args: unknown[]) {
          calls.push(['replaceWith', ...args]);
        }
      },
    );

    await render(
      <template>
        <button
          id="t"
          type="button"
          {{on "click" (transitionTo "parent.child")}}
        >T</button>
        <button
          id="r"
          type="button"
          {{on "click" (replaceWith "parent.child")}}
        >R</button>
      </template>,
    );
    await click('#t');
    await click('#r');

    assert.deepEqual(calls, [
      ['transitionTo', 'parent.child'],
      ['replaceWith', 'parent.child'],
    ]);
  });

  // only type-checked (`pnpm lint:types`), never rendered
  test('signatures reject invalid usage', function (assert) {
    const invalid = <template>
      {{! @glint-expect-error url-for requires a route name }}
      {{(urlFor)}}
      {{! @glint-expect-error a route name is a string }}
      {{urlFor 1}}
      {{! @glint-expect-error is-active returns a boolean }}
      {{#each (isActive "parent") as |x|}}{{x}}{{/each}}
    </template>;

    assert.ok(invalid);
  });
});
