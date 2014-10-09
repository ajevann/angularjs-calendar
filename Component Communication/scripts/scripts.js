var myModule = angular.module('myModule', []);

myModule.factory('mySharedService', function($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.prevMonth = function() {
        this.message = 'PREV';
        $rootScope.heading = 'Prev';
        $rootScope.$broadcast('handleBroadcast');
    }

    sharedService.nextMonth = function() {
        this.message = 'NEXT';
        $rootScope.heading = 'Next';  
        $rootScope.$broadcast('handleBroadcast');
    }

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
        $rootScope.heading = 'new heddings';
    };

    return sharedService;
});

myModule.directive('myComponent', function(mySharedService) {
    return {
        restrict: 'E',
        controller: function($scope, $attrs, mySharedService) {
            $scope.$on('handleBroadcast', function() {
                $scope.message = 'Directive: ' + mySharedService.message;
            });
        },
        replace: true,
        template: getTemplate()
    };
});

function getTemplate() {
    return '<input>';
}


function ControllerZero($scope, $rootScope, sharedService) {
    $scope.handleClick = function(msg) {
        sharedService.prepForBroadcast(msg);
    };

    $scope.prev = function() {
        sharedService.prevMonth();
    }

    $scope.next = function() {
        sharedService.nextMonth();
    }

    var currentDate  = new Date();
    $rootScope.heading = currentDate.getMonth() + ' ' +  currentDate.getYear();

    $scope.$on('handleBroadcast', function() {
        $scope.message = sharedService.message;
    });
}

function ControllerOne($scope, sharedService) {
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'ONE: ' + sharedService.message;
    });
}

function ControllerTwo($scope, sharedService) {
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'TWO: ' + sharedService.message;
    });
}

ControllerZero.$inject = ['$scope', '$rootScope', 'mySharedService'];
ControllerOne.$inject = ['$scope', 'mySharedService'];
ControllerTwo.$inject = ['$scope', 'mySharedService'];