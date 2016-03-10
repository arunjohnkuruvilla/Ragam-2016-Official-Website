var rootPath = 'http://localhost/backend/public/';

var ragamApp = angular.module('ragamApp', ['ngRoute', "uiGmapgoogle-maps", 'ngSanitize', 'ui.select']);

//Routes
ragamApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'assets/partials/home.html',
			controller  : 'homeController'
		})
		.when('/events', {
			templateUrl : 'assets/partials/events.html',
			controller  : 'eventsController'
		})
		.when('/launch', {
			templateUrl : 'assets/partials/launch.html',
			controller  : 'launchController'
		})
		.when('/events/:eventCode', {
			templateUrl : 'assets/partials/event.html',
			controller  : 'eventController'
		})
		.when('/workshops', {
			templateUrl : 'assets/partials/workshops.html',
			controller  : 'workshopsController'
		})
		.when('/workshops/:workshopCode', {
			templateUrl : 'assets/partials/event.html',
			controller  : 'eventController'
		})
		.when('/contact', {
			templateUrl : 'assets/partials/contact.html',
			controller  : 'contactController'
		})
		.when('/gallery', {
			templateUrl : 'assets/partials/gallery.html',
			controller  : 'galleryController'
		})
		.when('/prodezza', {
			templateUrl : 'assets/partials/prodezza.html',
			controller  : 'prodezzaController'
		})
		.when('/proshows', {
			templateUrl : 'assets/partials/proshows.html',
			controller  : 'proshowsController'
		})
		.when('/sneharagam', {
			templateUrl : 'assets/partials/sneharagam.html',
			controller  : 'sneharagamController'
		});
});

ragamApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        v: '3.22', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});

ragamApp.controller('homeController', function($scope) {
	var $main = $('#pt-main');
	var $pages = $main.children( 'div.pt-page' );
	var pagesCount = $pages.length;
	var current = 0;
	var isAnimating = false;

	$pages.each( function() {
		var $page = $( this );
		$page.data( 'originalClassList', $page.attr( 'class' ) );
	});

	$pages.eq( current ).addClass( 'pt-page-current' );

	function nextPage(direction) {
		isAnimating = true;
		var $currPage = $pages.eq( current );
		var outClass = '', inClass = '';
		if(direction) {
			if( current < pagesCount - 1 ) {
				++current;
			}
			else {
				isAnimating = false;
				return;
			}
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
		}
		else {
			if( current > 0 ) {
				--current;
			}
			else {
				isAnimating = false;
				return;
			}
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
		}
	
		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' );
			
	    $currPage.addClass(outClass);
	    $nextPage.addClass(inClass);
		$pages.each( function() {
			var $page = $( this );
			setTimeout(function() {
				$page.attr( 'class', 'pt-page');
				$nextPage = $pages.eq( current ).addClass( 'pt-page-current' );
			}, 650);
		});
		setTimeout(function() {
			isAnimating = false;
		}, 750);
	}

	$('.fp-prev').click(function() {
		if(isAnimating) {
			return false;
		}
		nextPage(false);
	});
	$('.fp-next').click(function() {
		if(isAnimating) {
			return false;
		}
		nextPage(true);
	});
	$('#page-home').on('mousewheel', function(e){
		if(isAnimating) {
			return false;
		}
	    if(e.originalEvent.wheelDelta > 0) {
	        nextPage(true);
	    }
	    else {
	        nextPage(false);
	    }
	});

	document.onkeydown = checkKey;
	function checkKey(e) {
		if(isAnimating) {
			return false;
		}
	    e = e || window.event;
	    if (e.keyCode == '37') {
     	    nextPage(false);
		}
		else if (e.keyCode == '39') {
		    nextPage(true);
		}

	}


	/*var scene = document.getElementById('scene-home');
	var parallax = new Parallax(scene);*/


	var scene_events = document.getElementById('scene-events');
	var parallax_events = new Parallax(scene_events);

	var scene_sneharagam = document.getElementById('scene-sneharagam');
	var parallax_events = new Parallax(scene_sneharagam);

	var parallax_events = new Parallax(document.getElementById('scene-prodezza'));

	$('#back').css({"opacity": "0", "z-index": "-9999"});
});

ragamApp.controller('mainController', function($scope, $location, $q, $timeout, $rootScope) {
	$scope.$on('$viewContentLoaded', function(){
	    	$('#back').css({"opacity": "0", "z-index": "-9999"});
	  	});
		
});

ragamApp.controller('eventController', function($scope, $http, $routeParams, $sce) {
	$scope.teamMembers = {};
	$scope.teamMembers.members = [];
	if($routeParams.eventCode == null){
		console.log("Invalid Url");
	}
	var eventCode = $routeParams.eventCode;
	$http.get(rootPath + 'api/event/' + eventCode).then(successCallback, errorCallback);
	function successCallback(response) {
		$scope.eventDetails = response.data;
		console.log($scope.eventDetails);
		$('#back').css({"opacity": "0", "z-index": "-9999"});
	}
	function errorCallback() {
			
	}

	$scope.TrustDangerousSnippet = function(post) {
      	return $sce.trustAsHtml(post);
    }; 

    $scope.eventRegister = function() {
    	var team_members = [];
    	angular.forEach($scope.teamMembers.members, function(user) {
    		team_members.push(user.id);
    	});
    	console.log(team_members);
    	$http.get(rootPath + 'api/event_register', {
    		params: {
    			'event_code': $scope.eventDetails.event_code,
    			'team_members[]': team_members
    		}
    	}).then(eventRegisterSuccess, eventRegisterError);

    	function eventRegisterSuccess(response) {
    		data = response.data;

    		if(data.result = 'success') {
    			$scope.team_members = {};
    			
    			$('#register-box-loggedIn').css({'height': '0px'});

    			$('#register-success-message').html('<br>Event registration successfull. Your team ID is <strong>'+data.team_code+'</strong>');
		  		
		  		$('#register-box-success').css({'height':'100px'});

		  		$scope.updateProfile();
    		}
    		else if(data.result == 'fail' && data.reason == 'not_logged_in'){
		  		$('#event-register-messages').html('<br>Please login before you register for events.');
		  		//User may have logged out in another tab.
		  		
		  		$scope.loggedOutActions();
		  	}
		  	else if(data.result == 'fail' && data.reason == 'no_event'){
		  		$('#event-register-messages').html('<br>An error occured.');
				//The event is not valid OR it has been invalidated.			  		
		  	}
		  	else if(data.result == 'fail' && data.reason == 'already_registered'){
		  		$('#event-register-messages').html('<br>You are already registered for this event.');
		  		//The current user is already registered.
		  	}
		  	else if(data.result == 'fail' && data.reason == 'team_member_already_registered'){
		  		//A team member in the selected team has already registered.
		  		//The ID of the member is returned in data.existing_member
		  		$('#event-register-messages').html('<br>'+data.existing_member+' is already registered for this event.');
		  	}
		  	else if(data.result == 'fail' && data.reason == 'team_too_big'){
		  		$('#event-register-messages').html('<br>Your team size is too big.');
		  	}
		  	else if(data.result == 'fail' && data.reason == 'team_too_small'){
		  		$('#event-register-messages').html('<br>Your team size is too small.');
		  	}
    	}

    	function eventRegisterError() {

    	}
		
    }
	    
});

ragamApp.controller('workshopsController', function($scope, $http) {
	$http.get(rootPath + 'api/events').then(successCallback, errorCallback);
	function successCallback(response) {
		$scope.workshops = response.data[1];
		console.log($scope.workshops);
	};
	function errorCallback() {
		
	};
	$('#workshops-menu').click(function() {
		$('.overlay').toggleClass('open');
		$(this).addClass('menu-close');
		$('.overlay-close').addClass('menu-open');
	});
	$('.overlay-close').click(function() {
		$('.overlay').toggleClass('open');
		$(this).removeClass('menu-open');
		$('#workshops-menu').removeClass('menu-close');
	});
});
ragamApp.controller('workshopController', function($scope, $http, $routeParams) {
	if($routeParams.workshopCode == null){
		console.log("Invalid Url");
	}
	var eventCode = $routeParams.workshopCode;
	$http.get(rootPath + 'api/event/' + eventCode).then(successCallback, errorCallback);
	
	function successCallback(response) {
		$scope.eventDetails = response.data;
		console.log($scope.eventDetails);
	}
	function errorCallback() {
			
	}

	$scope.TrustDangerousSnippet = function(post) {
	   	return $sce.trustAsHtml(post);
	}; 
	$('.up-arrow').click(function() {
	   	$('.event-right').animate({ scrollTop: 0 }, 600);
	});
	$('#myCarousel').carousel({
  		interval: 40000
	});


	$('.carousel .item').each(function(){
	  	var next = $(this).next();
	  	if (!next.length) {
	    	next = $(this).siblings(':first');
	  	}

	  	next.children(':first-child').clone().appendTo($(this));

	  	if (next.next().length>0) {
	      	next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
	  	}
	  	else {
	      	$(this).siblings(':first').children(':first-child').clone().appendTo($(this)); 
	  	}
	});
});
ragamApp.controller('proshowsController', function($scope) {
	

	$('#back').css({"opacity": "0", "z-index": "-9999"});
});

ragamApp.controller('contactController', function($scope, uiGmapGoogleMapApi) {
	uiGmapGoogleMapApi.then(function(maps) {
    });
    $scope.map = { 
    	center: { latitude: 11.32, longitude: 75.93 }, 
    	zoom: 15, 
    };
    $scope.options = {
    	scrollwheel: false, 
    	mapTypeControl: true, 
    	styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
	};
	$('#back').css({"opacity": "0", "z-index": "-9999"});
});

ragamApp.controller('galleryController', function() {

});
ragamApp.controller('sponsorController', function() {

});

ragamApp.controller('eventsController', function($rootScope, $scope, $http) {
	$scope.eventHeaderName = "";
	$scope.eventHeaderDescription = "";
	$scope.category_content = "";
	$http.get(rootPath + 'api/events').then(successCallback, errorCallback);
	function successCallback(response) {
		$scope.tabsData = response.data[0];
		$scope.events = response.data[0];
		$scope.category_content = $scope.events.sub_categories[0].events;
		console.log($scope.events);

		$rootScope.isRouteLoading = false;

		

	};
	function errorCallback() {
	
	};
});

ragamApp.controller('prodezzaController', function($scope) {
	$('#back').css({"opacity": "0", "z-index": "-9999"});
});

ragamApp.controller('sneharagamController', function() {
	$('#back').css({"opacity": "0", "z-index": "-9999"});
});
ragamApp.controller('launchController', function() {
	$('#back').css({"opacity": "0", "z-index": "-9999"});
});