(function ($) {
  $(document).ready(function () {
    // you awesome code goes here
    var oneWeekAgo;
    var oneDayAgo;
	oneWeekAgo=Date.now()-14*24*60*60*1000;
	oneDayAgo=Date.now()-2*24*60*60*1000;
	var peopleObject=[{Name:'Lester'},{Name:'Kate'}];
	var timelineObjectArray=[];
	var ObjectId=1;

	//alert(oneWeekAgo);
    $.getJSON( '/db/_all_docs?startkey="event:' + oneWeekAgo + '"&endkey="event:9417996505591"&include_docs=true' , function( indata ) {
			  //alert(JSON.stringify(data));
			  var jsonEvents=indata;
			  var eventsArray=jsonEvents.rows;

			  // create a data set with groups
			  //var names = ['John', 'Alston', 'Lee', 'Grant'];
			  var groups = new vis.DataSet();
			  for (var g = 0; g < peopleObject.length; g++) {
			    groups.add({id: g, content: peopleObject[g].Name});
			  }
			  
			  for(var i=0;i<eventsArray.length;i++){
			  	var eventId=eventsArray[i].id;
			  	var eventDate=eventId.split(':').pop();
			  	var eventDataObj=new Date(parseInt(eventDate));
			  	var theDate=eventDataObj.toString();
			  	for (var j=0;j<peopleObject.length;j++) {


				  	//if registered, create new object
				  	if (eventsArray[i].doc.Name===peopleObject[j].Name) {
				  		
				  		if (eventsArray[i].doc.Message==='Registered') {

				  			peopleObject[j].start=theDate;
				  			peopleObject[j].content=peopleObject[j].Name;

				  		} else {
				  			

				  			//add if there was a start date
				  			if (peopleObject[j].start) {
								peopleObject[j].end=theDate;
								peopleObject[j].id=ObjectId;
								ObjectId=ObjectId+1;
								var newObject={id:peopleObject[j].id, content:'', start:peopleObject[j].start, end: peopleObject[j].end, group:j};
								peopleObject[j].start=null;
								peopleObject[j].end=null;
								peopleObject[j].content=null;
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
				var items = new vis.DataSet(timelineObjectArray);



			    // Configuration for the Timeline
			    var options = {start:oneDayAgo,end: Date.now(), groupOrder:'content'};
			    var margin={};
				margin.item={};
				margin.item.horizontal=0;
				options.margin=margin;
			    //alert(container.innerHTML);
			    // Create a Timeline

			    var timeline = new vis.Timeline(container);
				timeline.setOptions(options);
				timeline.setGroups(groups);
				timeline.setItems(items);
			    //alert(container.innerHTML);
			});

  });
})(jQuery);
