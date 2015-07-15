var AdminPage = Parse.View.extend ({

  events: {
    'click .edit-profile-button'      : 'toggleEditAttribute',
    'click .save-profile-edit-button' : 'saveProfileEdit',
    'change #myFile'              : 'readURL',
    // 'click .input-group-addon'  : 'saveProfileEdit',
  },

  template: _.template($('.admin-template').text()),


    initialize: function() {
      if((Parse.User.current() === null) === true){
        router.navigate('#',{trigger:true})
      } else {
        $("html, body").scrollTop(0);
        $('.template-container').html(this.$el)
        this.$el.html(this.template());
        this.render();
        if(Parse.User.current().get('logo')){
          console.log(Parse.User.current().get('logo')._url);
          $('#logo-img').attr('src', Parse.User.current().get('logo')._url);
        }
        $('.footer-template-container').hide();
        $('.main-nav').hide();
        $('.template-container').css('padding-top', '80px');
        this.readURL;
      }
    },

    render: function() {
    },

    readURL: function(){
      console.log($('#myFile')[0]);
      var x = document.getElementById("myFile");
      var txt = "";
      if ('files' in x) {
        var Reader = new FileReader();
        Reader.readAsDataURL(x.files[0]);

        Reader.onload = function (Event) {
            document.getElementById("logo-img").src = Event.target.result;
        };
      } 
      else {
          if (x.value == "") {
              txt += "Select one or more files.";
          } else {
              txt += "The files property is not supported by your browser!";
              txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
          }
      }
    },

    toggleEditAttribute: function(){
      if($(event.target).hasClass('active')){
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', 'disabled');
        })
        $('.save-profile-edit-button').css('opacity', 0);
        $(event.target).removeClass('active');
      }else {
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', false);
        })
        $('.save-profile-edit-button').css('opacity', 1);
        $(event.target).addClass('active');
      }
    },

    saveProfileEdit: function () {
      var that = this;
      var photoUpload = function() {
        //original photo upload function

        var fileUploadControl = $("#myFile")[0];
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          var name = "photo.jpg";
         
          return new Parse.File(name, file);
        } else if (fileUploadControl.files.length === 0) {
          return Parse.User.current().get('photo');
        };
      }
      Parse.User.current().set({
        company:      ($('.company-input').val().length != 0 ? $('.company-input').val() : Parse.User.current().get('company')),
        email:        ($('.email-input').val().length != 0 ? $('.email-input').val() : Parse.User.current().get('email')),
        tagline:      ($('.tagline-input').val().length != 0 ? $('.tagline-input').val() : Parse.User.current().get('tagline')),
        logo:         (photoUpload() != undefined ? photoUpload() : Parse.User.current().get('logo')),
      }).save();
      console.log(photoUpload());
      $('.edit-profile-button').click();
      $('.profile-edit').val('');
      $('.company-input').prop('placeholder', Parse.User.current().get('company')),
      $('.email-input').prop('placeholder', Parse.User.current().get('email'))
      $('.tagline-input').prop('placeholder', Parse.User.current().get('tagline'))
    },

});