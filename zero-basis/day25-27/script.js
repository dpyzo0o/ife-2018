function Go() {
  console.log("Go");
}

function GoSteps(n) {
  console.log("Input: " + n);

  if (n === undefined || n % 1 > 0 || n === true) {
    n = 1;
  } else if (n < 0 || n === false || n === "Test" || n !== n || n === null) {
    n = 0;
    console.log("Do not go");
  }

  while (n--) {
    Go();
  }
}

GoSteps(10); // Go 10次
GoSteps(1); // Go 1次
GoSteps(); // Go 1次，认为缺少参数时，默认参数为1
GoSteps(0); // 0次
GoSteps(-1); // 0次
GoSteps(1.4); // Go 1次
GoSteps(1.6); // Go 1次
GoSteps(true); // Go 1次
GoSteps(false); // 0次
GoSteps("Test"); // 0次
GoSteps(NaN); // 0次
GoSteps(null); // 0次

// ****************************************************************************

var curTime = document.getElementById("currentTime");

// execute immediately
(function getCurrentTime() {
  var date = new Date();
  curTime.innerHTML = formatDate(date, "zh") + "<br>" + formatDate(date, "en");
  setTimeout(getCurrentTime, 1000);
})();

function dayOfWeek(date, lang) {
  var dayZH = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var dayEN = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  if (lang === "zh") {
    return dayZH[date.getDay()];
  } else if (lang === "en") {
    return dayEN[date.getDay()];
  }
}

function monthOfYear(date) {
  var months = [];
  for (var i = 1; i < 13; i++) {
    months.push(padZero(i));
  }
  return months[date.getMonth()];
}

function padZero(num) {
  num = num.toString();
  return num.length === 1 ? 0 + num : num;
}

function formatDate(date, style) {
  var year = date.getFullYear();
  var month = monthOfYear(date);
  var day = padZero(date.getDate());
  var dowZH = dayOfWeek(date, "zh");
  var dowEN = dayOfWeek(date, "en");
  var hour = padZero(date.getHours());
  var minute = padZero(date.getMinutes());
  // minimize round-off error
  var second = padZero(date.getSeconds() + Math.round(date.getMilliseconds() / 1000));
  var flag = Number(hour) > 12 ? "PM" : "AM";

  if (style === "zh") {
    return `${year}年${month}月${day}日 ${dowZH} ${hour}:${minute}:${second}`;
  } else {
    return `${year}-${month}-${day} ${dowEN} ${hour}:${minute}:${second} ${flag}`;
  }
}

// ****************************************************************************

var selectWrapper = document.getElementById("select-wrapper");
var yearSelect = document.getElementById("year-select");
var monthSelect = document.getElementById("month-select");
var daySelect = document.getElementById("day-select");
var hourSelect = document.getElementById("hour-select");
var minuteSelect = document.getElementById("minute-select");
var secondSelect = document.getElementById("second-select");
var result = document.getElementById("result-wrapper");
var targetDate = new Date(2000, 0, 1, 0, 0, 0);

createOptionLists(yearSelect, 2000, 2032);
createOptionLists(monthSelect, 1, 12);
createOptionLists(hourSelect, 0, 23);
createOptionLists(minuteSelect, 0, 59);
createOptionLists(secondSelect, 0, 59);
setDaySelect(new Date(2000, 1, 0));
displayTimeDiff();

selectWrapper.addEventListener("change", function(evt) {
  if (evt.target.id === "year-select" || evt.target.id === "month-select") {
    setDaySelect(
      // day set to 0 will return last day of last month
      new Date(parseInt(yearSelect.value), parseInt(monthSelect.value), 0)
    );
  }
  targetDate = new Date(
    parseInt(yearSelect.value),
    parseInt(monthSelect.value) - 1,
    parseInt(daySelect.value),
    parseInt(hourSelect.value),
    parseInt(minuteSelect.value),
    parseInt(secondSelect.value)
  );
  displayTimeDiff();
});

// reset daySelect everytime because days may change
function setDaySelect(date) {
  while (daySelect.firstChild) {
    daySelect.removeChild(daySelect.firstChild);
  }
  createOptionLists(daySelect, 1, date.getDate());
}

function createOptionLists(dom, start, end) {
  for (var i = start; i <= end; i++) {
    var option = document.createElement("option");
    option.value = option.text = i;
    dom.appendChild(option);
  }
}

function displayTimeDiff() {
  var curDate = new Date();
  var res1 = formatDate(targetDate, "zh");
  var connect = targetDate.getTime() > curDate.getTime() ? " 还有 " : " 已经过去 ";
  var timeDiff = calcTimeDiff(curDate, targetDate);
  var res2 = `${timeDiff.day}天${timeDiff.hour}小时${timeDiff.minute}分${timeDiff.second}秒`;
  result.innerHTML = "现在距离 " + res1 + connect + res2;
  setTimeout(displayTimeDiff, 1000);
}

function calcTimeDiff(cur, tar) {
  var oneDay = 24 * 3600 * 1000;
  var oneHour = 3600 * 1000;
  var oneMinute = 60 * 1000;
  var oneSecond = 1000;
  var diff = Math.abs(tar.getTime() - cur.getTime());
  var dayDiff = Math.floor(diff / oneDay);
  var hourDiff = Math.floor(diff % oneDay / oneHour);
  var minuteDiff = Math.floor(diff % oneDay % oneHour / oneMinute);
  var secondDiff = Math.round(diff % oneDay % oneHour % oneMinute / oneSecond);

  return {
    day: padZero(dayDiff),
    hour: padZero(hourDiff),
    minute: padZero(minuteDiff),
    second: padZero(secondDiff)
  };
}
