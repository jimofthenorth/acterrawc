Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('stations'); }
});

Router.route('/', {name: 'mapPage'});
