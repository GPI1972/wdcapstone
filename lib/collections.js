// The Archivist
// Collections definition
Documents = new Mongo.Collection('documents');
Projects = new Mongo.Collection('projects');

// create document index
if ( Meteor.isServer ) {
	Documents._ensureIndex({
		jobno: 1,
		docref: 1,
		doctype: 1,
		doctitle: 1,
		docdate: 1,
		docauthor: 1,
		doclocation: 1
	});
	//console.log("Index created");
}

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

// Create schema for input validation
let DocumentsSchema = new SimpleSchema({
  'jobno': {
    type: String,
    label: 'Job number'
  },
  'docref': {
    type: String,
    label: 'Document reference'
  },
  'doctype': {
    type: String,
    label: 'Document category'
  },
  'doctitle': {
    type: String,
    label: 'Document title'
  },
  'docdate': {
    type: String,
    label: 'Document issue date'
  },
  'docauthor': {
    type: String,
    label: 'Document author'
  },
  'doclocation': {
    type: String,
    label: 'Document archived folder'
  },
});

Documents.attachSchema( DocumentsSchema );

