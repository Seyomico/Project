var xmlHttpRequest;
var selectNum;
var first = true;

function sendFirstDataRequest() { //input1.htmlへ遷移する

  var data1 = sessionStorage.getItem('pitcherName'); //入力中の投手の情報

  var data2 = sessionStorage.getItem('userName'); //アカウント情報
  console.log(data2);


  var url = "data?pitcherName=" + data1 + "&loginUser=" + data2;

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveFirstDataRequest;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send(null);

}

function receiveFirstDataRequest() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {

    var response = parseInt(xmlHttpRequest.responseText); //その選手のデータの数が帰ってくる
    console.log(response);

    //データに数に合わせてselectを追加する
    let dataNumber = document.getElementById('data');

    document.createElement('option');
    for (let i = 1; i <= response; i++) {
      let option = document.createElement('option');
      option.setAttribute('value', i);
      option.innerHTML = i;
      dataNumber.appendChild(option);
    };

    var element = document.getElementById("name");
    var data1 = sessionStorage.getItem('pitcherName'); //入力中の投手の情報
    element.innerHTML = data1;
  }
}



function sendMainDataRequest() {

  var data1 = sessionStorage.getItem('pitcherName'); //入力中の投手の情報

  var data2 = sessionStorage.getItem('userName'); //アカウント情報

  var selects = document.getElementById("data");
  selectNum = selects.value;

  var url = "data";

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveMainDataRequest;
  xmlHttpRequest.open("POST", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send("pitcherName=" + data1 + "&loginUser=" + data2 + "&selectNumber=" + selectNum);

}

function receiveMainDataRequest() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {

    var response = JSON.parse(xmlHttpRequest.responseText); //選択した選手のデータのが帰ってくる

    //送られてくるJsonデータ
    console.log(response);
    console.log(Object.keys(response).length);
    console.log(Object.keys(response["state"]).length);

    //Jsonが送られてきたら⬇️のような配列にまとめるつもり
    var ballsVariety = [];
    var ballsSpeed = []; // こんな感じでまとめる⬇️
    var result = [];
    var finish = [];
    var ballsXArea = [];
    var ballsYArea = [];
    var runnerState = [];
    var batterState;
    var outState;


    var stateNum = Object.keys(response["state"]).length;
    var pitchNum = Object.keys(response).length - 1;

    //ランナー
    for (var i = 0; i < stateNum - 2; i++) {
      runnerState.push(response.state[i]);
    }

    batterState = response.state[stateNum - 2];
    outState = response.state[stateNum - 1];

    //一球ごとの情報
    for (var i = 1; i <= pitchNum; i++) {
      var counter = "throwcount" + i;

      ballsVariety.push(toJapanese(response[counter][1]));
      ballsSpeed.push(response[counter][2]);
      result.push(toResult(response[counter][3]));
      finish.push(response[counter][4]);
      ballsXArea.push(response[counter][5]);
      ballsYArea.push(response[counter][6]);
    }

    display(ballsSpeed, ballsVariety, ballsXArea, ballsYArea, result,
      finish, batterState, outState, runnerState); //ここでdisplay()メソッドを使用
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

function toResult(re) {
  switch (re) {
    case "1":
      return "空振り";
      break;
    case "2":
      return "見逃しストライク";
      break;
    case "0":
      return "ボール";
      break;
    case "3":
      return "ファール";
      break;
    case "4":
      return "インプレー";
      break;
    default:
    return "";

  }
}

function toBase(base) {
  switch (base) {
    case "1base":
      return "一塁";
      break;
    case "2base":
      return "二塁";
      break;
    case "3base":
      return "三塁";
      break;
    default:

  }
}

function display(ballsSpeed, ballsVariety, ballsXArea, ballsYArea,
  result, finish, batterState, outState, runnerState) {

  var choiceElement = document.getElementById("data"); //選択したデータの数字
  var choiceNumber = choiceElement.value;

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  if (!first) {
    var detail = document.getElementById("detail");
    var detail2 = document.getElementById("detail2");
    while (detail.firstChild) {
      detail.removeChild(detail.firstChild);
    }
    while (detail2.firstChild) {
      detail2.removeChild(detail2.firstChild);
    }
  }



  first = false;

  context.clearRect(0, 0, 1000, 1000);

  for (var i = 0; i < ballsXArea.length; i++) {
    x = Number(ballsXArea[i]);
    y = Number(ballsYArea[i]);
    console.log(x);
    console.log(y);

    context.beginPath();
    context.arc(x + 100, y, 20, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    context.fillStyle = "rgba(255,0,0,1)";
    context.fill();
    context.stroke();

    context.fillStyle = "rgba(0,0,0,1)"
    context.font = "30px serif";
    context.fillText(String(i + 1), x + 92, y + 12);

    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    var span3 = document.createElement('span');
    var span4 = document.createElement('span');

    var br = document.createElement('br');
    var br0 = document.createElement("br");
    var id = "speed" + (i + 1);
    var id2 = "variety" + (i + 1);
    var id3 = "result" + (i + 1);
    var id4 = "finish" + (i + 1);

    var value1 = ballsSpeed[i];
    var value2 = ballsVariety[i];
    var value3 = result[i];
    var value4 = "";
    if (finish[i] != "継続") {
      value4 = finish[i];
    }

    // span1.setAttribute("value", "value1");
    // span2.setAttribute("value", "value2");
    span1.setAttribute("id", id);
    span2.setAttribute("id", id2);
    span3.setAttribute("id", id3);
    span4.setAttribute("id", id4);


    // radio.setAttribute("name", name);
    // label.setAttribute("for", id);
    // label.innerHTML = value;

    var detail = document.getElementById("detail");

    span1.textContent = (i + 1) + "球目: " + value1 + "km/h  ";
    detail.appendChild(span1);
    span2.textContent = value2;
    detail.appendChild(span2);
    detail.appendChild(br0);

    span3.textContent = value3;
    detail.appendChild(span3);
    span4.textContent = value4;
    span4.style.color = "rgba(255,0,0,1)"
    detail.appendChild(br);

    detail.appendChild(span4);
    // detail.textContent = i + 1 + "球目" + value1;
  }

  var span1 = document.createElement('span');
  var span2 = document.createElement('span');
  var span3 = document.createElement("span");

  var br2 = document.createElement('br');
  var br3 = document.createElement("br");
  var id = "batter";
  var id2 = "state";
  var id3 = "runner"


  var value1;
  var value2 = outState
  var value3 = "";

  if (batterState == "right") {
    value1 = "右打ち";
  } else value1 = "左打ち";

  if (runnerState.length == 0) {
    value3 = "なし"
  }
  else if (runnerState.length == 3) {
    value3 = "満塁"
  } else {
    for (var i = 0; i < runnerState.length; i++) {
      value3 += toBase(runnerState[i]);
    }
  }

  span1.setAttribute("id", id);
  span2.setAttribute("id", id2);
  span3.setAttribute("id", id3);


  var detail2 = document.getElementById("detail2");

  span1.textContent = "打者：" + value1;
  detail2.appendChild(span1);
  detail2.appendChild(br2);

  span2.textContent = "アウトカウント：" + value2;
  detail2.appendChild(span2);
  detail2.appendChild(br3);

  span3.textContent = "ランナー：" + value3;
  detail2.appendChild(span3);

  // detail2.appendChild(br2);

}

window.addEventListener("load", function() {

  var changeElement = document.getElementById("change_button");
  changeElement.addEventListener("click", sendMainDataRequest, false);

}, false);
