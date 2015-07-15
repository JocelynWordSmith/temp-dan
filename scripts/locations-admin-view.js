var LocationsAdminPage = Parse.View.extend ({

  events: {
    'click .edit-profile-button'      : 'toggleEditAttribute',
    'click .save-profile-edit-button' : 'saveNewLocation'
  },

  template: _.template($('.locations-container-template').text()),
  createTemplate: _.template($('.create-locations-template').text()),
  currentTemplate: _.template($('.current-locations-template').text()),


    initialize: function() {
      if((Parse.User.current() === null) === true){
        router.navigate('#',{trigger:true})
      } else {
        $("html, body").scrollTop(0);
        $('.template-container').html(this.$el)
        this.$el.html(this.template());
        $('.template-container').css('padding-top', '80px');
        this.render();
        this.getLocations();
      }
    },

    render: function() {
      $('.create-locations-container').append(this.createTemplate());
    },

    getLocations: function () {
      $('.all-locations-container').html('');
      var that = this;
      var query = new Parse.Query('locationInstance');
      query.limit(1500);
      query.find({
        success: function(location){
          for(i=0;i<location.length;i++){
            $('.all-locations-container').prepend(that.currentTemplate({
              locationName: location[i].attributes.locationName,
              locationEmail: location[i].attributes.locationEmail,
              locationPhone: location[i].attributes.locationPhone,
              locationAddress: location[i].attributes.locationAddress,
            }));
          }
        },

        error: function(error) {
          console.log('threw an error');
        }
      })
    },

    toggleEditAttribute: function(){
      if($(event.target).hasClass('active')){
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', 'disabled');
        })
        // $('.save-profile-edit-button').css('opacity', 0);
        $(event.target).removeClass('active');
      }else {
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', false);
        })
        // $('.save-profile-edit-button').css('opacity', 1);
        $(event.target).addClass('active');
      }
    },

    saveNewLocation: function() {
      var that = this;

      var LocationInstance = Parse.Object.extend("locationInstance");
      var locationInstance = new LocationInstance();

      locationInstance.set({
        locationName: $('.company-input').val(),
        locationEmail: $('.email-input').val(),
        locationPhone: $('.phone-input').val(),
        locationAddress: $('.address-input').val()
      }).save().then(function(){
        that.getLocations();
      })
    }

});