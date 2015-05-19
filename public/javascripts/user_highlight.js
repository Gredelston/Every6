$(document).ready(function() {
  // If we're logged in, then prettify the userbox.
  // If not, don't. duh
  $.get('loggedIn').done(function(user, status) {
    var userBox = $('.user:contains("' + user + '")');
    
    userBox.each(function(i) {
      if ($(this).text().trim() === user) {
        $(this).css('background-color', '#2ecc71')
      }
    });

  });
});