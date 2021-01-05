var xmlHttpRequest;

var data = sessionStorage.getItem('userName'); //アカウント情報


function sendRegisterRequest() {

  var nameElement = document.getElementById("name"); //投手名

  var element = document.getElementById("target"); // ボタンのId取得

  var dominant_handNodeList = element.dominant_hand;
  var dominant_hand = dominant_handNodeList.value; //ラジオボタンの内容(right or left）

  var formNodeList = element.form;
  var form = formNodeList.value; // ラジオボタン（フォーム）

  var checkboxA = document.getElementById("a"); //フォーシームから順番に⬇︎
  var checkboxB = document.getElementById("b");
  var checkboxC = document.getElementById("c");
  var checkboxD = document.getElementById("d");
  var checkboxE = document.getElementById("e");
  var checkboxF = document.getElementById("f");
  var checkboxG = document.getElementById("g");
  var checkboxH = document.getElementById("h");
  var checkboxI = document.getElementById("i");
  var checkboxJ = document.getElementById("j"); // スクリューまで



  // var checkboxString = [];
  //
  // if (checkboxA.checked == true) {
  //   checkboxString.push(checkboxA.value);
  // }
  // if (checkboxB.checked == true) {
  //   checkboxString.push(checkboxB.value);
  // }
  // if (checkboxC.checked == true) {
  //   checkboxString.push(checkboxC.value);
  // }
  // if (checkboxD.checked == true) {
  //   checkboxString.push(checkboxD.value);
  // }
  // if (checkboxE.checked == true) {
  //   checkboxString.push(checkboxE.value);
  // }
  // if (checkboxF.checked == true) {
  //   checkboxString.push(checkboxF.value);
  // }
  // if (checkboxG.checked == true) {
  //   checkboxString.push(checkboxG.value);
  // }
  // if (checkboxH.checked == true) {
  //   checkboxString.push(checkboxH.value);
  // }
  // if (checkboxI.checked == true) {
  //   checkboxString.push(checkboxI.value);
  // }
  // if (checkboxJ.checked == true) {
  //   checkboxString.push(checkboxJ.value);
  // }
  //
  //
  //
  //
  // //JSON記入
  // let json = JSON.stringify({
  //   userName: data,
  //   pitcharName: nameElement.value,
  //   dominant_hand: dominant_hand,
  //   form: form,
  //   variety: checkboxString
  // });


  //JSON記入
  var temp = {
    userName: data,
    pitcherName: nameElement.value,
    dominant_hand: dominant_hand,
    form: form,
  };


  if (checkboxA.checked == true) {
    temp.variety0 = checkboxA.value;
  }
  if (checkboxB.checked == true) {
    temp.variety1 = checkboxB.value;
  }
  if (checkboxC.checked == true) {
    temp.variety2 = checkboxC.value;
  }
  if (checkboxD.checked == true) {
    temp.variety3 = checkboxD.value;
  }
  if (checkboxE.checked == true) {
    temp.variety4 = checkboxE.value;
  }
  if (checkboxF.checked == true) {
    temp.variety5 = checkboxF.value;
  }
  if (checkboxG.checked == true) {
    temp.variety6 = checkboxG.value;
  }
  if (checkboxH.checked == true) {
    temp.variety7 = checkboxH.value;
  }
  if (checkboxI.checked == true) {
    temp.variety8 = checkboxI.value;
  }
  if (checkboxJ.checked == true) {
    temp.variety9 = checkboxJ.value;
  }

  json = JSON.stringify(temp);

  console.log(json);

  var url = "register";

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveRegisterRequest;
  xmlHttpRequest.open("POST", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send("send_data=" + json);
}


function receiveRegisterRequest() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {

    var response = xmlHttpRequest.responseText;

    if (response == "true") {
      var element = document.getElementById("target"); // ボタンのId取得

      var dominant_handNodeList = element.dominant_hand;
      var dominant_hand = dominant_handNodeList.value; //ラジオボタンの内容(right or left）
      var formNodeList = element.form;
      var form = formNodeList.value;

      var nameElement = document.getElementById("name");
      sessionStorage.setItem('pitcherName', nameElement.value);
      sessionStorage.setItem('pitcherDominante_hand', dominant_hand);
      sessionStorage.setItem('pitcherForm', form);

      location.href = "input1.html";
    } else {
      alert("その選手はすでに登録済みです");
    }

  }
}
window.addEventListener("load", function() {
  var registerButtonElement = document.getElementById("decide_button"); //register.html
  registerButtonElement.addEventListener("click", sendRegisterRequest, false);
}, false);
