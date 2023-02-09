<?php // Bukvus: Nazar Tokar, 2013—2017 // Tokar.ua

$to = "your@email.com"; // вкажіть тут свою пошту
function gF($s){
	$s = substr((htmlspecialchars($_GET[$s])), 0, 350);
	if (strlen($s) > 1) {
		return $s;
	}
}

$t = array( (gf("txt")), (gf("err")), (gf("url")));

$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Bukvus 1.1.0 <noreply@".($_SERVER["HTTP_HOST"]).">\r\n";

$title = "Помилка [". $t[2] ."]";
$mess = $t[0];
if ($t[1]) {
	$mess .= "<hr>Коментар: ".$t[1];
}
$mess .= "<hr>".$t[2];

mail($to, $title, $mess, $headers);

if ($t[0]) {
	$t[1] = "ok";
	$t[2] = "Дякуємо, дані про помилку надіслано";
}
?>{
"result":  "<? echo $t[1]; ?>",
"message": "<? echo $t[2]; ?>"
}
