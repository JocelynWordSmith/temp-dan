var CoursesAdminPage = Parse.View.extend ({

  events: {
    'click .edit-profile-button'      : 'toggleEditAttribute',
    'change #myFile'              : 'readURL',
    'click .add-course'           : 'addCourse',
    'click .cancel-add'           : 'cancelAddCourse',
    'click .save-course-update-button' : 'updateCourse',
    'click .delete-class' : 'deleteCourse',
    'click .save-new-edit-button' : 'saveProfileEdit'
  },

  template: _.template($('.courses-admin-template').text()),
  detailTemplate: _.template($('.course-detail-template').text()),
  courseInstanceTemplate: _.template($('.add-course-detail-template').text()),


    initialize: function() {
      if((Parse.User.current() === null) === true){
        router.navigate('#',{trigger:true})
      } else {
        $("html, body").scrollTop(0);
        $('.template-container').html(this.$el)
        this.$el.html(this.template());
        this.render();
        if(Parse.User.current().get('logo')){
          $('#logo-img').attr('src', Parse.User.current().get('logo')._url);
        }
        $('.template-container').css('padding-top', '80px');
        this.readURL;
        this.getCourses();
      }
    },

    render: function() {
    },

    getCourses: function () {
      var that = this;
      var query = new Parse.Query('courseInstance');
      query.limit(1500);
      query.find({
        success: function(course){
          for(i=0;i<course.length;i++){
            $('.courses-list-container').prepend(that.detailTemplate({
              courseTitle: course[i].attributes.courseTitle,
              courseInstructor: course[i].attributes.courseInstructor,
              courseDescription: course[i].attributes.courseDescription,
              courseImage: course[i].attributes.logo._url,
              courseId: course[i].id
            }));
          }
        },

        error: function(error) {
          console.log('threw an error');
        }
      })
    },

    readURL: function(){
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
          $('.delete-class').prop('disabled', true);
          $('.save-course-update-button').prop('disabled', true);
        })
        $(event.target).removeClass('active');
      }else {
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', false);
          $('.delete-class').prop('disabled', false);
          $('.save-course-update-button').prop('disabled', false);


        })
        $(event.target).addClass('active');
      }
    },

    toggleAddCourseEdit: function(){
      if($(event.target).hasClass('active')){
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', 'disabled');
        })
        $(event.target).removeClass('active');
      }else {
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', false);
        })
        $(event.target).addClass('active');
      }
    },

    saveProfileEdit: function () {
      var that = this;

      var CourseInstance = Parse.Object.extend("courseInstance");
      var courseInstance = new CourseInstance();

      var photoUpload = function() {
        //original photo upload function

        var fileUploadControl = $("#myFile")[0];
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          var name = "photo.jpg";
         
          return new Parse.File(name, file);
        } 
      }
      courseInstance.set({
        courseTitle:      ($('.course-title-input').val().length != 0 ? $('.course-title-input').val() : Parse.User.current().get('courseTitle')),
        courseInstructor:        ($('.course-instructor-input').val().length != 0 ? $('.course-instructor-input').val() : Parse.User.current().get('courseInstructor')),
        courseDescription:    ($('.course-description-textarea').val().trim().length != 0 ? $('.course-description-textarea').val() : Parse.User.current().get('courseDescription')),
        logo:         (photoUpload() != undefined ? photoUpload() : Parse.User.current().get('logo')),
      }).save().then(function(){
        that.cancelAddCourse()
        $('.courses-list-container').html('')
        that.getCourses();
      });

      $('.edit-profile-button').click();
      $('.profile-edit').val('');
      $('.course-title-input').prop('placeholder', Parse.User.current().get('courseTitle')),
      $('.course-instructor-input').prop('placeholder', Parse.User.current().get('courseInstructor'))
      $('.course-description-textarea').prop('placeholder', Parse.User.current().get('courseDescription'))
    },

    updateCourse: function (){
      var courseId = event.target.id;
      var photoUpload = function() {
        //original photo upload function

        var fileUploadControl = $("#myFile")[0];
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          var name = "photo.jpg";
         
          return new Parse.File(name, file);
        } 
      }
      _.each($('.course-detail-container'), function(courseContainer){
          if(courseContainer.id == courseId){
            var query = new Parse.Query('courseInstance');
            query.equalTo('objectId', courseId)
            query.limit(1500);
            query.find({
              success: function(course){

                course[0].set({
                  courseTitle: ($(courseContainer).find('input.course-title-input')[0].value.length > 0 ?  $(courseContainer).find('input.course-title-input')[0].value : course[0].get('courseTitle')),
                  courseInstructor: ($(courseContainer).find('input.course-instructor-input')[0].value.length > 0 ?  $(courseContainer).find('input.course-instructor-input')[0].value : course[0].get('courseInstructor')),
                  courseDescription: ($(courseContainer).find('textarea.course-description-textarea')[0].value.length > 0 ?  $(courseContainer).find('textarea.course-description-textarea')[0].value : course[0].get('courseDescription')),
                  logo: (photoUpload() != undefined ? photoUpload() : course[0].get('logo'))
                }).save().then(function(){
                  router.swap( new CoursesAdminPage() );
                })
              },
              error: function(error){
                console.log('no course was found');
              }
            })
            
          }
      })
    },

    addCourse: function(){
      $('.add-course').text('CANCEL').addClass('cancel-add').removeClass('add-course')
      $('.course-add-container').prepend(this.courseInstanceTemplate);
      this.toggleEditAttribute();
    },

    deleteCourse: function(){
      var that = this;
      var thisCourse = $(event.target).prop('id');
      var query = new Parse.Query('courseInstance');
      query.limit(1500);
      query.equalTo('objectId', thisCourse);
      query.find({
        success: function(course){
          course[0].destroy()
          $('div#' + thisCourse + '').remove();
          that.toggleEditAttribute();

        },

        error: function(error){
          console.log('unable to destroy');
        }
      })
    },

    cancelAddCourse: function() {
      $('.cancel-add').text('ADD +').addClass('add-course').removeClass('cancel-add')
      $('.course-add-container').html('')
      this.toggleEditAttribute();
      $("html, body").scrollTop(0);
    }

});