var app = angular.module("app", []);

var _globalDate = new Date();

app.controller('mastercontroller', ['$scope', '$rootScope', function($scope, $rootScope) {
  
  $scope.heading = _globalDateFormatted.toString();

  $scope.next = function() {
    $scope.$emit('next');
  };

  $scope.prev = function() {
    $scope.$emit('prev');
  };

}]);

app.directive('directive', function(){
  return {
    replace: true,
    link : function(scope, element, attrs) {

      scope.$on('prev', function() {
        scope.heading = prevMonth();
        
        element.empty();
        element.append('<div>' + getTemplate(_globalDate.getMonth(), _globalDate.getFullYear(), []) + '</div>');
      });

      scope.$on('next', function() {
        scope.heading = nextMonth();
        
        element.empty();
        element.append('<div>' + getTemplate(_globalDate.getMonth(), _globalDate.getFullYear(), []) + '</div>');
      });
    },

    template: '<div>' + getTemplate(_globalDate.getMonth(), _globalDate.getFullYear(), []) + '</div>'
  };
});


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

function prevMonth() {
    var month = (_globalDate.getMonth() == 0) ? 11 : _globalDate.getMonth() - 1;
    var year = (month == 11) ? _globalDate.getFullYear() - 1 : _globalDate.getFullYear();

    _globalDate = new Date(year, month, 1);
    
    console.log('prev : ' + month + ' ' + year + ' ' + _globalDate.toString());

    _globalDateFormatted = formatDateHeading(_globalDate);
    
    return _globalDateFormatted;
}

function nextMonth() {
    var month = (_globalDate.getMonth() == 11) ? 0 : _globalDate.getMonth() + 1;
    var year = (month == 0) ? _globalDate.getFullYear() + 1 : _globalDate.getFullYear();

    _globalDate = new Date(year, month, 1);

    console.log('next : ' + month + ' ' + year + ' ' + _globalDate.toString());

    _globalDateFormatted = formatDateHeading(_globalDate);
    
    return _globalDateFormatted;
}

function getTemplate(month, year, dates) {

  var currentDate = new Date();

  console.log('a : ' + currentDate.getMonth() + ' ' + currentDate.getFullYear());

  var month = ((isNaN(month) || month == null) ? currentDate.getMonth() + 1 : month);
  var year = (isNaN(year) || year == null) ? currentDate.getFullYear() : year;
  var firstDay = new Date(year, month, 1);
  var startDay = firstDay.getDay();
  var monthLength = daysInMonth(firstDay);
  var heading = formatDateHeading(firstDay);

  _globalDate = firstDay;

  console.log('b : ' + month + ' ' + year);

  if (!dates || !dates.length) dates = [currentDate.getDate()];

  var tpl = [
    '<div class="cal">',
    '<table class="cal">',
    //'<tr><th colspan="7"><h2>' + heading + '</h2></th></tr>',
    '<tr>'];

  days.forEach(function (day) {
    tpl.push('<td class="cal-head">' + day.toUpperCase() + '</td>');
  });
  tpl.push('</tr>');

  var day = 1,
    rows = Math.ceil((monthLength + startDay) / 7);

  for (i = 0; i < rows; i++) {
    var row = ['<tr>'];
    for (j = 0; j < 7; j++) {
      row.push('<td>');
      if (day <= monthLength && (i > 0 || j >= startDay)) {
        //if (dates.indexOf(day) != -1) row.push('<div class="cal-day cal-highlight" data-cal="' + year + '/' + month + '/' + day + '">');
        //if (dates.indexOf(day) == -1) row.push('<div class="cal-day" data-cal="' + year + '/' + month + '/' + day + '">');
        row.push(day);
        
        row.push('<div class="cal-day" data-cal="' + year + '/' + month + '/' + day + '">');
        row.push(loadDailyRequests(year, month, day));
        row.push('</div>');
        day++;
      }
      row.push('</td>');
    }
    row.push('</tr>');
    tpl.push(row.join(''));
  }
  tpl.push('</table></div>');

  return tpl.join('');
}