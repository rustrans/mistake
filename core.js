function gs() {
    var t = "";
    if (window.getSelection) {
        t = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        t = document.selection.createRange().text;
    }
    return t;
}

function sm(m){
	$("#bukvus").hide();
	$("#bukvus").html(m);
	$("#bukvus").fadeIn("fast");
	setTimeout(function() {
		$("#bukvus").fadeOut("slow");
	}, 3000);
}

function se(t){
	if (t.length < 4) {
		sm("Ви не виділили текст");
	} else if(t.length > 300) {
		sm("Занадто багато тексту, виділіть менше");
	} else {
		$.getJSON("/js/bukvus/index.php", {
			contentType: "text/html; charset=utf-8",
			url: location.href, string: t
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

$(document).keydown(function(e){
	if (e.keyCode == 13 && e.ctrlKey) { // надсилання
			if ($('#bukvus').is(':visible')) {
			$('#bukvus').fadeOut('fast');
			$('#bukvus').html('');
		} else {
			$('<div>', {id: 'bukvus'}).prependTo('html');
		}
		se(gs());
	}
});
