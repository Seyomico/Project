var xmlHttpRequest;
var selectPitcherName;

function sendFirstChoiceRequest() {

  var data = sessionStorage.getItem('userName'); //アカウント情報


  var url = "choice";

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveFirstChoiceRequest;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send("userName=" + data);
}


function receiveFirstChoiceRequest() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {

    var temp = JSON.parse(xmlHttpRequest.responseText);

    var arrayListPitchar = temp.message; //選手を格納する配列
    console.log(arrayListPitchar);

    let pitcharNames = document.getElementById("name"); //選手名を表示させる⬇︎
    document.createElement("option");

    console.log(arrayListPitchar[4]);

    arrayListPitchar.forEach(name => {
      let option = document.createElement("option");
      option.setAttribute("value", name);
      option.innerHTML = name;
      pitcharNames.appendChild(option);
    });

  }
}



function sendMainChoiceRequest() {
  var data = sessionStorage.getItem('userName'); //アカウント情報

  var pitcharName = document.getElementById("name");
  selectPitcherName = pitcharName.value; //選択した投手名

  var url = "choice?userName=" + data + "&pitcherName=" + selectPitcherName;

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveMainChoiceRequest;
  xmlHttpRequest.open("POST", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send(null);

}


function receiveMainChoiceRequest() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
    sessionStorage.setItem('pitcherName', selectPitcherName); //投手名更新

    var response = xmlHttpRequest.responseText; //ピッチャーの利き腕

    ////サーバからピッチャーの利き腕を返してください！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

    sessionStorage.setItem('pitcherDominante_hand', response); //利き腕更新


    var element = document.getElementById("target"); // ボタンのId取得

    var whichNodeList = element.which;
    var which = whichNodeList.value; //ラジオボタンの内容 (input　or show)

    if (which == "input") {
      location.href = "input1.html";
    } else { //showだった場合
      location.href = "show.html";
    }


  }
}



window.addEventListener("load", function() {
  var choiceButtonElement = document.getElementById("decide_button");
  choiceButtonElement.addEventListener("click", sendMainChoiceRequest, false);
}, false);
