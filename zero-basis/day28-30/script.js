var postfixList = ["163.com", "gmail.com", "126.com", "qq.com", "263.net"];
var selectedIndex = 0;
var sugList = [];

var input = document.getElementById("email-input");
var sugWrapper = document.getElementById("email-sug-wrapper");

// get focus at opening
input.focus();

input.addEventListener("input", function(evt) {
  // reset selectedIndex
  selectedIndex = 0;
  // get user input
  var str = getInput(evt.target);
  // hide suggestion if empty
  var showSug = str.length !== 0;
  setSugStatus(showSug);
  // get suggestion list
  sugList = getSugContent(str);
  // display suggestions
  setSugContent(sugList);
  // set a default color for first suggestion
  document.querySelector("ul > li:nth-child(1)").style.backgroundColor =
    "lightcoral";
});

// blur event is prior to click event, thus use mousedown instead
sugWrapper.addEventListener("mousedown", function(evt) {
  var t = evt.target;
  input.value = htmlDecode(t.innerHTML);
  setSugStatus(false);
  input.focus();
});

input.addEventListener("keydown", function(evt) {
  // key up
  if (evt.keyCode === 38) {
    selectedIndex = selectedIndex ? --selectedIndex : sugList.length - 1;
  }

  // key down
  if (evt.keyCode === 40) {
    selectedIndex = selectedIndex === sugList.length - 1 ? 0 : ++selectedIndex;
  }

  // key enter
  if (evt.keyCode === 13) {
    input.value = sugList[selectedIndex];
    setSugStatus(false);
  }

  // key esc
  if (evt.keyCode === 27) {
    input.select();
  }

  // refresh suggestion list
  setSugContent(sugList);
});

// hide suggestion when input loses focus
input.addEventListener("blur", function(evt) {
  setSugStatus(false);
});

function getInput(node) {
  return node.value.trim();
}

function getSugContent(str) {
  var res = [];
  var filteredRes = [];
  var hasAt = !(str.indexOf("@") === -1);
  var strAfterAt = "";

  if (hasAt) {
    var idxAt = str.indexOf("@");
    strAfterAt = str.slice(idxAt + 1);
    str = str.slice(0, idxAt);
  }
  str = htmlEncode(str);

  postfixList.forEach(function(el) {
    if (el.indexOf(strAfterAt) === 0) {
      filteredRes.push(str + "@" + el);
    }
    res.push(str + "@" + el);
  });

  return filteredRes.length ? filteredRes : res;
}

function setSugContent(list) {
  // refresh the list each time
  while (sugWrapper.firstChild) {
    sugWrapper.removeChild(sugWrapper.firstChild);
  }

  list.forEach(function(el, idx) {
    var li = document.createElement("li");
    li.innerHTML = el;
    if (idx === selectedIndex) {
      li.style.backgroundColor = "lightblue";
    }
    sugWrapper.appendChild(li);
  });
}

function setSugStatus(showSug) {
  if (showSug) {
    sugWrapper.style.display = "block";
  } else {
    sugWrapper.style.display = "none";
  }
}

function htmlEncode(html) {
  var temp = document.createElement("div");
  temp.innerText = html;
  var output = temp.innerHTML;
  temp = null;
  return output;
}

function htmlDecode(text) {
  var temp = document.createElement("div");
  temp.innerHTML = text;
  var output = temp.innerText;
  temp = null;
  return output;
}
