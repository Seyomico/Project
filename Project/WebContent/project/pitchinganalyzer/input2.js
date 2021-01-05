var xmlHttpRequest;
var x, y;
var num = 1; // 送信後数増やす、

// var num = sessionStorage.getItem('count');
// console.log(sessionStorage.getItem('count'));// 送信した回数

var O = Number(sessionStorage.getItem("out"));
var B = 0;
var S = 0;

var values;

var sendbuttonReWtrite = false;

var fin = false;
var con = false;

////////////////////////////////ここから最初のデータの送受信(球種を数に合わせて動的に表示)////////////////

function sendFirstInput2Request() { //読み込みと同時に送る



  var data1 = sessionStorage.getItem('pitcherName'); //入力中の投手の情報

  var data2 = sessionStorage.getItem('userName'); //アカウント情報
  console.log(data1);
  console.log(data2);


  var url = "input2?pitcherName=" + data1 + "&loginUser=" + data2;

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveFirstInput2Request;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send(null);
}


function receiveFirstInput2Request() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {

    var arrayListVariety = JSON.parse(xmlHttpRequest.responseText).message; //球種を格納する配列

    let varietys = document.getElementById("varieties"); //球種を表示させる⬇︎
    document.createElement("option");

    arrayListVariety.forEach(variety => {
      let option = document.createElement("option");
      option.setAttribute("value", variety);
      option.innerHTML = toJapanese(variety);
      varietys.appendChild(option);
    });

  }
}

////////////////////////////////ここまで最初のデータの送受信/////////////////////////

////////////////////////////////ここから投球データの送受信/////////////////////////

function sendMainInput2Request() { //継続以外の場合、サーバに送信してページリロード

  let json = jsonCreate();


  console.log(json);

  var url = "input2";

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveMainInput2Request;
  xmlHttpRequest.open("POST", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send("send_data=" + json);

}


function receiveMainInput2Request() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {

    var response = xmlHttpRequest.responseText; //trueとか帰ってくるかも

    if (response == "true") {

      if (document.getElementById("finish").value == "継続") {
        //リダイレクトする前にカウントを一増やす
        sessionStorage.setItem('count', eval(Number(sessionStorage.getItem('count')) + 1));

        // location.href = "input2.html"; //input2.jsにリダイレクト
        num++;
      } else {
        fin = true;

        create_radio();
      }

    } else {
      alert("異常が発生しました");
    }
  }
}


function inputContinue() {
  location.href = "input1.html";
}

function inputEnd() {
  location.href = "top.html";
}

////////////////////////////////ここまで継続しない場合のデータ送受信/////////////////////////

function jsonCreate() { //Jsonを作るメソッド

  var data1 = sessionStorage.getItem('pitcherName'); //入力中の投手の情報

  var data2 = sessionStorage.getItem('userName'); //アカウント情報

  var variety = document.getElementById("varieties");
  var selectVariety = variety.value; //球種の内容

  var speed = document.getElementById("speed");
  var selectSpeed = speed.value; //球速の内容

  var resultElement = document.getElementById("target"); // ボタンのId取得
  var resultNodeList = resultElement.result;
  var selectResult = resultNodeList.value; //ラジオボタンの内容 結果result

  var finish = document.getElementById("finish");
  var selectFinish = finish.value; //球種の内容

  let json = JSON.stringify({
    userName: data2,
    pitcherName: data1,
    throwcount: sessionStorage.getItem('count'), //何球目か
    variety: selectVariety, //球種
    speed: selectSpeed, //球速
    result: selectResult, //結果
    finish: selectFinish, //打席結果
    xPosition: x, //投球コースのx座標
    yPosition: y //投球コースのy座標
  });

  if (B <= 3) {
    if (selectResult == "0") {
      B++;
    }
  }
  if (S <=2) {
    if (selectResult == "1" || selectResult == "2" || selectResult== "3") {
      S++;
    }
  }
  var bElement = document.getElementById("B");
  var sElement = document.getElementById("S");
  bElement.textContent = B;
  sElement.textContent = S;


  return json;
}


window.addEventListener("load", function() {
  document.getElementById("decide_button").addEventListener("click", sendMainInput2Request, false);

  var oElement = document.getElementById("O");
  oElement.textContent = O;

  var courseElement = document.getElementById("course");
  courseElement.addEventListener("click", getCourse, false);

}, false);

function getCourse() {

  var clickX = event.pageX;
  var clickY = event.pageY;

  // 要素の位置を取得
  var clientRect = this.getBoundingClientRect();
  var positionX = clientRect.left + window.pageXOffset;
  var positionY = clientRect.top + window.pageYOffset;

  // 要素内におけるクリック位置を計算
  x = clickX - positionX;
  y = clickY - positionY - 0.3125;
  console.log(x);
  console.log(y);

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  context.clearRect(0, 0, 1000, 1000)

  context.beginPath();
  context.arc(x + 100, y, 20, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
  context.fillStyle = "rgba(255,0,0,1)";
  context.fill();
  context.stroke();

  context.fillStyle = "rgba(0,0,0,1)"
  context.font = "30px serif";
  context.fillText(String(num), x + 92, y + 12);
}

function create_radio() {
  if (document.getElementById("finish").value != "継続") {
    fin = true;
    if (sendbuttonReWtrite == false) {

      sendbuttonReWtrite = true;
      values = ["続けて入力する　", "終了する　　　　"];
      var main_div = document.getElementById('main_div');
      for (var i = 0; i < values.length; i++) {
        var radio = document.createElement('input');
        var label = document.createElement('label');
        var br = document.createElement('br');
        var id = "main_div_radio" + i;
        var name = "group1";
        var value = values[i];
        radio.setAttribute("type", "button");
        radio.setAttribute("value", value);
        radio.setAttribute("id", id);
        radio.setAttribute("name", name);
        label.setAttribute("for", id);

        main_div.appendChild(br);
        main_div.appendChild(radio);
        main_div.appendChild(label);

        radio.onclick = function() {
        }
      }
      var continueElement = document.getElementById("main_div_radio0"); //「続けて入力する」
      var endElement = document.getElementById("main_div_radio1"); //「終了する」
      document.getElementById("decide_button").remove();
      continueElement.addEventListener("click", inputContinue, false);
      endElement.addEventListener("click", inputEnd, false);
    }
  }
}

function toJapanese(ball) {
  switch (ball) {
    case "4seam":
      return "フォーシーム";
      break;
    case "2seam":
      return "ツーシーム";
      break;
    case "slider":
      return "スライダー";
      break;
    case "curve":
      return "カーブ";
      break;
    case "sinking_fast":
      return "シュート";
      break;
    case "cutter":
      return "カッター";
      break;
    case "sinker":
      return "シンカー";
      break;
    case "fork":
      return "フォーク";
      break;
    case "change":
      return "チェンジアップ";
      break;
    case "screw":
      return "スクリュー";
      break;
    default:
      return ball;

  }
  return "";
}
