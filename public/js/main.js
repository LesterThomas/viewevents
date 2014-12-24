(function ($) {
  $(document).ready(function () {
    // you awesome code goes here

    $.getJSON( '/db/_all_docs?include_docs=true' , function( data ) {
			  //alert(JSON.stringify(data));
			  var jsonEvents=data;
			  var eventsArray=jsonEvents.rows;
			  var eventHTML='<ul>';
			  for(var i=0;i<eventsArray.length;i++){
			  	var eventId=eventsArray[i].id;
			  	var eventDate=eventId.split(':').pop();
			  	var eventDataObj=new Date(parseInt(eventDate));
			  	var theDate=eventDataObj.toString();
			  	eventHTML=eventHTML + '<li> id:' + eventsArray[i].id + ', date:' + theDate + ', name:' + eventsArray[i].doc.Name + ', message:' + eventsArray[i].doc.Message + '</li>';
			  }
			  eventHTML=eventHTML + '</ul>';
			  $('#Events').html(eventHTML);
			});

  });
})(jQuery);
