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
			Router.go('/projects');
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

Template.newproject.events({
	// Insert new project into database
	"submit .js-new-proj-panel":function(event){
		var jobno = event.target.new_job_no.value;
		var jobtitle = event.target.new_job_title.value;
		var pm = event.target.new_project_manager.value;
		var jobdate = event.target.new_project_date.value;
		
		var project = {
			jobno: jobno,
			jobname: jobtitle,
			jobmanager: pm,
			jobcreated: jobdate
		};
		
		// Update Projects Database
		Meteor.call("addNewProj", project);
		
		// Display updated list of projects
		Router.go('/projects');
		
		return false;
	},
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