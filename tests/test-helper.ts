import EmberApp from 'ember-strict-application-resolver';
import { StrictResolver } from 'ember-strict-application-resolver/strict-resolver';
import EmberRouter from '@ember/routing/router';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start as qunitStart, setupEmberOnerrorValidation } from 'ember-qunit';
import { setTesting } from '@embroider/macros';
import IsActiveHelper from 'ember-router-helpers/helpers/is-active';
import ReplaceWithHelper from 'ember-router-helpers/helpers/replace-with';
import RootURLHelper from 'ember-router-helpers/helpers/root-url';
import RouteParamsHelper from 'ember-router-helpers/helpers/route-params';
import TransitionToHelper from 'ember-router-helpers/helpers/transition-to';
import UrlForHelper from 'ember-router-helpers/helpers/url-for';

class Router extends EmberRouter {
  location = 'none';
  rootURL = '/';
}

// like ember-resolver, so the router enables `foo_loading` style substates
class ModuleBasedResolver extends StrictResolver {
  moduleBasedResolver = true;
}

class TestApp extends EmberApp {
  modules = {
    './router': Router,
    // what the addon's app re-exports provide in a classic app
    './helpers/is-active': IsActiveHelper,
    './helpers/replace-with': ReplaceWithHelper,
    './helpers/root-url': RootURLHelper,
    './helpers/route-params': RouteParamsHelper,
    './helpers/transition-to': TransitionToHelper,
    './helpers/url-for': UrlForHelper,
  };

  Resolver: EmberApp['Resolver'] = {
    create: ({ namespace }) =>
      new ModuleBasedResolver(namespace.modules, namespace.plurals),
  };
}

Router.map(function () {
  this.route('parent', { path: '/' }, function () {
    this.route('child');
    this.route('sister');
    this.route('brother');
  });
  this.route('dynamic', { path: '/dynamic/:dynamic_id' });
});

export function start() {
  setTesting(true);
  setApplication(
    TestApp.create({
      autoboot: false,
      rootElement: '#ember-testing',
    }),
  );
  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
