<!DOCTYPE html>
<html ng-app="ragamApp" class="no-js">

<head>
    <!-- Stylesheets -->
    <!--<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="assets/css/font-awesome.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/custom.css" >-->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/demo.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/component.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/custom.css" >
	<link rel="stylesheet" type="text/css" href="assets/css/default.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/animations.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/tabs.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/tabstyles.css" />
	<script src="assets/js/modernizr-custom.js"></script>

</head>

<body ng-controller="mainController">

    <!-- navigation -->
	<nav class="pages-nav">
		<div class="pages-nav__item"><a class="link link--page" href="#events">Events</a></div>
		<div class="pages-nav__item"><a class="link link--page" href="#workshops">Workshops</a></div>
		<div class="pages-nav__item"><a class="link link--page" href="#proshows">Pro-Shows</a></div>
		<div class="pages-nav__item"><a class="link link--page" href="#prodezza">Prodezza</a></div>

		<div class="pages-nav__item pages-nav__item--small"><a class="link link--page link--faded" href="#page-buy">Where to buy</a></div>
		<div class="pages-nav__item pages-nav__item--small"><a class="link link--page link--faded" href="#page-blog">Blog &amp; News</a></div>
		<div class="pages-nav__item pages-nav__item--small"><a class="link link--page link--faded" href="#page-contact">Contact</a></div>
		<div class="pages-nav__item pages-nav__item--small"><a class="link link--page link--faded" href="#page-contact">Gallery</a></div>
		<div class="pages-nav__item pages-nav__item--small"><a class="link link--page link--faded" href="#page-contact">Sponsors</a></div>
		<div class="pages-nav__item pages-nav__item--social">
			<a class="link link--social link--faded" href="#"><i class="fa fa-twitter"></i><span class="text-hidden">Twitter</span></a>
			<a class="link link--social link--faded" href="#"><i class="fa fa-linkedin"></i><span class="text-hidden">LinkedIn</span></a>
			<a class="link link--social link--faded" href="#"><i class="fa fa-facebook"></i><span class="text-hidden">Facebook</span></a>
			<a class="link link--social link--faded" href="#"><i class="fa fa-youtube-play"></i><span class="text-hidden">YouTube</span></a>
		</div>
	</nav>
	<!-- /navigation-->
	<!-- pages stack -->
	<div class="pages-stack pages-stack--open reveal-animation" ng-view>
	</div>
	<!-- /pages-stack -->
	<div style="position:absolute;right:0;height:100%;width:60px;top:0;border-left:1px solid #000;z-index:1003">
		<button class="menu-button"><span>Menu</span></button>
		<button class="home-button"><a href="#"><i class="fa fa-home"></i></a></button>
	</div>
  
    <script type="text/javascript" src="//code.jquery.com/jquery-2.2.0.min.js"></script>
	<script src="assets/js/classie.js"></script>

	<!-- Scripts -->
    <script src="assets/js/angular.min.js"></script>
    <script src="assets/js/angular-route.js"></script>
    <script src="assets/js/angular-animate.js"></script>
    <script src="assets/js/script.js"></script>

</body>

</html>
