alert("hi");
(function( ) {
	var jQuery;
	
	if(window.jQuery === undefined || window.jQuery.fn.jquery !== '1.8.3') {
		var script_tag = document.createElement('script');
		script_tag.setAttribute("type", "text/javascript");
		script_tag.setAttribute("src", "http://googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");
		if(script_tag.readyState){
			script_tag.readyState.onreadystatechange = function () {
				if (this.readyState == 'complete' || this.readyState == 'loaded'){
					scriptLoadHandler();
				}
			}
			
		} else {
			script_tag.onload = scriptLoadHandler;
		}
		
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
	} else {
	
	jQuery = window.jQuery;
	main();
	}
	
	fucntion scriptLoadHandler() {
		jQuery = window.jQuery.noConflict(true);
		
		main();
	}
	
	function main(){
		jQuery(document).ready(function($){
			
			$.ajax({
				type: "GET",
				url: "http://api.flickr.com/services/feeds/photos_public.gne?tags=pony,guild%20wars,halo,games,computers&tagmode=any",
				dataType: "xml",
				success: function(xml) {
					$(xml).find('entry').each(function(){
						var title = $(this).find('title').text();
						var link = $(this).find('link').text();
						var content = $(this).find('content').text();
						addItem(title, link, content);
					}
				}	
			
			});
			
			function addItem(title, link, content){
				$('<div class="items" id="link_'+title+'"></div>').html('<a href="'+url+'">'+title+'</a>' + content).appendTo('#twit-widget-container');
			}
			
		
		});
	}
	

})();