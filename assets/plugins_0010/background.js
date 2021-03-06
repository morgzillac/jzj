
var statusType = {"READY":"READY","RUNNING":"RUNNING","PAUSE":"PAUSE","STOP":"STOP","ERROR":"ERROR","FINISH":"FINISH"};
var flow = new shoppingFlow();
var storage = new storageService();
var isActive = false;
var errorDelaySecond = 5 * 1000;
var myProxy;
var proxyIndex = 0;
var proxyStatus = 1; //0:success,1:failure

var autoFlow = new autoExeService();

/*锁屏*/
function lockUI(tabId){
	var _script = [];
	_script.push('try{');
	_script.push('	var pageHeight = window.document.body.offsetHeight;');
	_script.push('	var oldDiv = document.getElementById(\"lock-div\");');
	_script.push('	if(oldDiv!=undefined)oldDiv.remove();');
	_script.push('	var div = document.createElement(\"div\");');
	_script.push('	div.setAttribute("id","lock-div");');
	_script.push('	div.style.position = "absolute";');
	_script.push('	div.style.right = "25px";');
	_script.push('	div.style.top = "0px";');
	_script.push('	div.style.left = "0px";');
	_script.push('	div.style.width = "100%";');
	_script.push('	div.style.height = pageHeight + "px";');
	_script.push('	div.style.background = "#000";');
	_script.push('	div.style.zIndex = "9999999999";	');
	_script.push('	div.style.filter = "alpha(opacity=45)";	');
	_script.push('	div.style.opacity = "0.45";	');
	_script.push('	document.body.appendChild(div);');
	_script.push('}catch(e){console.error(e)}');
	chrome.tabs.executeScript(tabId, {
		runAt: "document_end",
		code: _script.join("")
	});
};
/*解锁*/
function unLockUI(tabId){
	var _script = [];
	_script.push('try{');	
	_script.push('	var oldDiv = document.getElementById(\"lock-div\");');
	_script.push('	if(oldDiv!=undefined)oldDiv.remove();');
	_script.push('}catch(e){console.error(e)}');
	chrome.tabs.executeScript(tabId, {
		runAt: "document_end",
		code: _script.join("")
	});
};
/*插入iframe到页面*/
function insertIframe(tabId){
	lockUI(tabId);
	var url = chrome.extension.getURL("index.html");
	var _script = [];
	_script.push('try{');
	_script.push('	var oldIframe = document.getElementById(\"step-iframe\");');
	_script.push('	if(oldIframe!=undefined)oldIframe.remove();');
	_script.push('	var iframe = document.createElement(\"iframe\");');
	_script.push('	iframe.setAttribute("id","step-iframe");');
	_script.push('	iframe.style.position = "fixed";');
	_script.push('	iframe.style.right = "25px";');
	_script.push('	iframe.style.top = "25px";');
	_script.push('	iframe.style.width = "320px";');
	_script.push('	iframe.style.height = "600px";');
	_script.push('	iframe.style.background = "#2F373D";');
	_script.push('	iframe.style.zIndex = "10000000000";	');
	_script.push('	iframe.style.border = "2px solid #ccc";');
	_script.push('	iframe.setAttribute("src",\"' + url + '\");');
	_script.push('	document.body.appendChild(iframe);');
	_script.push('}catch(e){console.error(e)}');
	chrome.tabs.executeScript(tabId, {
		runAt: "document_end",
		code: _script.join("")
	});
};
/*移除iframe*/
function removeIframe(){
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	  	unLockUI(tabs[0].id);
	  	var _script = [];
		_script.push('try{');
		_script.push('	var iframe = document.getElementById(\"step-iframe\");');
		_script.push('	iframe.remove();');
		_script.push('}catch(e){console.error(e)}');
		chrome.tabs.executeScript(tabs[0].id, {
			runAt: "document_end",
			code: _script.join("")
		});	
	});
};

/*监听单击插件图标的事件*/
chrome.browserAction.onClicked.addListener(function(tab){
	if(!isActive){
		storage.clearFlowDesc();
		storage.clearFlowData();
	}
	isActive = true;
	insertIframe(tab.id);
});
/*监听创建新TAB的事件*/
chrome.tabs.onCreated.addListener(function(tab){

	if(!isActive){
		return;
	}
	if(flow.getStatus()!=statusType.PAUSE){
		insertIframe(tab.id);		
	}
});
/*监听当前TAB刷新的事件*/
chrome.tabs.onUpdated.addListener(function(tab){

	if(!isActive){
		return;
	}
	if(flow.getStatus()!=statusType.PAUSE){
		insertIframe(tab.id);		
	}
});


function getProxyStatus(){
	return proxyStatus;
};

/*监听web page传递回来的事件，主要是控制流程*/
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
   var reqMsg = request;
   /* 消息格式 */
   /* { command: "", message : "", data : "" } */
   switch(reqMsg.command){
   		case "getFlowDesc":
			storage.clearFlowDesc();
			storage.saveFlowDesc(flow.getFlowDesc());
   			break;
   		case "init":
   			var ajax = new ajaxService();
   			ajax.getTaskData(reqMsg.data.taskId,function(data){
   				flow.init(reqMsg.data.taskId,JSON.parse(data.taskDetail),getTemplate(data.platformId));   				
   				storage.clearFlowDesc();
				storage.saveFlowDesc(flow.getFlowDesc());
   			},function(reason){
   				console.log(reason);
   			}); 
   			break;
   		case "start":
   			//开始购物流程
   			flow.start(reqMsg.data.taskId,reqMsg.data.taskBuyerId);  			
   			break;
   		case "pause":
   			//暂停购物流程
   			unLockUI();
   			flow.pause();   			
   			break;
   		case "stop":
   			//停止购物流程
   			if(flow.getStatus()==statusType.RUNNING){
   				if(confirm("正在执行任务，您确定要停止吗？")){
					flow.stop(); 
				}
   			}else{
   				flow.stop();  
   			}   			
   			break;
   		case "retry":
   			//重试购物流程
   			var currIndex = reqMsg.data.currIndex;
   			flow.retry(currIndex);
   			break;
   		case "continue":
   			//继续购物流程下一步
   			var currIndex = reqMsg.data.currIndex;
   			flow.continue(currIndex);
   			break;
   		case "next":   					
   			if(reqMsg.status != undefined && reqMsg.status == -1){
   				/*执行过程发生错误，重试3次*/ 
   				setTimeout(function(){ 
   					console.log("出现错误，可能是页面没有加载完成, resume "+flow.getRetryTimes()+" 次"); 
   					flow.resume(); 
   					flow.setRetryTimes(flow.getRetryTimes()+1);
   				},
   				errorDelaySecond);
   			}else{
  
   				//购物流程下一步
   				if(reqMsg.waitTime){
   					console.log("Wait "+reqMsg.waitTime + " seconds.");
   					setTimeout(function(){flow.next();},reqMsg.waitTime*1000);
   				}else{
   					setTimeout(function(){flow.next();},6000);	
   				}
   				
   				
   				//flow.next();
   			}   			
   			break;
   		case "go":
   			var step = reqMsg.step || -1;
			if (step > 1) {
				/* go to the index step */
				flow.go(step);
			}
   			break;
   		case "run":
   			var step = reqMsg.step || -1;
			if (step > 1) {
				flow.run(step);
			}
   			break;
   		case "error":
   			/*执行过程发生错误，重试3次*/
   			if(flow.getRetryTimes() < 4){
   				setTimeout(function(){ 
   					console.log("出现错误，可能是页面没有加载完成, resume "+flow.getRetryTimes()+" 次"); 
   					flow.resume(); 
   					flow.setRetryTimes(flow.getRetryTimes()+1);
   				},
   				errorDelaySecond);
   			}else{
   				flow.errorHandler(reqMsg.message);
   			}	
   			break;
   		case "closeIframe":   		
   			if(flow.getStatus()==statusType.RUNNING || flow.getStatus()==statusType.PAUSE){
   				if(confirm("正在执行任务，您确定要停止吗？")){
					isActive = false;	
   					removeIframe(); 
   					flow.stop();  
				}
   			}else{
   				isActive = false;	
   				removeIframe();  
   			}	
   			break;
   		case "hideIframe":   		
   			removeIframe();
   			break;
   		case "check_insert_status":
   			if(reqMsg.data == undefined || reqMsg.data == null){
   				console.log("页面没有加载完成, 重新注入代码（resume）");
   				flow.resume();
   			}   			
   			break;
   		case "start_auto_exe":
   			autoFlow.start();
   			window.localStorage.setItem("flow_finish",1);
   			break;
   		case "stop_auto_exe":
   			autoFlow.stop();
   			window.localStorage.setItem("flow_finish",1);
   			break;
   		case "log_auto_flow_status":   			
   			var logstats = reqMsg.data;
   			console.log("<<<<<<<<<<<<<<<<<< log flow >>>>>>>>>>>>>>> status:" + reqMsg.data);
   			window.localStorage.setItem("flow_finish",logstats); 
   			break;
   		default:
   			break;
   }
   sendResponse({ message : "command " + reqMsg.command + " process finish.", data:"" });
});


/*负责执行购物流程代码*/
function shoppingFlow(){

	var me = this; 
	var delay = 10 * 1000;
	var tabId = -1;	
	var retryTimes = 0;
	//var isRunning = false;
	
	me.templateData = {};
	me.currStepIndex = -1;	
	me.currStep = {};
	me.status = statusType.READY;
	me.taskData = {};
	me.taskId = -1;
	me.taskBuyerId = -1;

	/*设置retry次数*/
	me.setRetryTimes = function(value){
		retryTimes = value;
	};
	/*获取retry次数*/
	me.getRetryTimes = function(){
		return retryTimes;
	};
	/*把模板的参数调换成真实的值*/
	var replaceTemplate = function(data,tpl){
		var tplStr = tpl;
		if(data.platformId == 7){/*平台0010*/
			var xiuAccount = get0010Account();
			var address = getAddress();
			tplStr = tplStr.replace(/@username/ig, xiuAccount.loginName);
			tplStr = tplStr.replace(/@password/ig, xiuAccount.password);
			tplStr = tplStr.replace(/@productUrl/ig, data.productId.productUrl);
			tplStr = tplStr.replace(/@consignee/ig, address.name);
			tplStr = tplStr.replace(/@phone/ig, xiuAccount.phone);
			tplStr = tplStr.replace(/@province/ig, address.province);
			tplStr = tplStr.replace(/@city/ig, address.city);
			tplStr = tplStr.replace(/@region/ig, address.region);
			tplStr = tplStr.replace(/@street/ig, address.street);
			tplStr = tplStr.replace(/@zipCode/ig, address.zipCode);
		}else{
			/*
			tplStr = tplStr.replace(/@keyword/ig, data.searchProductKeywords[0].keyword);
			tplStr = tplStr.replace(/@category/ig, data.searchProductKeywords[0].prodcutCategory1);
			tplStr = tplStr.replace(/@minprice/ig, data.searchMinPrice);
			tplStr = tplStr.replace(/@maxprice/ig, data.searchMaxPrice);
			tplStr = tplStr.replace(/@productUrl/ig, data.productId.productUrl);
			tplStr = tplStr.replace(/@shopName/ig, data.shopName);
			*/
		}		
		return JSON.parse(tplStr);
	};
	/*初始化任务数据*/
	me.init = function(taskId,taskDetails,template){
		me.taskId = taskId;
		me.templateData = {};
		/*保存任务数据，准备开始调换数据*/
		if(typeof taskDetails == "object"){
			taskDetails = JSON.stringify(taskDetails);
		}
		me.status = statusType.READY;
		me.taskData = JSON.parse(taskDetails);
		me.templateData = replaceTemplate(me.taskData,JSON.stringify(template));
	};
	/*开始执行购物流程*/
	me.start = function(taskId,taskBuyerId){
		if(isRunning()){
			console.log("正在执行任务，如果需要重新开始，请先结束正在执行的任务，然后重试！");
			return;
		}	
		//TODO: ADD STATUS FOR AUTO FLOW
		window.localStorage.setItem("flow_finish",0);
		me.taskId = taskId;
		me.taskBuyerId = taskBuyerId;
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			/*
			chrome.tabs.update(tabs[0].id,{url:me.currStep.url}, function(tab){
				tabId = tabs[0].id;
				me.currStepIndex = -1;	
				if(!hasNextStep()){
					alert("流程已经结束。");
					return;
				}				
				me.status = statusType.RUNNING;	
				me.currStep = getNextStep();
				storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status);
				execute();
			});
			*/
			me.currStepIndex = -1;	
				if(!hasNextStep()){
					console.log("流程已经结束。");
					me.finish();
					return;
				}				
				me.status = statusType.RUNNING;	
				me.currStep = getNextStep();
				storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status);
				execute();
		});
	};
	/*暂停购物流程*/
	me.pause = function(){
		if(isRunning()){
			//TODO：暂停购物流程，先把之前的数据暂存起来	
		}
		me.status = statusType.PAUSE;		
		setTimeout(function(){ storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status); },1000);
	};
	/*停止购物流程*/
	me.stop = function(){		
		if(isRunning()){
			//TODO：如果任务正在执行，处理停止过程需要保存的数据			
		}
		storage.clearFlowDesc();
		storage.clearFlowData();		
		me.status = statusType.STOP;
		//TODO: ADD STATUS FOR AUTO FLOW
		window.localStorage.setItem("flow_finish",1);
		setTimeout(function(){ storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status); },1000);
	};
	/*停止购物流程*/
	me.errorHandler = function(errorMsg){			
		//特殊处理，如果发生错误，不终止任务，进入暂停状态待买手自行完成，然后继续下一步
		me.status = statusType.PAUSE;
		me.currStep.desc = "执行过程发生错误，流程暂停。请手动完成然后继续！";
		//me.status = statusType.ERROR;
		//me.currStep.desc = errorMsg;
		setTimeout(function(){ storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status); },1000);
	};
	/*重试当前步购物流程*/
	me.retry = function(currIndex){
		if(isRunning()){
			console.log("正在执行任务，如果需要重试当前步骤，请先结束正在执行的任务，然后重试！");
			return;
		}
		me.currStepIndex = currIndex - 1;
		if(!hasNextStep()){
			me.finish();
			return;
		}
		me.currStep = getNextStep();		
		me.status = statusType.RUNNING;	
		setTimeout(function(){ storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status); },1000);
		execute();
	};
	/*继续下一步购物流程*/
	me.continue = function(currIndex){
		if(isRunning()){
			console.log("正在执行任务，如果需要继续下一步，请先结束正在执行的任务，然后重试！");
			return;
		}
		me.currStepIndex = currIndex;
		if(!hasNextStep()){
			me.finish();
			return;
		}
		me.currStep = getNextStep();		
		me.status = statusType.RUNNING;	
		setTimeout(function(){ storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status); },1000);

		execute();
	};
	/*下一步购物流程*/
	me.next = function(){
		if(me.status==statusType.PAUSE){
			return;
		}
		if(!isRunning()){
			console.log("流程已经终止，请重新开始。");
			return;	
		}
		if(!hasNextStep()){
			me.finish();
			return;
		}
	
		me.currStep = getNextStep();		
		me.status = statusType.RUNNING;	
		storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status);
		execute();
	};
	/*goto到购物流程的某一步*/
	me.go = function(stepIndex){
		if(!isRunning()){
			console.log("流程已经终止，请重新开始。");
			return;	
		}
		me.currStepIndex = stepIndex - 1;
		if(!hasNextStep()){
			me.finish();
			return;
		}
		me.status = statusType.RUNNING;
		me.currStep = getNextStep();
		storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status);
		execute();
	};
	/*继续运行购物流程某一步*/
	me.run = function(stepIndex){
		if(!isRunning()){
			console.log("流程已经终止，请重新开始。");
			return;	
		}
		me.currStepIndex = stepIndex - 1;
		/* only run script */
		if(!hasNextStep()){
			me.finish();
			return;
		}
		me.status = statusType.RUNNING;
		me.currStep = getNextStep();
		storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status);
		me.currStep.url = '#';
		execute();
	};
	/*脚本注入不成功重做一次*/
	me.resume = function(){
		console.log("resume task");
		execute();
	};
	/*结束流程*/
	me.finish = function(){
		me.status = statusType.FINISH;		
		//TODO: ADD STATUS FOR AUTO FLOW
		window.localStorage.setItem("flow_finish",1);
		console.log("<<<<<<<<<<<<<<<< flow finish >>>>>>>>>>>>>>");
		//完成购物流程，进入待发货列表 （2）
		var ajax = new ajaxService();
		ajax.updateTaskBuyerStatus(me.taskBuyerId,2,function(result){
			storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status);			
			storage.clearFlowData();
			console.log("任务已经完成。");
		});
	};
	/*更新task状态*/
	var updateTaskStatus = function(){

	};
	/*获取流程状态*/
	me.getStatus = function(){
		return me.status;
	};
	/*判断流程是否running*/
	var isRunning = function(){
		return me.status == statusType.RUNNING;
	};
	/*执行购物流程的细节*/
	var execute = function(){
		try{
			/*开始执行脚本*/
			/*
			if(me.currStep.url != '$' && me.currStep.url != '#'){
				//打开URL
				chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
					chrome.tabs.update(tabs[0].id,{url:me.currStep.url}, function(tab){
						console.log('open link:' + me.currStep.url);
						insertScript();
					});
				});
				
			}else{
				insertScript();
			}
			*/
			insertScript();
		}catch(e){
			me.status = statusType.ERROR;
			storage.setFlowData(me.taskId,me.taskBuyerId,me.currStepIndex,me.currStep,me.status);		
			console.log("流程执行出错：" + e.message);
		}				
	};
	
	var exeTimeout;

	var insertScript = function(){			

		function executeScript(){

			//开始注入脚本执行

			var name = "jzj_script_" + new Date().getTime();
			var _script = [];
			/*node1 是注入JSON类库*/
			_script.push('try{');
			_script.push('var node = document.createElement("script");');
			_script.push('node.setAttribute("name", "' + name + '");');
			_script.push('node.setAttribute("type", "text/javascript");');
			_script.push('node.textContent = "if(typeof handlerTemplateData == \'function\'){handlerTemplateData(JSON.parse(unescape(\'' + escape(JSON.stringify(me.currStep))+ '\')))};";');			
			_script.push('document.body.appendChild(node);}catch(e){console.error(e)}');			

			function exe(){
				
				

				chrome.tabs.query({ currentWindow: true, active: true,  status: "complete" }, function (tabs) {

					if(tabs.length > 0){
						//clearTimeout(exeTimeout);
						console.log('脚本已经注入，清除settimeout');
						console.log("current step: " + me.currStepIndex);
						chrome.tabs.executeScript(null, {file: "script.js",runAt: "document_end",allFrames: true});

						chrome.tabs.executeScript(tabs[0].id, {
							runAt: "document_end",
							code: _script.join(""),
							allFrames: true
						},function(){
							/*保存执行信息*/
							var ajax = new ajaxService();
							ajax.addTaskBuyerActivityDetail({"tbActivityId":me.taskBuyerId,"stepData": JSON.stringify({"stepName":me.templateData.flowDesc[me.currStepIndex].desc,"stepDesc":me.currStep.desc})});
						});	
						console.log("end insert javascript");
					}else{
						//exeTimeout = setTimeout(function(){exe();},3000);
						exe();
					}									
				});	
			};
			exe();
			// //exeTimeout = setTimeout(function(){exe();},100);
			// if(me.currStepIndex > 6){
			// 		exeTimeout = setTimeout(function(){exe();},3000);
			// }else{
			// 	exe();	
			// }
			
			
		};	

		//setTimeout(function(){executeScript();},delay);
		executeScript();

	};
	/*判断是否有下一步*/
	var hasNextStep = function(){
		return me.currStepIndex < (me.templateData.pretreatment.length + me.templateData.product.length + me.templateData.steps.length - 1);
	};
	/*获取下一步执行数据*/
	var getNextStep = function(){
		/*如果执行下一步，说明retry可能成功，清除计数器*/
		me.setRetryTimes(0);
		me.currStepIndex++;
		var step;
		if(me.currStepIndex < me.templateData.pretreatment.length){
			step = me.templateData.pretreatment[me.currStepIndex];
		}else if(me.currStepIndex < (me.templateData.product.length + me.templateData.pretreatment.length)){
			step = me.templateData.product[me.currStepIndex - me.templateData.pretreatment.length];
		}else{
			step = me.templateData.steps[me.currStepIndex - me.templateData.product.length - me.templateData.pretreatment.length];
		}	
		return step;	
	};
	me.getFlowDesc = function(){
		return me.templateData.flowDesc;
	};
	/*获取XIU Account*/
	var get0010Account = function(){
		var account;
	    var accountIndex = window.localStorage.getItem("accountIndex") == null ? 0 : parseInt(window.localStorage.getItem("accountIndex"));
	    accountIndex = accountIndex == 10 ? 0 : accountIndex;
	    var ajax = new ajaxService();
	    var accountList = ajax.getXiuAccounts();

		for(var i=0;i<accountList.length;i++){
			if(i==accountIndex){
				account = accountList[i];
				accountIndex++;
				window.localStorage.setItem("accountIndex", accountIndex);
				break;
			}
		}
		return account;
	};

	/*获取Address*/
	var getAddress = function(){
		var address;
	    var addressIndex = window.localStorage.getItem("addressIndex") == null ? 0 : parseInt(window.localStorage.getItem("addressIndex"));
	    addressIndex = addressIndex == 4 ? 0 : addressIndex;
	    var ajax = new ajaxService();
	    var addressList = ajax.getAddresses();

		for(var i=0;i<addressList.length;i++){
			if(i==addressIndex){
				address = addressList[i];
				addressIndex++;
				window.localStorage.setItem("addressIndex", addressIndex);
				break;
			}
		}
		return address;
	};

}
/*存储到local storage serive*/
function storageService(){
	/*保存流程信息*/
	this.saveFlowDesc = function(flowDesc){
		window.localStorage.setItem("flowDesc", JSON.stringify(flowDesc));
	};
	/*清除流程执行的信息*/
	this.clearFlowDesc = function(){
		var flowItem = window.localStorage.getItem("flowDesc");
		if(flowItem!=null&&flowItem!=undefined){
			window.localStorage.removeItem("flowDesc");
		}
	};
	/*保存流程信息*/
	this.setFlowData = function(taskId,taskBuyerId,currStepIndex,currStep,status){
		var flowData = window.localStorage.getItem("flowData");
		if(flowData!=null&&flowData!=undefined){
			window.localStorage.removeItem("flowData");
		}
		var jsonFlowData = {"taskId":taskId,"taskBuyerId":taskBuyerId,"currStepIndex":currStepIndex,"currStep":currStep,"status":status};
		//console.log("jsonFlowData:" + JSON.stringify(jsonFlowData));
		window.localStorage.setItem("flowData", JSON.stringify(jsonFlowData));
	};
	/*获取流程信息*/
	this.getFlowData = function(){
		var flowData = window.localStorage.getItem("flowData");
		return JSON.parse(flowData);
	};
	/*清除流程信息*/
	this.clearFlowData = function(){
		var flowData = window.localStorage.getItem("flowData");
		if(flowData!=null&&flowData!=undefined){
			window.localStorage.removeItem("flowData");
		}
	};
};




/*自动执行任务的定时器*/
var exeInterval;
var currUserIndex = 0;

function autoExeService(){
	var flowStorage = new flowStorageService();
	var ajax = new ajaxService();
	/*自动执行器，每隔10s扫描一次*/		
	var initInterval = function(){

		exeInterval = setInterval(function(){
			var flowFinish = window.localStorage.getItem("flow_finish");
			if(flowFinish){
				if(flowFinish == 1){
					exe();
				}else{
					console.log("任务正在执行中...");
				}
			}else{
				exe();
			}			
			

			// var flowData = flowStorage.getFlowData();		
			// if(flowData){
			// 	var jsonFlowData = JSON.parse(flowData);					
			// 	if(jsonFlowData.status == 'FINISH' || jsonFlowData.status == 'ERROR' || jsonFlowData.status == 'STOP'){
			// 		exe();
			// 	}else{
			// 		console.log("任务正在执行中...");
			// 	}				
			// }else{
			// 	exe();
			// }
		},
		30*1000);
	};
	/*自动登录*/		
	var login = function(callback){
		var currJzjAccount;
		
		var jzjAccounts = ajax.getJzjAccounts();

		currUserIndex = window.localStorage.getItem("currUserIndex") == null ? 0 : window.localStorage.getItem("currUserIndex");
		currUserIndex = currUserIndex == 300 ? 0 : currUserIndex;

		for(var i=0;i<jzjAccounts.length;i++){
			if(i==currUserIndex){
				currJzjAccount = jzjAccounts[i];
				currUserIndex++;
				window.localStorage.setItem("currUserIndex",currUserIndex) 
				break;
			}
		}
		ajax.login(currJzjAccount.loginName,currJzjAccount.password,
			function(data){					
				console.log(currJzjAccount.loginName + " login success.");
				if(typeof callback == 'function'){
					callback(data);
				}				
			}
		);
	};

	/*代理切换设置*/
	var switchProxy = function(callback){
		myProxy = null;
		if (chrome.experimental !== undefined && chrome.experimental.proxy !== undefined){
	        myProxy = chrome.experimental.proxy;
		}
	    else if (chrome.proxy !== undefined){
	        myProxy = chrome.proxy;
	    }
	    else{
	        alert('Need proxy api support, please update your Chrome');
	    }

	    myProxy.settings.onChange.addListener(function(obj){
	    	console.log(JSON.stringify(obj));
	    });


	    var proxyCfg;
	    proxyIndex = window.localStorage.getItem("proxyIndex") == null ? 0 : parseInt(window.localStorage.getItem("proxyIndex"));
	    proxyIndex = proxyIndex == 300 ? 0 : proxyIndex;
	    var ajax = new ajaxService();
	    var proxyCfgList = ajax.getProxys();

		for(var i=0;i<proxyCfgList.length;i++){
			if(i==proxyIndex){
				proxyCfg = proxyCfgList[i];
				proxyIndex++;
				window.localStorage.setItem("proxyIndex", proxyIndex);
				break;
			}
		}
		if(!proxyCfg){
			console.log("Can not find proxy config.");
			proxyStatus = 1;
			return;
		}

		var config = {
		  mode: "fixed_servers",
		  //mode: "direct",
		  rules: {
		    proxyForHttp: {
		      scheme: "http",
		      host: proxyCfg.host,
		      port: parseInt(proxyCfg.port)
		    },
		    bypassList: ["baidu.com"]
		  }
		};    

		myProxy.settings.clear({"scope":"regular"});
		
		//TODO: Just for test
		proxyStatus = 0;
		if(typeof callback == 'function'){
			callback();
		}
	
		// myProxy.settings.set({"value": config}, function (obj) { 
		// 	var ajax2 = new ajaxService();
	 //    	ajax2.testProxy(function(data){
	 //    		if(data){
	 //    			proxyStatus = 0;
	 //    			window.localStorage.setItem("proxyStatus", proxyStatus);
		// 			console.log('switch proxy success. index = ' + proxyIndex);	
		// 			if(typeof callback == 'function'){
		// 				callback();
		// 			}
		// 			//return;
	 //    		}else{
		// 			proxyStatus = 1;
		// 			window.localStorage.setItem("proxyStatus", proxyStatus);
		// 			//如果失败，递归处理，直到成功
		// 			console.log('switch proxe failure. index = ' + proxyIndex);
		// 			setTimeout(function(){switchProxy();},1000);
	 //    		}    		
	 //    	},function(reason){
	 //    		proxyStatus = 1;
	 //    		window.localStorage.setItem("proxyStatus", proxyStatus);
		// 		//如果失败，递归处理，直到成功
		// 		console.log('switch proxe failure. index = ' + proxyIndex);
		// 		setTimeout(function(){switchProxy();},1000);
	 //    	});
		// });

		
	};
	/*执行任务*/
	var exe = function(){
		//设置自动流程的状态
		//TODO: ADD STATUS FOR AUTO FLOW
		window.localStorage.setItem("flow_finish",0);
		switchProxy(function(){
			login(function(){
				ajax.getShop20TaskForBuyer(function(data){
					if(data){
						if(data.length>0){

				   			ajax.getTaskData(data[0].taskId,function(taskData){

				   				/*初始化流程*/
				   				flow.init(data[0].taskId,JSON.parse(taskData.taskDetail),getTemplate(taskData.platformId));   				
				   				storage.clearFlowDesc();
								storage.saveFlowDesc(flow.getFlowDesc());

								var userId = window.localStorage.getItem("userId");
								/*判断是否已经接手了，但还没有完成*/
								ajax.isExistTaskBuyer(userId,data[0].taskId,function(existBuyerTasks){
									if(existBuyerTasks.length > 0){				
										ajax.updateTaskBuyerStatus(existBuyerTasks[0].taskBuyerId,1,function(taskBuyerData){
											//TODO: 需要这个taskBuyerId去提交数据
											flow.start(data[0].taskId,taskBuyerData.taskBuyerId); 
										},function(reason){
											alert(reason);
										});															
									}else{
										ajax.addTaskBuyer({"userId":userId,"taskId":data[0].taskId,"statusId":1},function(taskBuyerData){
											//TODO: 需要这个taskBuyerId去提交数据
											flow.start(data[0].taskId,taskBuyerData.taskBuyerId); 
										},function(reason){
											alert(reason);
										});
									}
								});



				   			},function(reason){
				   				console.log(reason);
				   			});
							
						}else{
							alert("获取任务出错，暂停！");	
							_this.stop();
						}
					}else{
						alert("获取任务出错，暂停！");	
						_this.stop();
					}
				},function(reason){
					alert("没有任务可以执行");
					_this.stop();
				});
			});
		});
		
	};
	var _this = this;
	/*开始自动流程*/
	this.start = function(){
		console.log("auto exe start...");
		initInterval();			
	};
	/*停止自动流程*/
	this.stop = function(){
		console.log("auto exe stop...");
		clearInterval(exeInterval);
	};
	
};
