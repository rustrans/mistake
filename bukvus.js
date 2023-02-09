/**
* Bukvus: Nazar Tokar // Tokar.ua
**/

(function bukvus(){
	jQuery('<div>', {id: 'bukvus'}).prependTo('html');

	function gs() { // get selection
	    var t = "";
	    if (window.getSelection) {
	        t = window.getSelection().toString();
	    } else if (document.selection && document.selection.type != "Control") {
	        t = document.selection.createRange().text;
	    }
	    return t;
	}

	function sm(m){ // show message
		jQuery("#bukvus").hide();
		jQuery("#bukvus").html(m);
		jQuery("#bukvus").show();
		setTimeout(function() {
			jQuery("#bukvus").hide();
		}, 3000);
	}

	function se(t){ // send error
		if (t.length < 4) {
			sm("Ви не вибрали текст");
		} else if(t.length > 200) {
			sm("Забагато символів, виділіть менше");
		} else {
			var err = prompt("В чому помилка?");
			jQuery.getJSON("/bukvus/index.php", {
				contentType: "text/html; charset=utf-8",
				err: err,
				url: location.href,
				txt: t
			}).done(function(data) {
				if (data.result == "ok") {
					sm(data.message);
				} else {
					sm(data.error);
				}
			}).fail(function(){
				sm("Помилка в налаштуваннях");
			});
		}
	}
	jQuery(document).keydown(function(e){
		if (e.keyCode == 13 && e.ctrlKey) { // отправка
			if (jQuery('#bukvus').is(':visible')) {
				jQuery("#bukvus").hide();
				jQuery("#bukvus").html('');
			}
			se(gs());
		}
	});
})();
