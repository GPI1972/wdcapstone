// The Archivist
// Client Code

//import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';
//
//import './main.html';


//////
// Template Helpers
//////

Template.landing.helpers({
	// check that a user is logged in
	isLogged:function(){
		var curr_user = Meteor.userId();

		if (curr_user){
			return true;
		}
		return false;
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

