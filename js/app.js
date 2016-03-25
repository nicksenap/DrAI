var protoType = angular.module('doctorPrototype', ['ui.router']);

protoType.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/step1");

	$stateProvider
		.state('step1', {
			url: '/step1',
			templateUrl: 'step1.html',
			controller: 'MainCtrl'
		})
		.state('step2', {
			url: '/step2',
			templateUrl: 'step2.html',
			controller: 'MainCtrl'
		})
		.state('result', {
			url: '/result',
			templateUrl: 'result.html',
			controller: 'MainCtrl'
		});
}]);


protoType.controller('MainCtrl', ['$state','$scope', function($state, $scope) {
    $scope.symptoms = [];
    $scope.userInput;
    $scope.initialSymptoms = ['Headache', 'Fever', 'Wrist pain', 'Shortness of breath', 'Difficulty swallowing', 'Poor eyesight', 'Disorientation', 'Nosebleeds', 'Difficulty sleeping'];
    $scope.nextSymptom = 'Shortness of breath';
    $scope.finalResults = ['Asthma', 'Common cold'];
    $scope.questionString = 'Are you experiencing this symptom too?';
    $scope.resultString = 'Based on the information you have provided us with, you may want to do some further research on the following conditions:';

    $scope.click =function(){
        $scope.nextSymptom = 'Difficulty swallowing';
        $scope.questionString = 'Okay, how about this symptom?';
    }

    $scope.submit = function(){
        $state.go('step2');
    };

    $scope.remove = function(ob){
        /*$scope.symptoms.splice(ob.$index,1);
        var symptom = $scope.symptoms[ob.$index];*/
        
        $scope.symptoms.push("hahah"); 
    }

    $scope.searchClick = function(obj){
        var result = [];
        searchString = $scope.userInput.toLowerCase();
        angular.forEach($scope.initialSymptoms, function(item){
            if(item.toLowerCase().indexOf(searchString) !== -1){
            result.push(item);
        }
        });
        var symptom = result.sort()[obj.$index];
        $scope.symptoms.push(symptom);
        
        /*$scope.submit();*/
    }


  }]);

protoType.filter('searchFor', function(){
    return function(arr, searchString){
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.toLowerCase().indexOf(searchString) !== -1){
            result.push(item);
        }
        });
        if(searchString.length == 0)
            return []
        else
            return result;
    };
});
