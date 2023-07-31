var currentDate,
  currentHours,
  currentMinutes,
  currentSeconds,
  hours = [],
  minutes = [],
  seconds = [];

function updateDate() {
  currentDate = new Date();
  currentHours = currentDate.getHours();
  if (currentHours < 10) {
    currentHours = '0' + currentHours;
  }
  currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = '0' + currentMinutes;
  }
  currentSeconds = currentDate.getSeconds();
  if (currentSeconds < 10) {
    currentSeconds = '0' + currentSeconds;
  }
}

function splitDigits(stringVal, array) {
  var tempString = stringVal.toString();
  array.length = 0
  for (var i = 0; i < tempString.length; i++) {
    array.push(+tempString.charAt(i));
  }
}

function printClass(value, elem) {
  elem.attr('class', 'digit').addClass('t-' + value);
}

$(document).ready(function () {
  setInterval(function () {
    updateDate();
    splitDigits(currentSeconds, seconds);
    splitDigits(currentMinutes, minutes);
    splitDigits(currentHours, hours);

    printClass(hours[0], $('.hours .digit:first-of-type'));
    printClass(hours[1], $('.hours .digit:last-of-type'));
    printClass(minutes[0], $('.minutes .digit:first-of-type'));
    printClass(minutes[1], $('.minutes .digit:last-of-type'));
  }, 1000);
});