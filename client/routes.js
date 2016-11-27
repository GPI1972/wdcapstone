// The Archivist
// Routes definition

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('landing');
});

Router.route('/search', function () {
  this.render('search');
});

Router.route('/projects', function () {
  this.render('projects');
});

Router.route('/newproject', function () {
  this.render('newproject');
});

Router.route('/newdoc', function () {
  this.render('newdoc');
});