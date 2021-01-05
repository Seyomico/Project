var xmlHttpRequest;


// 入力中の投手の情報↓

var data1 = sessionStorage.getItem('pitcherName'); //

var data2 = sessionStorage.getItem('pitcherDominante_hand'); //

// 入力中の投手の情報↑

var data3 = sessionStorage.getItem('userName'); //アカウント情報



function sendInput1Request() {

  var outElement = document.getElementById("out"); // アウトカウント

  var element = document.getElementById("target"); // ラジオボタンのId取得
  var radioNodeList = element.batter;
  var which = radioNodeList.value; //ラジオボタンの内容(right or left）


  var checkbox1 = document.getElementById("1st"); // 一塁から順番に⬇︎
  var checkbox2 = document.getElementById("2nd");
  var checkbox3 = document.getElementById("3rd"); // ３塁まで



  // var checkboxString = [];
  //
  // if (checkbox1.checked == true) {
  //   checkboxString.push(checkbox1.value);
  // }
  // if (checkbox2.checked == true) {
  //   checkboxString.push(checkbox2.value);
  // }
  // if (checkbox3.checked == true) {
  //   checkboxString.push(checkbox3.value);
  // }
  //
  // let json = JSON.stringify({
  //   userName: data3,
  //   pitcharName: data1,
  //   out: outElement.value,
  //   batter: which,
  //   runner: checkboxString
  // });

  sessionStorage.setItem("out", outElement.value);
  //JSON記入
  var temp = {
    userName: data3,
    pitcherName: data1,
    out: outElement.value,
    batter: which,
  };


  if (checkbox1.checked == true) {
    temp.runner1 = checkbox1.value;
  }
  if (checkbox2.checked == true) {
    temp.runner2 = checkbox2.value;
  }
  if (checkbox3.checked == true) {
    temp.runner3 = checkbox3.value;
  }

  json = JSON.stringify(temp);


  console.log(json);


  var url = "input1";

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveInput1Request;
  xmlHttpRequest.open("POST", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send("send_data=" + json);
}


function receiveInput1Request() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {

    var response = xmlHttpRequest.responseText;

    if (response == "true") {
      sessionStorage.setItem('count', 1);
      location.href = "input2.html";
    } else {
      alert("異常が発生しました");
    }

  }
}



window.addEventListener("load", function() {
  var nameElement = document.getElementById("pitcherName"); // 名前表示
  var dominant_handElement = document.getElementById("dominant_hand"); // 聞き手表示

  nameElement.textContent = data1;
  if (data2 == "right") {
    dominant_handElement.textContent = "右投げ";
  }
  else dominant_handElement.textContent = "sess";

  var input1ButtonElement = document.getElementById("decide_button"); //input1.html
  input1ButtonElement.addEventListener("click", sendInput1Request, false);
}, false);
