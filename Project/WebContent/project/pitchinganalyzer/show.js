


  function firstShow(){
    //var data1 = "auieo";　テスト用
    var data1 = sessionStorage.getItem('pitcherName');//入力中の投手の情報

    var input1NameElement = document.getElementById("name");// 名前表示
    input1NameElement.innerHTML = data1;

  }


function mainShow(){

  var element = document.getElementById("target");// ラジオボタンのId取得
  var radioNodeList = element.which;
  var which = radioNodeList.value; //ラジオボタンの内容(inputData or analyzedData）

  // alert(which); //過去の入力データ　＝　inputData, 分析データ　＝　analyzedData

  if(which === "inputData"){
    location.href = "data.html";
  }else{
    location.href = "analyzer.html";
  }
}

window.addEventListener("load", function(){
  var showButtonElement = document.getElementById("start_button");
  showButtonElement.addEventListener("click", mainShow ,false);
},false);
