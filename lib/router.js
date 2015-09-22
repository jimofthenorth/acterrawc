Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('stations'); }
});

Router.route('/admin', {name: 'admin'});
Router.route('/', {name: 'mapPage'});
