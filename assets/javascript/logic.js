$(document).ready(function(){
    $('ul.tabs').tabs({
      swipeable : true,
      responsiveThreshold : Infinity

    });
    $('#modal').modal();
    $('#modal').modal('open'); 
  });
