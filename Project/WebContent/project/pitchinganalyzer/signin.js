var xmlHttpRequest;

function sendSigninRequest() {
  var nameElement = document.getElementById("name");
  var passwordElement = document.getElementById("password")

  var url = "signin";

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveSigninRequest;
  xmlHttpRequest.open("POST", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send("name=" + nameElement.value + "&password=" + passwordElement.value);
}

function receiveSigninRequest() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
    var response = xmlHttpRequest.responseText;
    var loginMessageElement = document.getElementById("signin_error");

    console.log(response);

    if (response == "true") {
      //データを保存
      var nameElement = document.getElementById("name");
      sessionStorage.setItem('userName', nameElement.value);

      //データを取得
      var data = sessionStorage.getItem('userName'); //できてるかテスト
      console.log(data);

      location.href = "top.html";
    } else {
      loginMessageElement.innerHTML = "error: すでに使用されているユーザ名です";
    }
  }
}

window.addEventListener("load", function() {
  var loginButtonElement = document.getElementById("send_button");
  loginButtonElement.addEventListener("click", sendSigninRequest, false);
}, false);
