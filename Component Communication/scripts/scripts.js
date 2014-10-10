var myModule = angular.module('myModule', []);
var DATE = '';

myModule.factory('mySharedService', function($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.prevMonth = function() {
        this.message = 'PREV';
        DATE = 'THISPREVDATE';
        $rootScope.heading = 'Prev';
        $rootScope.$broadcast('handleBroadcast');
    }

    sharedService.nextMonth = function() {
        this.message = 'NEXT';
        DATE = 'THISNEXTDATE';
        $rootScope.heading = 'Next';  
        $rootScope.$broadcast('handleBroadcast');
    }

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
        $rootScope.heading = 'new heddings';
    };

    return sharedService;
});

myModule.directive('myComponent', function(mySharedService, $rootScope) {
    var messageToDeliver = 'blank';
    
    var getTemplate = function($compile, mess) {
        console.log('--template ' + DATE);
        return '<p>{{heading}}</p>';
    }

    return {
        restrict: 'AE',
        controller: function($scope, $attrs, mySharedService) {
            $scope.$on('handleBroadcast', function() {
                messageToDeliver = mySharedService.message;
                console.log(DATE);
                $scope.message = 'Directive: ' + mySharedService.message;
            });
        },
        replace: true,
        template: getTemplate()
    };
});

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
    $rootScope.month = 'September';
    $rootScope.year = '2014';

    $rootScope.heading = $rootScope.month + ' ' + $rootScope.year;

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