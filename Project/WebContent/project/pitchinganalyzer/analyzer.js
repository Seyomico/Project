var rate = [];
var speed = [];
var hit = [];
var varietyList = ["フォーシーム", "ツーシーム", "カッター", "スライダー", "フォーク", "カーブ", "チェンジアップ", "シュート", "シンカー", "スクリュー"];




function sendAnalyzerRequest() { //input1.htmlへ遷移する

  var data1 = sessionStorage.getItem('pitcherName'); //入力中の投手の情報

  var data2 = sessionStorage.getItem('userName'); //アカウント情報
  console.log(data2);

  console.log(data1);

  var url = "analyzer";

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveAnalyzerRequest;
  xmlHttpRequest.open("POST", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send("loginUser=" + data2 + "&pitcherName=" + data1);

}

function receiveAnalyzerRequest() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {

    var response = JSON.parse(xmlHttpRequest.responseText);
    console.log(response);
    rate = response.rateByBallType;
    speed = response.speedByBallType;
    hit = response.hitedByBallType;
    console.log(rate);
    console.log(speed);
    console.log(hit);

    create_graph();
  }
}




function create_graph() {
  var varietyListGraf = [];
  var rateGraf = [];
  var speedGraf = [];
  var hitGraf = [];
  for (var i = 0; i < 10; i++) {
    if (rate[i] != 0) {
      varietyListGraf.push(varietyList[i]);
      rateGraf.push(rate[i]);
      // speedGraf.push(speed[i]);
      // hitGraf.push(hit[i]);
    }
    speedGraf.push(speed[i]);
    hitGraf.push(hit[i]);
  }



  var ctx = document.getElementById("target");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: varietyListGraf,
      datasets: [{
        backgroundColor: [
          "red",
          "blue",
          "lime",
          "yellow",
          "navy",
          "green",
          "fuchsia",
          "aqua",
          "purple",
          "teal",
        ],
        data: rateGraf
      }]
    },
    options: {
      title: {
        display: true,
        text: '球種割合'
      }
    }
  });

  for (var i = 0; i < 10; i++) {
    speedWriter(i, speedGraf, rateGraf);
    hitWriter(i, hitGraf, speedGraf);
  }
}

function speedWriter(i, speedGraf, rateGraf) {

  if (speedGraf[i] != 0) {
    var textbox_element = document.getElementById('speed');

    // 新しいHTML要素を作成
    var new_element = document.createElement('p');
    new_element.textContent = varietyList[i] + " : " + speedGraf[i] + "km/h";

    // 指定した要素の中の末尾に挿入
    textbox_element.appendChild(new_element);
  }
}

function hitWriter(i, hitGraf, speedGraf) {
  if (speedGraf[i] != 0) {
    var per;

    var textbox_element2 = document.getElementById('hit');

    // 新しいHTML要素を作成
    var new_element2 = document.createElement('p');
    if (hitGraf[i] == 0) {
      per = ".000"
    }
    else if (hitGraf[i] == 1000) {
      per = "1.000"
    }
    else {
      per = "." + hitGraf[i];
    }
    new_element2.textContent = varietyList[i] + " : " + per;

    // 指定した要素の中の末尾に挿入
    textbox_element2.appendChild(new_element2);
  }
}



// var a = [50, 33, 8, 9];
// var num = 4;
// var color = ["red", "#20B2AA", "#9ACD32", "yellow"]
//
// function create_graph () {
//   var size = 200;
//   var element = document.getElementById( "target" ) ;
//   var context = element.getContext( "2d" ) ;
//
//   context.beginPath () ;
//   var angle = [];
//
//   for (var i = 0; i < num; i++) {
//     angle[i] =  360 * ( a[i] / 100 ) ;
//   }
//
//   for (var i = 0; i < num; i++) {
//     context.beginPath () ;
//
//     var sum = 0;
//     for (var j = 0; j < i; j++) {
//       sum += angle[j];
//     }
//
//     context.arc( size, size, size, (sum - 90) * Math.PI / 180, (sum + angle[i] - 90) * Math.PI / 180, false ) ;
//     context.lineTo( size, size ) ;
//     context.fillStyle = color[i] ;
//     context.fill() ;
//   }
//
//   // // 塗りつぶし
//   // context.beginPath () ;
//   // context.arc( size, size, size, (0 - 90) * Math.PI / 180, (angle[0] - 90) * Math.PI / 180, false ) ;
//   // context.lineTo( size, size ) ;
//   // context.fillStyle = "#20B2AA" ;
//   // context.fill() ;
//   //
//   // context.beginPath () ;
//   // context.arc( size, size, size, (angle[0] - 90) * Math.PI / 180, ((angle[0] + angle[1]) - 90) * Math.PI / 180, false ) ;
//   // context.lineTo( size, size ) ;
//   // context.fillStyle = "#9ACD32" ;
//   // context.fill() ;
//   //
//   // context.beginPath () ;
//   // context.arc( size, size, size, ((angle[0] + angle[1]) - 90) * Math.PI / 180, ((angle[0] + angle[1] + angle[2]) - 90) * Math.PI / 180, false ) ;
//   // context.lineTo( size, size ) ;
//   // context.fillStyle = "#FF6347" ;
//   // context.fill() ;
//
//
//
//   // // 線
//   // context.beginPath () ;
//   // context.arc( 100, 100, 100, (0 - 90) * Math.PI / 180, (angleA - 90) * Math.PI / 180, false ) ;
//   // context.lineTo( 100, 100 ) ;
//   // context.lineWidth = 3 ;
//   // context.strokeStyle = "white" ;
//   // context.stroke() ;
//   //
//   // context.beginPath () ;
//   // context.arc( 100, 100, 100, (angleA - 90) * Math.PI / 180, ((angleA + angleB) - 90) * Math.PI / 180, false ) ;
//   // context.lineTo( 100, 100 ) ;
//   // context.lineWidth = 3 ;
//   // context.strokeStyle = "white" ;
//   // context.stroke() ;
//   //
//   // context.beginPath () ;
//   // context.arc( 100, 100, 100, ((angleA + angleB) - 90) * Math.PI / 180, ((angleA + angleB + angleC) - 90) * Math.PI / 180, false ) ;
//   // context.lineTo( 100, 100 ) ;
//   // context.lineWidth = 3 ;
//   // context.strokeStyle = "white" ;
//   // context.stroke() ;
// }
//
//
//
// window.addEventListener("load", function() {
//     document.getElementById("display_button").addEventListener("click", create_graph, false);
//
// }, false);
