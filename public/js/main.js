(function ($) {
  $(document).ready(function () {
    // you awesome code goes here
    var oneWeekAgo;
    var oneDayAgo;
	oneWeekAgo=Date.now()-7*24*60*60*1000;
	oneDayAgo=Date.now()-1*24*60*60*1000;
	var peopleObject=[{Name:'Lester'},{Name:'Kate'}];
	var timelineObjectArray=[];
	var ObjectId=1;
	var currentObject;
	//alert(oneWeekAgo);
    $.getJSON( '/db/_all_docs?startkey="event:' + oneWeekAgo + '"&endkey="event:9417996505591"&include_docs=true' , function( indata ) {
			  //alert(JSON.stringify(data));
			  var jsonEvents=indata;

			  var eventsArray=jsonEvents.rows;
			  
			  for(var i=0;i<eventsArray.length;i++){
			  	var eventId=eventsArray[i].id;
			  	var eventDate=eventId.split(':').pop();
			  	var eventDataObj=new Date(parseInt(eventDate));
			  	var theDate=eventDataObj.toString();
			  	for (j=0;j<peopleObject.length;j++) {


				  	//if registered, create new object
				  	if (eventsArray[i].doc.Name==peopleObject[j].Name) {
				  		currentObject=peopleObject[j];
				  		if (eventsArray[i].doc.Message=='Registered') {

				  			currentObject.start=theDate;
				  			currentObject.content=currentObject.Name;

				  		} else {
				  			

				  			//add if there was a start date
				  			if (currentObject.start) {
								currentObject.end=theDate;
								currentObject.id=ObjectId;
								ObjectId=ObjectId+1;
								var newObject={id:currentObject.id, content:currentObject.content, start:currentObject.start, end: currentObject.end };

								timelineObjectArray.push(newObject);
				  			}
				  		}
				  	}
				}

			  	//in unregistered add object to array

			  	}
			  
			 
			    // DOM element where the Timeline will be attached
			    var container = document.getElementById('mytimeline');

			    // Create a DataSet with data (enables two way data binding)
			    /*var data = new vis.DataSet([
			      {id: 1, content: 'item 1', start: '2013-04-20'},
			      {id: 2, content: 'item 2', start: '2013-04-14'},
			      {id: 3, content: 'item 3', start: '2013-04-18'},
			      {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
			      {id: 5, content: 'item 5', start: '2013-04-25'},
			      {id: 6, content: 'item 6', start: '2013-04-27'}
			    ]);*/
				var data = new vis.DataSet(timelineObjectArray);

			    // Configuration for the Timeline
			    var options = {start:oneDayAgo,end: Date.now()};
			    //alert(container.innerHTML);
			    // Create a Timeline
			    var timeline = new vis.Timeline(container, data, options);
			    //alert(container.innerHTML);
			});

  });
})(jQuery);
