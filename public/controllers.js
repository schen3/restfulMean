var myApp = angular.module('myApp', [])
myApp.controller('AppCtrl', function($scope,$http) {
	console.log("hello world from controller")
	$scope.getUser = function(){
		$http.get('/abc').success(function(res){
			$scope.contactlist = res;
			console.log(res)
		})
	}
	$scope.getUser();
	$scope.addUser = function(data){
		$http.post('/addUser',$scope.c);
		$scope.getUser();
	}
	$scope.remove = function(id){
		console.log(id)
		$http.delete('/contactlist/' + id)
		$scope.getUser();
		// 	.success(function(){
		// 		delete self.users[id]
		// 	})；
		// $scope.getUser();
	}
	$scope.edit = function(id){

		$http.get('/find/'+id).success(function(data){
			$scope.c = data;
		})
	}
	
	$scope.update = function(){
		console.log($scope.c._id)
		$http.put('/contactlist/'+$scope.c._id,$scope.c)
		$scope.getUser();
	}
	$scope.clean = function(){
		$scope.c = ""
	}
	
})