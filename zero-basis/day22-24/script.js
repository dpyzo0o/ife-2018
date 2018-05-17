var radioA = document.getElementById("radio-a");
var radioB = document.getElementById("radio-b");
var numA = document.getElementById("num-a");
var numB = document.getElementById("num-b");
var result = document.getElementById("result");
var selectedRadio = null;

document
  .getElementsByClassName("input-wrapper")[0]
  .addEventListener("change", function(evt) {
    var target = evt.target;
    if (target.type === "radio") {
      selectedRadio = target.value;
    }
  });

document
  .getElementsByTagName("button")[0]
  .addEventListener("click", function() {
    switch (selectedRadio) {
      case "a":
        result.innerHTML = "Is it a number? " + isNum(numA);
        break;
      case "b":
        result.innerHTML = "Is it a number? " + isNum(numB);
        break;
      default:
        break;
    }
  });

document
  .getElementsByTagName("button")[1]
  .addEventListener("click", function() {
    if (checkInputs()) {
      result.innerHTML = Number(numA.value).toFixed(Number(numB.value));
    }
  });

document
  .getElementsByTagName("button")[2]
  .addEventListener("click", function() {
    if (checkInputs()) {
      switch (selectedRadio) {
        case "a":
          result.innerHTML = Math.abs(Number(numA.value));
          break;
        case "b":
          result.innerHTML = Math.abs(Number(numB.value));
          break;
        default:
          break;
      }
    }
  });

document
  .getElementsByTagName("button")[3]
  .addEventListener("click", function() {
    if (checkInputs()) {
      switch (selectedRadio) {
        case "a":
          result.innerHTML = Math.ceil(Number(numA.value));
          break;
        case "b":
          result.innerHTML = Math.ceil(Number(numB.value));
          break;
        default:
          break;
      }
    }
  });

document
  .getElementsByTagName("button")[4]
  .addEventListener("click", function() {
    if (checkInputs()) {
      switch (selectedRadio) {
        case "a":
          result.innerHTML = Math.floor(Number(numA.value));
          break;
        case "b":
          result.innerHTML = Math.floor(Number(numB.value));
          break;
        default:
          break;
      }
    }
  });

document
  .getElementsByTagName("button")[5]
  .addEventListener("click", function() {
    if (checkInputs()) {
      switch (selectedRadio) {
        case "a":
          result.innerHTML = Math.round(Number(numA.value));
          break;
        case "b":
          result.innerHTML = Math.round(Number(numB.value));
          break;
        default:
          break;
      }
    }
  });

document
  .getElementsByTagName("button")[6]
  .addEventListener("click", function() {
    if (checkInputs()) {
      result.innerHTML = Math.max(Number(numA.value), Number(numB.value));
    }
  });

document
  .getElementsByTagName("button")[7]
  .addEventListener("click", function() {
    if (checkInputs()) {
      result.innerHTML = Math.min(Number(numA.value), Number(numB.value));
    }
  });

function isNum(el) {
  return !isNaN(Number(el.value));
}

function checkInputs() {
  if (!isNum(numA) || !isNum(numB)) {
    console.log("Input invalid, please make sure both inputs are numbers.");
    result.innerHTML = "";
    return false;
  } else {
    return true;
  }
}

// ****************************************************************************

/*
实现一个字符串头尾去除空格的函数
注意需要去除的空格，包括全角、半角空格
暂时不需要学习和使用正则表达式的方式
*/
function diyTrim(str) {
  var result = "";

  // do something
  result = str.trim();

  return result;
}

// 测试用例
console.log(diyTrim(" a f b    ")); // ->a f b
console.log(diyTrim("    ffdaf    ")); // ->ffdaf
console.log(diyTrim("1    ")); // ->1
console.log(diyTrim("　　f")); // ->f
console.log(diyTrim("  　  a f b 　　 ")); // ->a f b
console.log(diyTrim(" ")); // ->
console.log(diyTrim("　")); // ->
console.log(diyTrim("")); // ->

/*
去掉字符串str中，连续重复的地方
*/
function removeRepetition(str) {
  var result = "";

  // do something
  if (!str) {
    return result;
  }

  for (var i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1]) {
      result += str[i];
    }
  }

  return str[0] + result;
}

// 测试用例
console.log(removeRepetition("aaa")); // ->a
console.log(removeRepetition("abbba")); // ->aba
console.log(removeRepetition("aabbaabb")); // ->abab
console.log(removeRepetition("")); // ->
console.log(removeRepetition("abc")); // ->abc

// ****************************************************************************

var tree = {
  id: 0,
  name: "root",
  left: {
    id: 1,
    name: "Simon",
    left: {
      id: 3,
      name: "Carl",
      left: {
        id: 7,
        name: "Lee",
        left: {
          id: 11,
          name: "Fate"
        }
      },
      right: {
        id: 8,
        name: "Annie",
        left: {
          id: 12,
          name: "Saber"
        }
      }
    },
    right: {
      id: 4,
      name: "Tony",
      left: {
        id: 9,
        name: "Candy"
      }
    }
  },
  right: {
    id: 2,
    name: "right",
    left: {
      id: 5,
      name: "Tom"
    },
    right: {
      id: 6,
      name: "Robert",
      right: {
        id: 10,
        name: "Kai"
      }
    }
  }
};

// 假设id和name均不会重复，根据输入name找到对应的id
function findIdByName(name, currentNode) {
  var currentLeft, currentRight, id;

  if (name === currentNode.name) {
    return currentNode.id;
  }

  if (currentNode.left) {
    currentLeft = currentNode.left;
    id = findIdByName(name, currentLeft);
    if (id) return id;
  }

  if (currentNode.right) {
    currentRight = currentNode.right;
    id = findIdByName(name, currentRight);
    if (id) return id;
  }

  return id;
}

// 假设id和name均不会重复，根据输入id找到对应的name
function findNameById(id, currentNode) {
  var currentLeft, currentRight, name;

  if (id === currentNode.id) {
    return currentNode.name;
  }

  if (currentNode.left) {
    currentLeft = currentNode.left;
    name = findNameById(id, currentLeft);
    if (name) return name;
  }

  if (currentNode.right) {
    currentRight = currentNode.right;
    name = findNameById(id, currentRight);
    if (name) return name;
  }

  return name;
}

// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
// 根 左 右
function getListWithDLR(node) {
  if (node) {
    console.log(node.name);
    getListWithDLR(node.left);
    getListWithDLR(node.right);
  }
}

// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
// 左 根 右
function getListWithLDR(node) {
  if (node) {
    getListWithLDR(node.left);
    console.log(node.name);
    getListWithLDR(node.right);
  }
}

// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
// 左 右 根
function getListWithLRD(node) {
  if (node) {
    getListWithLRD(node.left);
    getListWithLRD(node.right);
    console.log(node.name);
  }
}

// ****************************************************************************

var queue = ["apple", "pear"];
var input = document.getElementById("queue-input");
var output = document.getElementById("queue-cont");

document.getElementById("in-btn").addEventListener("click", function() {
  valInput();
  queue.push(input.value);
  output.innerHTML = "队列内容：" + queue.join("-&gt;");
});

document.getElementById("out-btn").addEventListener("click", function() {
  if (!queue.length) {
    alert("Queue is already empty!");
  }
  queue.shift();
  output.innerHTML = "队列内容：" + queue.join("-&gt;");
});

document.getElementById("front-btn").addEventListener("click", function() {
  alert("队头元素：" + queue[queue.length - 1]);
});

document.getElementById("empty-btn").addEventListener("click", function() {
  if (!queue.length) {
    alert("Queue is empty!");
  } else {
    alert("Queue is not empty!");
  }
});

function valInput() {
  if (!input.value) {
    alert("Input is empty!");
  }
}

// ****************************************************************************

var arr = [43, 54, 4, -4, 84, 100, 58, 27, 140];
arr.sort(function(a, b) {
  return a - b;
});
console.log(arr);

var arr = ["apple", "dog", "cat", "car", "zoo", "orange", "airplane"];
arr.sort(function(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
});
console.log(arr);

var arr = [[10, 14], [16, 60], [7, 44], [26, 35], [22, 63]];
arr.sort(function(a, b) {
  return b[1] - a[1];
});
console.log(arr);

var arr = [
  {
    id: 1,
    name: "candy",
    value: 40
  },
  {
    id: 2,
    name: "Simon",
    value: 50
  },
  {
    id: 3,
    name: "Tony",
    value: 45
  },
  {
    id: 4,
    name: "Annie",
    value: 60
  }
];
arr.sort(function(a, b) {
  return a.value - b.value;
});
console.log(arr);

// ****************************************************************************

var scoreObject = {
  Tony: {
    Math: 95,
    English: 79,
    Music: 68
  },
  Simon: {
    Math: 100,
    English: 95,
    Music: 98
  },
  Annie: {
    Math: 54,
    English: 65,
    Music: 88
  }
};
console.log(obj2arr(scoreObject));

var menuArr = [
  [1, "Area1", -1],
  [2, "Area2", -1],
  [3, "Area1-1", 1],
  [4, "Area1-2", 1],
  [5, "Area2-1", 2],
  [6, "Area2-2", 2],
  [7, "Area1-2-3", 4],
  [8, "Area2-2-1", 6],
  [9, "Area2-2-2", 6]
];
console.log(arr2obj(menuArr));

function obj2arr(obj) {
  var result = [];

  for (var prop in obj) {
    var temp = [];
    temp.push(prop);
    var obj2 = obj[prop];
    for (key in obj2) {
      temp.push(obj2[key]);
    }
    result.push(temp);
  }

  return result;
}

// solution from https://github.com/yeung66/ife-basic/blob/master/basic22-24/sort.html
function arr2obj(arr) {
  var obj = { 0: {} };

  for (var i = 0; i < arr.length; i++) {
    obj[arr[i][0]] = { name: arr[i][1] };
    if (arr[i][2] === -1) {
      obj[0][arr[i][0]] = obj[arr[i][0]];
    } else {
      if (obj[arr[i][2]]["subMenu"]) {
        obj[arr[i][2]]["subMenu"][arr[i][0]] = obj[arr[i][0]];
      } else {
        obj[arr[i][2]]["subMenu"] = {};
        obj[arr[i][2]]["subMenu"][arr[i][0]] = obj[arr[i][0]];
      }
    }
  }
  return obj["0"];
}
