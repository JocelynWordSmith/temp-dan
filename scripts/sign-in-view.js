var SignInPage = Parse.View.extend ({

  events: {
    'click .submit-sign-in' : 'signIn',
    'keydown .password-input' : 'enterSignIn',
    'click .close'      : 'closeAlert',
  },

  template: _.template($('.sign-in-template').text()),

    initialize: function() {
      $("html, body").scrollTop(0);
      $('.template-container').html(this.$el)
      this.$el.html(this.template());      
      this.render();
      $('.username-input').focus();
    },

    render: function() {
    },

    signIn: function(e){
      this.logIn()
    },

    enterSignIn: function(e){
      var key = e.which
      if(key == 13) {
        this.signIn()
      }
    },

    logIn: function(){
      var username = $('.username-input').val();
      var password = $('.password-input').val();

      var that = this;

      var failed = true;
      _.each($('.sign-in-field'), function(field){
        if($(field).val().length < 1){
          console.log("it's empty, foo!");
          console.log(failed);
        } else {
          failed = false;
          console.log(failed)
          return failed;
        }
      })
      if(failed == false){
        Parse.User.logIn(username, password, {
          success: function(user){
            router.navigate('#admin',{trigger:true})
            console.log('logged in');
          },
          error: function(user, error){
            $('.username-input').val('');
            $('.password-input').val('');
            $('.username-input').focus();
            $('.alert-danger').css({visibility: 'visible', height: 'auto', 'margin-bottom': '20px', padding: '15px'});
            $('.alert-danger').html('<button type="button" class="close closeAlert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Oh snap!<span class="alert-link">Make sure you filled out everything </span>and try submitting again.');
             _.each($('.sign-in-field'), function(field){
               $(field).css('border', '1px solid red')
             })
             $('.alert-danger').html('');
            $('.alert-danger').html('<button type="button" class="close closeAlert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Oh Snap!, it looks like your <span class="alert-link">username</span> or <span class="alert-link">password</span> is incorrect.');
          }
        });
      } else {
          $('.alert-danger').css({visibility: 'visible', height: 'auto', 'margin-bottom': '20px', padding: '15px'});
           _.each($('.sign-in-field'), function(field){
             $(field).css('border', '1px solid red')
           })
        }
    },

    closeAlert: function () {
      $('.alert-danger').css({visibility: 'hidden', height: '0px', 'margin-bottom': '0px', padding: '0px', overflow: 'hidden'});
    },

});