var app = angular.module('calendarfiddle', []);

app.directive('calendar', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    template: getTemplate(null, null, [])
  };
}]);

var monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
var days = ['s', 'm', 't', 'w', 't', 'f', 's'];

var isLeapYear = function (year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
};

var daysInMonth = function (date) {
  return [31, (isLeapYear(date.getYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][date.getMonth()];
};

var formatDateHeading = function (date) {
  var m = monthNames[date.getMonth()];
  return m.charAt(0).toUpperCase() + m.slice(1) + ' ' + date.getFullYear();
};

function getTemplate(month, year, dates) {

  var currentDate = new Date();

  var month = ((isNaN(month) || month == null) ? currentDate.getMonth() + 1 : month) - 1;
  var year = (isNaN(year) || year == null) ? currentDate.getFullYear() : year;
  var firstDay = new Date(year, month, 1);
  var startDay = firstDay.getDay();
  var monthLength = daysInMonth(firstDay);
  var heading = formatDateHeading(firstDay);

  setMonthText(heading);

  if (!dates || !dates.length) dates = [currentDate.getDate()];

  var tpl = [
    '<div class="cal">',
    '<table class="cal">',
    '<tr><th colspan="7"><h2>' + heading + '</h2></th></tr>',
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