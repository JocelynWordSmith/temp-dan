var LandingPage = Parse.View.extend ({

  events: {
    "click .about": 'scrollAbout',
  },

  template: _.template($('.landing-page-template').text()),
  aboutTemplate: _.template($('.about-template').text()),

  initialize: function() {
    var that = this;
    $("html, body").scrollTop(0);
    $('.template-container').html(this.$el)
    this.$el.html(this.template());
    $('.template-container').css('padding-top', '50px');
    $('.footer-template-container').show();
    this.render();
    this.fillCompanyInfo()
  },

  render: function() {
    $('.template-container').append(this.aboutTemplate);
  },

  scrollAbout: function () {
    $('html,body').animate({
      scrollTop: $(".about-us").offset().top
    },200);
  },

  fillCompanyInfo: function () {
    var that = this;
    var query = new Parse.Query('user');
    query.limit(1500);
    query.find({
      success: function(user){
        $('.header-txt-lg').text(Parse.User.current().get('company'))
        $('.header-txt-p').text(Parse.User.current().get('tagline'))
        $('.about-title').text(Parse.User.current().get('aboutTitle'))
        $('.about-body').text(Parse.User.current().get('aboutBody'))
      },

      error: function(error){
        console.log(error + " it failed");
      }
    })
  }

});