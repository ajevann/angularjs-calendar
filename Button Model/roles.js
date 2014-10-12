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

function prevMonth() {
    var month = (_globalDate.getMonth() == 0) ? 11 : _globalDate.getMonth() - 1;
    var year = (month == 11) ? _globalDate.getFullYear() - 1 : _globalDate.getFullYear();

    _globalDate = new Date(year, month, 1);
    _globalDateFormatted = formatDateHeading(_globalDate);
    
    return _globalDateFormatted;
}

function nextMonth() {
    var month = (_globalDate.getMonth() == 11) ? 0 : _globalDate.getMonth() + 1;
    var year = (month == 0) ? _globalDate.getFullYear() + 1 : _globalDate.getFullYear();

    _globalDate = new Date(year, month, 1);
    _globalDateFormatted = formatDateHeading(_globalDate);
    
    return _globalDateFormatted;
}

myApp.directive('directive', function(){
    return function(scope, element, attrs) {

        scope.$on('prev', function() {
            scope.heading = prevMonth();
            
            element.empty();
            element.append('<div>' + scope.heading + '</div>');
        });

        scope.$on('next', function() {
            scope.heading = nextMonth();
            
            element.empty();
            element.append('<div>' + scope.heading + '</div>');
        });
    };
});