// The Archivist
// Client Code

//import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';
//
//import './main.html';


//////
// Subscriptions
//////
Meteor.subscribe("projects");


//////
// Template Helpers
//////

Template.header.helpers({
	// check that a user is logged in
	isLogged:function(){
		var curr_user = Meteor.userId();

		if (curr_user){
			return true;
		}
		return false;
	},
});

Template.projects.helpers({
	projects:function(){
		return Projects.find({}, {sort: {jobno: -1}});
	},
});


//////
// Event Handlers
//////

Template.header.events({
	// show help/instructions
	"click .js-show-about":function(){
		$("#aboutModal").modal("show");		
	}
});


//////
// Misc Functions
//////

Tracker.autorun(function () {
  var userId = Meteor.userId();
  if (!userId) {
    Router.go('/');  // go 'home' on logout
  }
});