var xmlHttpRequest;
var name = sessionStorage.getItem("userName");

function sendTopRequest() {
  var element = document.getElementById("target"); // ラジオボタンのId取得
  var radioNodeList = element.which;
  var which = radioNodeList.value; //ラジオボタンの内容(register or choice）

  // alert(which); //投手の新規登録　＝　register, 登録済みの投手を選択　＝　choice


  var url = "top";

  if (which === "register") {
    location.href = "register.html";
  } else {
    location.href = "choice.html";
  }
}

window.addEventListener("load", function() {
  document.getElementById("username").textContent = name;

  var loginButtonElement = document.getElementById("start_button");
  loginButtonElement.addEventListener("click", sendTopRequest, false);
}, false);
