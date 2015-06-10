
(function(){
  var token = window.localStorage.getItem("token");
  var loginTime = window.localStorage.getItem("loginTime");
  if(token != undefined && token != null && location.href.indexOf("index.html") > -1){
    //TODO: 判断session是否超时,默认两个小时
    if(true){
    	//location.href="../tpl/execute.html";
    	location.href="iframe.html";
    }
  }
})();


$(function(){

	//忘记密码
	$(".forgotPwd").click(function(){	
		window.open(getGlobalConfig().WEB.HOST + '/#/access/forgotpwd');
		// chrome.tabs.create({'url': getGlobalConfig().WEB.HOST + '/#/access/forgotpwd','selected':true},function callback(tab){
		// 	console.log(tab.id);
		// });
	});

	//注册账号
	$(".register").click(function(){
		window.open(getGlobalConfig().WEB.HOST + '/#/access/signup');
		// chrome.tabs.create({'url': getGlobalConfig().WEB.HOST + '/#/access/signup','selected':true},function callback(tab){
		// 	console.log(tab.id);
		// });
	});

	//登录
	$(".btn-login").click(function(){
		var $username = $(".username");
		var $password = $(".password");
		var $authError = $(".authError");
		if($username.val() == ''){
			$username.focus();
		}else if($password.val() == ''){
			$password.focus();
		}else{
			var ajax = new ajaxService();
			ajax.login($username.val(),$password.val(),function(data){
				location.href = "iframe.html";
			},function(error){
				$authError.text(JSON.parse(error.responseText).message);
			});
		}
	});

	$(".closeSidebar").click(function(){
		chrome.extension.sendRequest({command:"closeIframe",message: "",data:""}, function(response) {
			console.log(response);		  
		});
	});
});
