demoApp.controller('MainController', function($scope, $http, $sessionStorage){

	var self = this;

	$scope.selectedColor = "";
	$scope.bgColors =[];
	$scope.cords = { left: 0, top: 0 };

	$scope.updateColor = function(color){
		$scope.selectedColor = color;
	}

	$scope.onSubmit = function(){
		var data = {
			color: $scope.selectedColor,
			userName: $scope.userName
		}

		$sessionStorage.currentUser = $scope.userName;

		$http.put('http://localhost:3001/api/users', data).success(function(response){
			if(response){
				$scope.users = response;
				self.getCurrentUser();	
			}
		});
	}

	self.updateUser = function(userId){
		var data = {
			cords : $scope.cords
		};

		$http.post('http://localhost:3001/api/user/'+ userId, data).success(function(response){
			if(response){
				$scope.users = response;
				self.getCurrentUser();	
			}
		});
	}

	self.getActiveUsers = function(){
		$http.get('http://localhost:3001/api/users').success(function(response){
			if(response){
				$scope.users = response;
				self.getCurrentUser();				
			}
		});

	}

	self.getCurrentUser = function(){
		angular.forEach($scope.users, function(user, index){
			if(user.userName == $sessionStorage.currentUser){
				user.isCurrentUser = true;
			}
		});

		window.setTimeout(function(){	
			$('.draggable').draggable({
				stop: function( event, ui ) {					
					var user_id = $(this).attr('id').split('_')[1];

				    if(ui){
						$scope.cords.left = ui.position.left;
						$scope.cords.top = ui.position.top;
				    }

				    self.updateUser(user_id);
				}
			});
		},1000);
	}

	self.getRandomColor = function() {
		   var letters = '0123456789ABCDEF'.split('');
		   var color = '#';

		   for (var i = 0; i < 6; i++ ) {
		       color += letters[Math.floor(Math.random() * 16)];
		   }

		   $scope.bgColors.push(color);
	}

	for(var i = 0; i<20; i++)
		self.getRandomColor();

	self.getActiveUsers();



});
