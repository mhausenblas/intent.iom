$(function(){
	

	$('#webpage').click(function(){
		$('#init').hide();
		$('#result').show();
		$('#srcurl').html("<a href='example/webpage.html'>Source</a>:");
		
		getActionsForThing("http://schema.org/WebPage");
		
		
		$.get('example/webpage.html', function(data) {
			var srccode = $("<pre/>").text(data);
			$('#src').html(srccode);
		})
	});
	
	$('#mediaobject').click(function(){
		$('#init').hide();
		$('#result').show();
		$('#srcurl').html("<a href='example/mediaobject.html'>Source</a>:");

		getActionsForThing("http://schema.org/ImageObject");

		$.get('example/mediaobject.html', function(data) {
			var srccode = $("<pre/>").text(data);
			$('#src').html(srccode);
		})
	});
	
});

function getActionsForThing(thing){
	
	$.getJSON('intents.js', function(data) {
		var intents = data;
		$.getJSON('map.js', function(mdata) {
			var actions = mdata[thing];
			var buf = "<ul>";
			for (var i = 0; i < actions.length; i++) {
				var action = actions[i];
				// buf += "<li><a href='javascript:invokeShare(\"example/webpage.html\")'>" + intents[action].title + "</a> (<a href='"+ action +"' title='"+ intents[action].description +"'>definition</a>)</li>";
				buf += "<li>" + intents[action].title + " (<a href='"+ action +"' title='"+ intents[action].description +"'>definition</a>)</li>";
			}
			$('#actions').html(buf + "</ul>");
			
		})
	});
}

// function invokeShare(withURL) {
// 	var intent = new WebKitIntent("http://webintents.org/share", "text/uri-list", withURL);
// 	var onSuccess = function(data) { /* woot */ };
// 	var onError = function(data) { /* boooo */ };
// 	window.navigator.webkitStartActivity(intent, onSuccess, onError);
// }