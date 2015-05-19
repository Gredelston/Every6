// Gives an element a red highlighted border
var highlight = function (elem) {
  $(elem).attr("highlighted","true");
  $(elem).addClass("highlighted");
}

// Removes the highlighted border from an element
var unhighlight = function (elem) {
  $(elem).attr("highlighted","false");
  $(elem).removeClass("highlighted");
}

// If the element is not highlighted, highlight it.
// If it already is, remove its highlight.
var toggle_highlight = function(elem) {
  highlighted = $(elem).hasClass("highlighted");
  if ( highlighted === true ) {
    console.log("UNHIGHLIGHTING");
    unhighlight(elem);
  } else if ( highlighted === false) {
    console.log("HIGHLIGHTING");
    highlight(elem);
  } else {
    console.log("ERROR: " + elem + " has \"highlighted\" attr " + highlighted);
  }
}

$(document).ready(function() {
  // When you click on a user,
  // toggle the user's highlighting
  // and all of their twotes' highlightings.
  $('.user').click(function() {
    var username = $(this).attr('username');
    toggle_highlight($(this))
    
    // For each twote,
    // if the that twote's user is the one we're looking for,
    // toggle its highlighting.
    var twote_user;
    $(".twote").each( function(index, twote) {
      twote_user = $(twote).attr("username");
      if (twote_user === username) {
        toggle_highlight(twote);
      }
    });
  });
});