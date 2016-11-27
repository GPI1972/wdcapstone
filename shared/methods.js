// The Archivist
// Meteor methods

Meteor.methods({
	// Method to add a project
	addNewProj:function(proj){
		return Projects.insert(proj);
	},
	
	// Method to add a document
	addNewDoc:function(doc){
		return Documents.insert(doc);
	},
})