	var rootPath = 'http://localhost/backend/public/';
	// create the module and name it ragamApp
	var ragamApp = angular.module('ragamApp', ['ngRoute', "ngAnimate"]);

	// configure our routes
	ragamApp.config(function($routeProvider) {
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : 'assets/partials/home.html',
				controller  : 'homeController'
			})
			// route for the events common page
			.when('/events', {
				templateUrl : 'assets/partials/events.html',
				controller  : 'eventsController'
			})
			// route for the event page
			.when('/events/:eventCode', {
				templateUrl : 'assets/partials/event.html',
				controller  : 'eventController'
			})
			// route for the workshops page
			.when('/workshops', {
				templateUrl : 'assets/partials/workshops.html',
				controller  : 'workshopsController'
			})
			// route for the workshop page
			.when('/workshops/:workshopCode', {
				templateUrl : 'assets/partials/workshop.html',
				controller  : 'workshopController'
			})
			// route for the proshows page
			.when('/proshows', {
				templateUrl : 'assets/partials/proshows.html',
				controller  : 'proshowController'
			})
			// route for the contact page
			.when('/workshops', {
				templateUrl : 'assets/partials/contact.html',
				controller  : 'workshopsController'
			});
	});
	ragamApp.animation('.reveal-animation', function() {
	  return {
	    enter: function(element, done) {
	      element.css('display', 'none');
	      element.fadeIn(1000, done);
	      return function() {
	        element.stop();
	      }
	    },
	    leave: function(element, done) {
	      element.fadeOut(1000, done)
	      return function() {
	        element.stop();
	      }
	    }
	  }
	});

	// create the controller and inject Angular's $scope
	ragamApp.controller('homeController', function($scope) {
	});

	// create the controller and inject Angular's $scope
	ragamApp.controller('mainController', function($scope, $location, $q, $timeout) {
			var support = { transitions: Modernizr.csstransitions },
				// transition end event name
				transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
				transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
				onEndTransition = function( el, callback ) {
					var onEndCallbackFn = function( ev ) {
						if( support.transitions ) {
							if( ev.target != this ) return;
							this.removeEventListener( transEndEventName, onEndCallbackFn );
						}
						if( callback && typeof callback === 'function' ) { callback.call(this); }
					};
					if( support.transitions ) {
						el.addEventListener( transEndEventName, onEndCallbackFn );
					}
					else {
						onEndCallbackFn();
					}
				},
				// the pages wrapper
				stack = document.querySelector('.pages-stack'),
				// the page elements
				//pages = [].slice.call(stack.children),
				// total number of page elements
				//pagesTotal = pages.length,
				// index of current page
				current = 0,
				// menu button
				menuCtrl = document.querySelector('button.menu-button'),
				// the navigation wrapper
				nav = document.querySelector('.pages-nav'),
				// the menu nav items
				navItems = [].slice.call(nav.querySelectorAll('.link--page')),
				// check if menu is open
				isMenuOpen = false;

			function init() {
				initEvents();
			}

			// event binding
			function initEvents() {
				// menu button click
				menuCtrl.addEventListener('click', toggleMenu);

				// navigation menu clicks
				navItems.forEach(function(item) {
					// which page to open?
					var pageid = item.getAttribute('href').slice(1);
					item.addEventListener('click', function(ev) {
						//ev.preventDefault();
						/*$q.when()
						.then(function() {
							var deferred = $q.defer();
							openPage();
							$timeout(function () { deferred.resolve(); }, 200);
							return deferred.promise;
							
						})
						.then(function() {
							$location.path(pageid);
						});
						//alert('/'+pageid);
						*/
						openPage();	
						$location.path(pageid);
					});
				});

				// keyboard navigation events
				document.addEventListener( 'keydown', function( ev ) {
					if( !isMenuOpen ) return; 
					var keyCode = ev.keyCode || ev.which;
					if( keyCode === 27 ) {
						closeMenu();
					}
				} );
			}

			// toggle menu fn
			function toggleMenu() {
				if( isMenuOpen ) {
					closeMenu();
					isMenuOpen = false;
				}
				else {
					openMenu();
					isMenuOpen = true;
				}
			}

			// opens the menu
			function openMenu() {
				// toggle the menu button
				classie.add(menuCtrl, 'menu-button--open')
				// stack gets the class "pages-stack--open" to add the transitions
				//classie.add(stack, 'pages-stack--open');
				// reveal the menu
				classie.add(nav, 'pages-nav--open');


					var page = document.querySelector('.page');
					page.style.WebkitTransform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50) + 'px)'; // -200px, -230px, -260px
					page.style.transform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50) + 'px)';

			}

			// closes the menu
			function closeMenu() {
				// same as opening the current page again
				openPage();
			}

			// opens a page
			function openPage() {
				var futurePage = document.querySelector('.page');

				// set transforms for the new current page
				futurePage.style.WebkitTransform = 'translate3d(0, 0, 0)';
				futurePage.style.transform = 'translate3d(0, 0, 0)';
				futurePage.style.opacity = 1;
				menuCtrl = document.querySelector('button.menu-button');
				// close menu..
				classie.remove(menuCtrl, 'menu-button--open');
				classie.remove(nav, 'pages-nav--open');
			}

			init();


	});


	ragamApp.controller('eventsController', function($scope,$http, $routeParams) {
		$scope.eventHeaderName = "";
		$scope.eventHeaderDescription = "";
		$http.get(rootPath + 'api/events').then(successCallback, errorCallback);
		function successCallback(response) {
			$scope.events = response.data[0];
			console.log($scope.events);
		};
		function errorCallback() {
			
		};
		$scope.changeEvent = function(name, description){
		    $scope.eventHeaderName = name;
		    $scope.eventHeaderDescription = description;
		};
		;( function( window ) {
	
	'use strict';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function CBPFWTabs( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	}

	CBPFWTabs.prototype.options = {
		start : 0
	};

	CBPFWTabs.prototype._init = function() {
		// tabs elems
		this.tabs = [].slice.call( this.el.querySelectorAll( 'nav > ul > li' ) );
		// content items
		this.items = [].slice.call( this.el.querySelectorAll( '.content-wrap > section' ) );
		// current index
		this.current = -1;
		// show current content item
		this._show();
		// init events
		this._initEvents();
	};

	CBPFWTabs.prototype._initEvents = function() {
		var self = this;
		this.tabs.forEach( function( tab, idx ) {
			tab.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				self._show( idx );
			} );
		} );
	};

	CBPFWTabs.prototype._show = function( idx ) {
		if( this.current >= 0 ) {
			this.tabs[ this.current ].className = this.items[ this.current ].className = '';
		}
		// change current
		this.current = idx != undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
		this.tabs[ this.current ].className = 'tab-current';
		this.items[ this.current ].className = 'content-current';
	};

	// add to global namespace
	window.CBPFWTabs = CBPFWTabs;

})( window );
			(function() {

				[].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
					new CBPFWTabs( el );
				});

			})();
	});

	ragamApp.controller('eventController', function($scope, $http, $routeParams, $sce) {
		if($routeParams.eventCode == null){
			console.log("Invalid Url");
		}
		var eventCode = $routeParams.eventCode;

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

	});
	ragamApp.controller('workshopsController', function($scope, $http) {
		$scope.message = 'Contact us! JK. This is just a demo.';

	});
	ragamApp.controller('workshopController', function() {

	});
	ragamApp.controller('proshowController', function() {
		var $main = $( '#pt-main' );
var $pages = $main.children( 'div.pt-page' );
var $iterate = $( '#iterateEffects' );
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
			current = 0;
		}
		outClass = 'pt-page-moveToTopEasing pt-page-ontop';
    	inClass = 'pt-page-moveFromBottom';
	}
	else {
		if( current > 0 ) {
			--current;
		}
		else {
			current = pagesCount - 1;
		}
		outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
		inClass = 'pt-page-moveFromTop';
	}
	
	var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' );
	

    $currPage.addClass(outClass);
    $nextPage.addClass(inClass);
    //$currPage.attr( 'class', $currPage.data( 'originalClassList' ) );
	//$nextPage.attr( 'class', $nextPage.data( 'originalClassList' ) + ' pt-page-current' );
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

$iterate.click(function() {
	if(isAnimating) {
		return false;
	}
	nextPage(true);
});
		$('body').on('mousewheel', function(e){
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
	});