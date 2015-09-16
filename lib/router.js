Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe('stations'); }
});

Router.route('/', {name: 'mapPage'});
