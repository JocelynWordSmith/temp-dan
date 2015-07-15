var SignUpPage = Parse.View.extend({

  events: {
    'click .submit-sign-up'   : 'signUp',
    'keydown .email-input'    : 'enterSignUp',
    'click .close'      : 'closeAlert',
  },

  template: _.template($('.sign-up-template').text()),

  initialize: function() {
    var that = this;
    $("html, body").scrollTop(0);
    $('.template-container').html(this.$el)
    this.$el.html(this.template());
  },

  enterSignUp: function(e){
    console.log(e.which);
    var key = e.which
    if(key == 13) {
      this.signUp()
    }
  },

  signUp: function () {
      var company = $('.username-input').val();
      var password = $('.password-input').val();
      var email = $('.email-input').val();

    // setting the new user attributes

      var user = new Parse.User();
        user.set({
          'username': userName,
          'password': password,
          'email'   : email,
        })

      console.log(user);
      var failed = true;
      _.each($('.sign-up-field'), function(field){
        if($(field).val().length < 1){
          console.log("it's empty, foo!");
        } else {
          failed = false;
          return failed;
        }
      })
      console.log(failed);

      // other fields can be set just like with Parse.Object
      if(failed === false){
        var that = this;
        user.signUp(null, {
          success: function(user) {
            console.log(user)
            user.save();
            $('.template-container').html('');            
            that.remove();
            router.swap(new AdminPage())
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            console.log("Error: " + error.code + " " + error.message);
          }
        })
      } else {
        $('.alert-danger').css({visibility: 'visible', height: 'auto', 'margin-bottom': '20px', padding: '15px'});
         _.each($('.sign-up-field'), function(field){
           $(field).css('border', '1px solid red')
         })
      }
  },

  closeAlert: function () {
    $('.alert-danger').css({visibility: 'hidden', height: '0px', 'margin-bottom': '0px', padding: '0px', overflow: 'hidden'});
  },


})