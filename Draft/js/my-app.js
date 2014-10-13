var app = angular.module("app", ["checklist-model"]);

var _globalDate = new Date();

app.controller('mastercontroller', ['$scope', '$rootScope', function($scope, $rootScope) {

  $scope.colorKeys = [
    {text:'Informational', color:'#FFF380'},
    {text:'Draft', color:'#FFFFFF'},
    {text:'Approved', color:'#4AA02C'},
    {text:'Closed', color:'#736F6E'},
    {text:'Awaiting Approval', color:'#F88017'},
    {text:'RCW', color:'#E73131'},
    {text:'Change spanning multiple days', color:'#FFFFFF', content:'*', contentColor:'black'},
    {text:'Emergency Change', color:'#FFFFFF', content:'R', contentColor:'red'} 
  ];

  $scope.filterOptions = [
    {id:'BND', text:'Brand'},
    {id:'COM', text:'Commerce'},
    {id:'FND', text:'Foundation'},
    {id:'SPT', text:'Nike'},
    {id:'TOI', text:'Tech Ops Infrastructure'},
    {id:'TOT', text:'Tech Ops Tools'},
    {id:'NORMAL', text:'Normal'},
    {id:'EMERGENCY', text:'Emergency'},
    {id:'INFO', text:'Information'},
    {id:'ROUTINE', text:'Routine'},
    {id:'ABT', text:'AB Testing/TMS'},
    {id:'ROC', text:'Recurring Operational Changes'},
    {id:'RCW', text:'RCWs'},
    {id:'CLSD', text:'Closed'}
  ];

  $scope.user = {
    filterOptions: ['BND', 'CLSD']
  };

  $scope.checkAll = function() {
    $scope.user.filterOptions = $scope.filterOptions.map(function(item) { return item.id; });
  };

  $scope.uncheckAll = function() {
    $scope.user.filterOptions = [];
  };

  $scope.checkFirst = function() {
    $scope.user.filterOptions.splice(0, $scope.user.filterOptions.length); 
    $scope.user.filterOptions.push(1);
  };
  
  $scope.heading = _globalDateFormatted.toString();

  $scope.next = function() {
    $scope.$emit('next');
  };

  $scope.prev = function() {
    $scope.$emit('prev');
  };

  $scope.init= function() {
    console.log('loading');
    $scope.$emit('load');
  };

  $scope.init();
}]);

app.directive('directive', function(){
  return function(scope, element, attrs) {

    scope.$on('load', function() {
      console.log('loaded');
      scope.heading = "LOADED";
      element.empty();
      element.append('<div>' + getTemplate(_globalDate.getMonth(), _globalDate.getFullYear(), [], scope) + '</div>');
    });

    scope.$on('prev', function() {
      scope.heading = prevMonth();
      
      element.empty();
      element.append('<div>' + getTemplate(_globalDate.getMonth(), _globalDate.getFullYear(), [], scope) + '</div>');
    });

    scope.$on('next', function() {
      console.log('a ' + _globalDate);
      scope.heading = nextMonth();
      console.log('b ' + _globalDate);
      
      element.empty();
      element.append('<div>' + getTemplate(_globalDate.getMonth(), _globalDate.getFullYear(), [], scope) + '</div>');
    });
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

function getTemplate(month, year, dates, scope) {

  var currentDate = new Date();

  var month = ((isNaN(month) || month == null) ? currentDate.getMonth() + 1 : month) - 1;
  var year = (isNaN(year) || year == null) ? currentDate.getFullYear() : year;
  var firstDay = new Date(year, month, 1);
  var startDay = firstDay.getDay();
  var monthLength = daysInMonth(firstDay);
  var heading = formatDateHeading(firstDay);

  if (!dates || !dates.length) dates = [currentDate.getDate()];

  var tpl = [
    '<div class="cal">',
    '<table class="cal">',
    '<tr><th colspan="7"><h2>' + heading + ' | ' + scope.heading + '</h2></th></tr>',
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