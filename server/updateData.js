Meteor.methods({
  updateData: function(json) {
    // Security checks
    if(!this.userId) {
      throw new Meteor.Error(403, "Must be logged in to perform this operation!");
    }
    if(!Meteor.users.findOne({_id: this.userId}).isAdmin) {
      throw new Meteor.Error(403, "Must have admin priviledges to perform this operation!");
    }

    // If somehow a way is found to bypass the above checks
    // we can at least check in the affirmative to see if user is admin
    if(Meteor.users.findOne({_id: this.userId}).isAdmin) {
      console.log(json.data[0]);  // test to see if we're getting data
      return "Success";

    }
  }
});
