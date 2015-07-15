var CoursesView = Parse.View.extend ({

  events: {
  },

  template: _.template($('.courses-page-template').text()),
  courseInstanceTemplate: _.template($('.course-instance-template').text()),


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
    var query = new Parse.Query('courseInstance');
    query.limit(1500);
    query.find({
      success: function(course){
        for(i=0;i<course.length;i++){
          $('.courses-template-list-container').prepend(that.courseInstanceTemplate({
            courseTitle: course[i].attributes.courseTitle,
            courseInstructor: course[i].attributes.courseInstructor,
            courseDescription: course[i].attributes.courseDescription,
            courseImage: course[i].attributes.logo._url
          }));
        }
      },

      error: function(error) {
        console.log('threw an error');
      }
    })
  },
});