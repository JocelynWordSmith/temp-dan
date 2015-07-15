var LocationsView = Parse.View.extend ({

  events: {
  },

  template: _.template($('.all-locations-template').text()),
  locationInstanceTemplate: _.template($('.current-locations-live-template').text()),


  initialize: function() {
    console.log('courses view');
    var that = this;
    $("html, body").scrollTop(0);
    $('.template-container').html(this.$el)
    this.$el.html(this.template());
    this.getCourses();

  },

  getCourses: function () {
    var that = this;
    var query = new Parse.Query('locationInstance');
    query.limit(1500);
    query.find({
      success: function(location){
        for(i=0;i<location.length;i++){
          $('.locations-list').prepend(that.locationInstanceTemplate({
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
  }
})