"use strict";

window.onload = function() {
  // Время задаётся в формате: секунда, минута, час, день, месяц, год
  initTimer(0, 0, 24, 8, 3, 2017);
}

function initTimer(second, minute, hour, day, month, year) {
  var now = new Date();

  second = (arguments.length == 1) ? second + now.getSeconds() : second;
  year =  typeof(year) != "undefined" ?  year : now.getFullYear();
  month = month ? month - 1 : now.getMonth();
  day = typeof(day) != "undefined" ? day :  now.getDate();
  hour = typeof(hour) != "undefined" ?  hour : now.getHours();
  minute = typeof(minute) != "undefined" ? minute : now.getMinutes();

  var endDate = new Date(year, month, day, hour, minute, second + 1);
  var timers = document.querySelectorAll(".timer");

  var interval = setInterval(function() {
      var time = endDate.getTime() - now.getTime();

      if (time < 0) {
        clearInterval(interval);
      } else {
        var days = Math.floor(time / 864e5);
        var hours = Math.floor(time / 36e5) % 24;
        var minutes = Math.floor(time / 6e4) % 60;
        var seconds = Math.floor(time / 1e3) % 60;

        if (!seconds && !minutes && !days && !hours) {
          clearInterval(interval);
        }

        var text = null;
        var timeText = null;

        for (let i = 0; i < timers.length; i++) {
          if (days < 10) {
            timeText = "0" + days;
          } else {
            timeText = String(days);
          }

          timers[i].querySelector(".timer__cell--day-1").innerHTML = timeText[0];
          timers[i].querySelector(".timer__cell--day-2").innerHTML = timeText[1];

          if (hours < 10) {
            timeText = "0" + hours;
          } else {
            timeText = String(hours);
          }

          timers[i].querySelector(".timer__cell--hour-1").innerHTML = timeText[0];
          timers[i].querySelector(".timer__cell--hour-2").innerHTML = timeText[1];

          if (minutes < 10) {
            timeText = "0" + minutes;
          } else {
            timeText = String(minutes);
          }

          timers[i].querySelector(".timer__cell--min-1").innerHTML = timeText[0];
          timers[i].querySelector(".timer__cell--min-2").innerHTML = timeText[1];

          if (seconds < 10) {
            timeText = "0" + seconds;
          } else {
            timeText = String(seconds);
          }

          timers[i].querySelector(".timer__cell--sec-1").innerHTML = timeText[0];
          timers[i].querySelector(".timer__cell--sec-2").innerHTML = timeText[1];
        }
      }
      now.setSeconds(now.getSeconds() + 1);
  }, 1000);
}
