var myApp = angular.module('myApp', []);

var _globalDate = new Date();


var monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
var days = ['s', 'm', 't', 'w', 't', 'f', 's'];

var _globalDateFormatted = formatDateHeading(_globalDate);

function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function daysInMonth(date) {
    return [31, (isLeapYear(date.getYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][date.getMonth()];
}

function formatDateHeading (date) {
    var m = monthNames[date.getMonth()];
    return m.charAt(0).toUpperCase() + m.slice(1) + ' ' + date.getFullYear();
}

myApp.controller('controller', function($scope) {
    $scope.heading = _globalDateFormatted.toString();
    
    $scope.next = function() {
        $scope.$emit('next');
    };
    
    $scope.prev = function() {
        $scope.$emit('prev');
    };
});

function nextMonth() {
    return _globalDateFormatted;
}


myApp.directive('directive', function(){
    return function(scope, element, attrs) {

        scope.$on('prev', function() {
            element.empty();
            element.append('<div>September ' + _globalDate + ' 2014</div>');
            _globalDateFormatted = "SECOND";
        });

        scope.$on('next', function() {
            element.empty();
            element.append('<div>November ' + nextMonth() + ' 2014</div>');
        });
    };
});

myApp.directive('calendardirective', function(){
    return function(scope, element, attrs) {

        scope.$on('prev', function() {
            element.empty();
            element.append('<div>September ' + _globalDate + ' 2014</div>');
            _globalDateFormatted = "SECOND";
        });

        scope.$on('next', function() {
            element.empty();
            element.append('<div>November ' + nextMonth() + ' 2014</div>');
        });
    };
});


