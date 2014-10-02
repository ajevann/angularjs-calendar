var currentDate = new Date();

function loadCalendar() {
  $('#calendar').append(getTemplate(currentDate.getMonth(), currentDate.getYear, null));
}

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

function prevMonth(year, month) {
  console.log('prev ' + year + ' ' + month);
  if (month == 0) {
    month = 12;
    year = year - 1;
  }

  console.log('prev ' + year + ' ' + month);
  $('#calendar').empty();
  $('#calendar').append(getTemplate(month, year, null));
}

function nextMonth(year, month) {
  console.log('next ' + year + ' ' + month);
  if (month == 11) {
    month = -1;
    year = year + 1;
  }

  console.log('next ' + year + ' ' + month);
  $('#calendar').empty();
  $('#calendar').append(getTemplate(month + 2, year, null));
}

function getTemplate(month, year, dates) {

  var month = ((isNaN(month) || month == null) ? currentDate.getMonth() + 1 : month) - 1,
    year = (isNaN(year) || year == null) ? currentDate.getFullYear() : year,
    firstDay = new Date(year, month, 1),
    startDay = firstDay.getDay(),
    monthLength = daysInMonth(firstDay),
    heading = formatDateHeading(firstDay);

  console.log('gt ' + year + ' ' + month);

  if (!dates || !dates.length) dates = [currentDate.getDate()];

  var prevButton = '<button type="button" class"btn-default btn-lg" onclick="prevMonth(' + year + ', ' + month + ')">Prev</button>';
  var nextButton = '<button type="button" class"btn-default btn-lg" onclick="nextMonth(' + year + ', ' + month + ')">Next</button>';

  var tpl = [
    '<div class="cal">',
    '<table class="cal">',
    '<tr><th colspan="7"><h4>' + prevButton +  heading + nextButton + '</h4></th></tr>',
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

window.onload=loadCalendar;