$(document).ready(function(){
	$(".navbar-toggle").hover(function(){
		$(".navbar-default .navbar-toggle .icon-bar").css('background-color', '#fff');
	});

	$(".navbar-toggle").on("mouseout", function(){
		$(".navbar-default .navbar-toggle .icon-bar").css('background-color', 'black');
	});
});