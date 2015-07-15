var AppRouter = Parse.Router.extend({
	
	routes: {
		''										: 'landingPage',
		'about'								: 'aboutPage',
		'courses'							: 'coursesPage',
		'locations'						: 'locationsPage',
		'sign-in'							: 'signInPage',
		'sign-up'							: 'signUpPage',
		'admin'								: 'adminPage',
		'admin/about'					: 'adminAboutPage',
		'admin/courses'				: 'adminCoursesPage',
		'admin/instructors'		: 'adminInstructorsPage',
		'admin/locations'			: 'adminLocationsPage'
	},

	initialize: function(){
		// this is for the swap function to work
		this.navOptions = null;
		this.currentView = null;
	},

	landingPage: function() {
		this.swap( new LandingPage({router: this}) );
		new NavbarView({router: this});
		new FooterView({router: this});
		$('.nav-template-container').show();
	},

	aboutPage: function() {
		this.swap( new AboutView({router: this}) );
		new NavbarView({router: this});
		new FooterView({router: this});
	},

	coursesPage: function() {
		this.swap( new CoursesView({router: this}) );
		new NavbarView({router: this});
		new FooterView({router: this});
	},

	locationsPage: function() {
		this.swap( new LocationsView({router: this}) );
		new NavbarView({router: this});
		new FooterView({router: this});
	},

	signInPage: function() {
		this.swap( new SignInPage({router: this}) );
		new NavbarView({router: this});
		new FooterView({router: this});
	},

	signUpPage: function() {
		this.swap( new SignUpPage({router: this}) );
		new NavbarView({router: this});
		new FooterView({router: this});
	},

	adminPage: function() {
		this.swap( new AdminPage({router: this}));
		$('.nav-template-container').hide()
	},

	adminAboutPage: function () {
		this.swap( new AboutAdminPage({router: this}));
	},

	adminCoursesPage: function () {
		this.swap( new CoursesAdminPage({router: this}));
	},

	adminLocationsPage: function () {
		this.swap( new LocationsAdminPage({router: this}));
	},

	swap: function (view) {
		// this replaces the current app-view with the new view, and gets rid of the old one and stops it from listening for events and stuff
		if (this.currentView) {this.currentView.remove()};
		this.currentView = view;
	},



});