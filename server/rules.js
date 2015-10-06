// We don't want regular users of the site to be able to make accounts
Accounts.config({
  forbidClientAccountCreation: true
});

// Don't allow users to change data on the users collection
Meteor.users.deny({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});

/*
 * For now admin user only needs to parse the csv
 * and corresponding json is uploaded
 * Database inserts, updates, upserts, removals are all
 * done server side using a Meteor.method and the json
 *
 * If in the future it is necessary for admin to be able
 * to update directly (allow changing a station name or
 * attribute from within admin panel) then uncomment
 * these rules accordingly
 */

Stations.allow({
  insert: function(userId) {
    // allow only if admin user
    // if(Meteor.users.findOne({_id: userId}).isAdmin) {
    //   return true;
    // }
    return false;
  },
  update: function(userId) {
    // if(Meteor.users.findOne({_id: userId}).isAdmin) {
    //   return true;
    // }
    return false;
  }
});

Stations.deny({
  insert: function(userId) {
    // deny if not admin user
    // if(Meteor.users.findOne({_id: userId}).isAdmin) {
    //   return false;
    // }
    return true;
  },
  update: function(userId) {
    // if(Meteor.users.findOne({_id: userId}).isAdmin) {
    //   return false;
    // }
    return true;
  },
  remove: function() {
    return true;
  }
});
