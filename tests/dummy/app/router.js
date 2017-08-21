import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('parent', { path: '/' }, function() {
    this.route('child');
    this.route('sister');
    this.route('brother');
  });
  this.route('dynamic', { path: '/dynamic/:dynamic_id' });

  this.route('asia');
  this.route('europe', {path: '/europe/:country'});
  this.route('america', function() {
    this.route('south');
  });
});

export default Router;
