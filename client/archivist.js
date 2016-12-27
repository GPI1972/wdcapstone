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
//Meteor.subscribe("documents");


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

Template.newdoc.helpers({
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
	},
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

Template.newdoc.events({
	// Insert new document into database
	"submit .js-new-doc-panel":function(event){
		var jobno = $("#selected_j").val();
		var docref = event.target.new_doc_ref.value;
		var doctype = $("#selected_type").val();
		var doctitle = event.target.new_doc_title.value;
		var docdate = event.target.new_doc_date.value;
		var docauthor = event.target.new_doc_author.value;
		var doclocation = event.target.new_doc_location.value;
		
		var new_document = {
			jobno: jobno,
			docref: docref,
			doctype: doctype,
			doctitle: doctitle,
			docdate: docdate,
			docauthor: docauthor,
			doclocation: doclocation
		};
		
		// Update Documents Database
		// Documents.insert(new_document);
		Meteor.call("addNewDoc", new_document);
		
		//return false;
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