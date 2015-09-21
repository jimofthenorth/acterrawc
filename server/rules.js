Accounts.config({
  forbidClientAccountCreation: true
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});
