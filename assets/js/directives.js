var rootPath = 'http://localhost/backend/public/';

ragamApp.directive('overlayOpenButton', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
			$(element).click(function() {
				$('.overlay').addClass('open');
				$('.overlay-menu').addClass('menu-close');
				$('.overlay-close').addClass('menu-open');
			});
		}
	}
});
ragamApp.directive('overlayCloseButton', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
			$(element).click(function() {
				$('.overlay').removeClass('open');
				$('.overlay-close').removeClass('menu-open');
				$('.overlay-menu').removeClass('menu-close');
			});
		}
	}
});
ragamApp.directive('expandingDiv', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
			$(element).hover(function() {
				
				$('.category-tab').css({'height':'9%'});
				$(this).css({'height':'46%'});
			});
			$(element).click(function() {
				$('.category-tab').css({'height':'9%'});
				$(this).css({'height':'46%'});
			});
			$('page').mouseleave(function() {
				$('.category-tab').css({'height':'12.5%'});
			})

		} 
	}
});
ragamApp.directive('countdown', ['Util', '$interval', function (Util, $interval) {
    return {
        restrict: 'A',
        scope: { date: '@' },
        link: function (scope, element) {
            var future;
            future = new Date(scope.date);
            $interval(function () {
                var diff;
                diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                return element.html(Util.dhms(diff));
            }, 1000);
        }
    };
}]);
ragamApp.factory('Util', [function () {
    return {
        dhms: function (t) {
            var days, hours, minutes, seconds;
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;
            return [
                days + '<span class="days time">days</span>'+
                hours + '<span class="hours time">hours</span>'+
                minutes + '<span class="minutes time">minutes</span>'+
                seconds + '<span class="seconds time">seconds</span>'
            ];
        }
    };
}]);
ragamApp.directive("owlCarousel", function() {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
			  // provide any default options you want
				var defaultOptions = {
					afterInit : function(elem){
				      var that = this
				      that.owlControls.prependTo(elem)
				    }
				};
				var customOptions = scope.$eval($(element).attr('data-options'));
				// combine the two options objects
				for(var key in customOptions) {
					defaultOptions[key] = customOptions[key];
				}
				// init carousel
				$(element).owlCarousel(defaultOptions);
			};
		}
	};
})
.directive('owlCarouselItem', [function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}]);

ragamApp.directive('openDetailsButton', function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element, attributes) {
			$(element).hover(function() {
				$('#'+attributes.element).addClass('details-open');
			});	
			$(element).click(function() {
				$('#'+attributes.element).addClass('details-open');
			});	
		}
	};
});
ragamApp.directive('closeDetailsButton', function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element, attributes) {
			$(element).click(function() {
				$('#'+attributes.element).removeClass('details-open');
			});	
		}
	};
});

ragamApp.directive('expandingHorizontalDiv', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
			$(element).hover(function() {
				$('.layer').css({'width':'8%'});
				$('.layer').css({'-webkit-filter':'grayscale(1)'});
				$('.layer').css({'filter':'grayscale(1)'});
				$(this).css({'width':'60%'});
				
				$(this).css({'-webkit-filter':'grayscale(0)'});
				$(this).css({'filter':'grayscale(0)'});
			});

		} 
	}

})
ragamApp.directive('routeLoadingIndicator', function($rootScope){
	return {
	    restrict:'E',
	    template:'<div id="back"></div>',
	    link:function(scope, elem, attrs){
	        scope.isRouteLoading = false;

	      	$rootScope.$on('$routeChangeStart', function(){
	        	scope.isRouteLoading = true;
	        	$('#back').css({"opacity": "1", "z-index": "9999"});
	      		});

		      /*$rootScope.$on('$routeChangeSuccess', function(){
		        scope.isRouteLoading = false;
		        $('#back').css({"opacity": "0", "z-index": "-9999"});
		      });*/
	    }
	  };
	});
ragamApp.directive('registrationDivOpen', function() {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attributes) {
			$(element).click(function() {
				//$('#register-box').css({'height':'600px'});
				if(scope.eventDetails.registration.status == 'not_logged_in') {
					$('#register-box-notLoggedIn').css({'height':'100px'});
				}
				if(scope.eventDetails.registration.status == 'not_registered') {
					$('#register-box-loggedIn').css({'height':'600px'});
				}
				if(scope.eventDetails.registration.status == 'registered') {
					$('#register-box-registered').css({'height':'100px'});
				}
				 
			});
		}
	}
});
ragamApp.directive('registerBoxClose', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
			$(element).click(function() {
				$('.register-box').css({'height':'0px'});
			});
		}
	}
});
ragamApp.directive('teamAutocomplete', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {

		}
	}
});
ragamApp.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});
ragamApp.directive('uiAutocomplete', function() {
  	return {
    	restrict:'E',
    	scope: false,
    	controller: ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  			$scope.disabled = false;
  			$scope.searchEnabled = undefined;
  			$scope.counter = 0;
  			$scope.someFunction = function (item, model){
    			$scope.counter++;
    			$scope.eventResult = {item: item, model: model};
  			};
 
  			
  			$scope.funcAsync = function(query) {
	    		$http.get(rootPath + 'api/users?q=' + query).then(
	    			function (response) {
	      				if(response.result != 'too_small_query') {
	      					$scope.people = response.data.users;
	      				}
	      				
	    			},
	    			function () {
	      				console.log('ERROR!!!');
	    			}
	  			);
			};


		}],

		link: function(scope, element, attributes) {
  		}	
	}
});


ragamApp.directive('overlayDiv', function() {
	return {
		restrict: 'E',
		templateUrl: './assets/partials/templates/overlay.html',
		controller: ['$scope', '$http', '$location', function($scope, $http, $location) {
			$scope.updateProfile = function() {
				$http.get(rootPath + 'api/user').then(loginSuccess, loginError);

				function loginSuccess(response) {
					if(response.data.status == 'logged_in'){
						$scope.data = response.data;
						$scope.loggedInActions(response.data);
					}
					else {
						$scope.loggedOutActions()
					}
					
				}

				function loginError() {

				}
			}
			
			$scope.logout = function() {
				$http.get(rootPath + 'api/user/logout').then(logoutSuccess, logoutError);
			}

			function logoutSuccess(response) {
				console.log(response);
				//$scope.loggedOutActions();
				$location.path('/events');
			}
			function logoutError() {
				alert("There was an error logging you out. Please try again.");
			}
		}],
		link: function(scope, element, attributes) {
			scope.loggedInActions = function(data) {
				$('#registration-button').hide();
				$('#user-profile').show();
				console.log(data);
				var event_data = '';

				$('#registration-data-name').html(data.user.name);
				$('#registration-data-id').html('RAG'+data.user.id);
				$('#registration-data-phone').html(data.user.phone);
				$('#registration-data-email').html(data.user.email);
				$('#registration-data-college').html(data.user.college);

				// Clear team members field on login.
				$('#team_members_select').val(null).trigger("change");
				var has_event=false;
				data.user.events.forEach(function(this_event){
					has_event=true;

					event_data+='<tr>';

					event_data+= '<td>'+this_event.name+'</td>'+
								 '<td>'+this_event.team_code+'</td>';

					var team_members = '';
					var flag = 0;
					this_event.team_members.forEach(function(team_member){
						if(flag==1)
							team_members+=', ';
						flag = 1;
						team_members+= team_member.name + ' (RAG'+team_member.id+')';
					});

					event_data+= '<td>'+team_members+'</td>';

					if(this_event.owner_id == data.user.id)
						event_data+='<td><a href="#" class="pure-button button-error action-event-deregister" data-event_code="'+this_event.event_code+'">Delete Entire Team</a></td>';
					else
						event_data+='<td><a href="#" class="pure-button button-error action-event-deregister" data-event_code="'+this_event.event_code+'">Leave Team</a></td>';

					event_data+='</tr>';
				});

				if(!has_event)
					event_data+='<tr><td colspan="4">Not registered for any events.</td></tr>';

				$('#registration-table-events').html(event_data);
			}

			scope.loggedOutActions = function() {
				$('#user-profile').hide();
				$('#registration-button').show();

			}

			scope.updateProfile();

		}
	}
});

