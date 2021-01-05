var xmlHttpRequest;

function sendLoginRequest() {
  var nameElement = document.getElementById("name");
  var passwordElement = document.getElementById("password")

  var url = "login";

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveLoginRequest;
  xmlHttpRequest.open("POST", url, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpRequest.send("name=" + nameElement.value + "&password=" + passwordElement.value);

}

function receiveLoginRequest() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {

    var response = xmlHttpRequest.responseText;
    var loginMessageElement = document.getElementById("login_error");

    if (response == "true") {
      //データを保存
      var nameElement = document.getElementById("name");
      sessionStorage.setItem('userName', nameElement.value);
      //データを取得
      var data = sessionStorage.getItem('userName'); //できてるかテスト
      console.log(data);


      location.href = "top.html";
    } else {
      loginMessageElement.innerHTML = "error: ユーザ名もしくはパスワードが一致しません";
    }
  }
}

window.addEventListener("load", function() {
  var loginButtonElement = document.getElementById("send_button");
  loginButtonElement.addEventListener("click", sendLoginRequest, false);
}, false);
