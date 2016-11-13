//import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
	if (!Documents.findOne()){
		
		// Creating dummy admin user for testing purposes
		// username: 'Admin'
		// email: 'admin@test.com'
		// password: admin1234
		if (!Meteor.users.findOne()){
			var email = "admin@test.com";
			var username = "Admin";
			console.log("Creating admin user.");
			Meteor.users.insert({profile:{username:username},
			emails:[{address:email}],
			services:{ password:{"bcrypt":"$2a$10$YG4VhAFnNOy6Cj2o4xHfDODfYps8mv0H283jsiIJIGF6imKKZ8xYm"}}});
			
			var admin_id = Meteor.users.findOne()._id;
			Roles.addUsersToRoles(admin_id, [ 'superAdmin' ] );
		}
		
		
		
		// Creating dummy set of data for testing purposes
		console.log("No documents found yet. Creating starter data.");
		Documents.insert({
			jobno: "2010001",
			docref: "repsw01",
			doctype: "report",
			doctitle: "Storm Water Analysis Report",
			docdate: "15 March 2010",
			docauthor: "Tom",
			doclocation: "x:/archived projects/2010/2010001/reports/hydrology/"
		});
		
		Documents.insert({
			jobno: "2010001",
			docref: "repcp01",
			doctype: "report",
			doctitle: "Cost Plan 01",
			docdate: "15 April 2010",
			docauthor: "Dick",
			doclocation: "x:/archived projects/2010/2010001/reports/costs/"
		});
		
		Documents.insert({
			jobno: "2010001",
			docref: "CR-001",
			doctype: "drawing",
			doctitle: "General Road Layout",
			docdate: "15 May 2010",
			docauthor: "Harry",
			doclocation: "x:/archived projects/2010/2010001/drawings/"
		});
		
		Documents.insert({
			jobno: "2010001",
			docref: "CD-010",
			doctype: "drawing",
			doctitle: "Storm Water - Typical Drawings",
			docdate: "15 May 2010",
			docauthor: "Harry",
			doclocation: "x:/archived projects/2010/2010001/drawings/"
		});
		
		Documents.insert({
			jobno: "2011005",
			docref: "repdb01",
			doctype: "report",
			doctitle: "Design Brief",
			docdate: "15 November 2011",
			docauthor: "Tom",
			doclocation: "x:/archived projects/2011/2011005/reports/infra/"
		});
		
		Documents.insert({
			jobno: "2011005",
			docref: "CS-020",
			doctype: "drawing",
			doctitle: "Coordinated Services Layout",
			docdate: "10 December 2011",
			docauthor: "Harry",
			doclocation: "x:/archived projects/2011/2011005/drawings/"
		});
		
		Documents.insert({
			jobno: "2012023",
			docref: "repcr01",
			doctype: "report",
			doctitle: "Concept Report",
			docdate: "24 February 2012",
			docauthor: "Tom",
			doclocation: "x:/archived projects/2011/2012023/reports/design/"
		});
		
		Documents.insert({
			jobno: "2013009",
			docref: "repeia01",
			doctype: "report",
			doctitle: "EIA Report",
			docdate: "16 October 2013",
			docauthor: "Elle",
			doclocation: "x:/archived projects/2011/2013009/reports/eia/"
		});
	}
});

Meteor.publish( 'documents', function( search ) {
  check( search, Match.OneOf( String, null, undefined ) );

  let query      = {},
      projection = { limit: 10, sort: { jobno: -1 } };

  if ( search ) {
    let regex = new RegExp( search, 'i' );

    query = {
      $or: [
        { jobno: regex },
        { docref: regex },
        { doctype: regex },
		{ doctitle: regex },
		{ docdate: regex },
		{ docauthor: regex },
		{ doclocation: regex }
      ]
    };

    projection.limit = 100;
  }

  return Documents.find( query, projection );
});
