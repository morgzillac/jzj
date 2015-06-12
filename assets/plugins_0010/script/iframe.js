

$(function(){


	
	var flowStorage = new flowStorageService();
	var jsonFlowData = null;
	var ajax = new ajaxService();
	var userId = -1;
	var userLogin = {};

	
	initExecuteTask(getCurrExecuteTask());
	initTaskList();
	initAccount();
	initPendingTaskList();

	/*初始化Task列表*/
	function initTaskList(){	
		ajax.getTaskForBuyer(function(data){
			$('.taskTab .task-item .task-item-li').remove();
			$.each(data,function(i,n){
				var $taskItem = $('.taskTab .task-item');
				var $li = $taskItem.find('.task-item-template').clone();
				$li.removeClass('hide').removeClass('task-item-template').addClass('task-item-li');
				var $pImage = $li.find('.product-image');
				var $tbId = $li.find('.task-id');
				var $tbDeleteId = $li.find('.task-delete');
				var $pName= $li.find('.product-name');
				var $pDesc = $li.find('.product-desc');
				//$pImage.attr('src',n.productImage);
				$tbId.bind("click",function(){ goToExecute(n.taskId); });
				//TODO: 只是为了测试用，后期需要删除
				$tbDeleteId.bind("click",function(){ deleteTask(n.taskId); });
				$pName.text(n.productName).bind("click",function(){ goToExecute(n.taskId); });
				$pDesc.text('颜色：' + JSON.parse(n.productDesc).color + ' | 尺寸：' + JSON.parse(n.productDesc).size);
				$taskItem.append($li);
			});
		});	
	};
	/*初始化待处理Task列表*/
	function initPendingTaskList(){	
		ajax.getPendingTaskForBuyer(function(data){
			$('.accountTab .task-item .task-item-li').remove();
			if(data == undefined || data.length <= 0){
				var $taskItem = $('.accountTab .task-item');
				var $li = $taskItem.find('.task-item-template').clone();
				$li.removeClass('hide').removeClass('task-item-template').addClass('task-item-li');
				$li.html('<h5 class="text-muted">暂时没有需要处理的任务</h5>');
				$taskItem.append($li);
				return;
			}			
			$.each(data,function(i,n){
				var $taskItem = $('.accountTab .task-item');
				var $li = $taskItem.find('.task-item-template').clone();
				$li.removeClass('hide').removeClass('task-item-template').addClass('task-item-li');
							
				var $tbProcess3 = $li.find('.process-3');
				var $tbProcess5 = $li.find('.process-5');

				var $pName= $li.find('.product-name');
	
				var $pImage = $li.find('.product-image');
				
				var $pDesc = $li.find('.product-desc');
				$pName.text(n.productName);
				$pDesc.text('颜色：' + JSON.parse(n.productDesc).color + ' | 尺寸：' + JSON.parse(n.productDesc).size);
				//$pImage.attr('src', getGlobalConfig().WEB.HOST + '/' + n.productImage);
				if(n.buyerStatusId == 3){
					//绑定已收货事件
					$tbProcess3.bind("click",function(){ processTaskBuyer(n.taskBuyerId,4); }).removeClass('hide').addClass('show');
				}else if(n.buyerStatusId == 5){
					//绑定已评价事件
					$tbProcess5.bind("click",function(){ processTaskBuyer(n.taskBuyerId,6); }).removeClass('hide').addClass('show');
				}
				$taskItem.append($li);
			});
		});	
	};
	/*处理taskbuyer的状态*/
	function processTaskBuyer(taskBuyerId,statusId){
		ajax.updateTaskBuyerStatus(taskBuyerId,statusId,function(result){
			initPendingTaskList();
		},function(reason){
			alert(reason);
		});
	};
	/*跳转到执行tab*/
	function goToExecute(id){
		var flowData = flowStorage.getFlowData();
		if(flowData != undefined && flowData != null){
			var jsonFlowData = JSON.parse(flowData);
			if(jsonFlowData.status == 'RUNNING' || jsonFlowData.status == 'PAUSE'){
				alert('当前有任务正在执行或者未完成，如果需要新开始，请停止当前任务先。');
				return;
			}
		}		
		initExecuteTask(id);
		$(".hTab").removeClass("active");
		$(".execute-task").addClass("active");
		$(".tab").hide();
		$(".executeTab").removeClass("hide").show();	
		saveCurrExecuteTask(id);
	};
	//TODO: 只是为了测试用，后期需要删除
	function deleteTask(id){
		if(confirm('你确定要删除这个任务吗？')){
			ajaxDelete(getGlobalConfig().API.HOST + '/ShopTask/'+id, { },				
				function success(data,status,xhr){	
					initTaskList();
				},function error(error){

				}
			);
		}		
	};
	/*初始化账号信息*/	
	function initAccount(){
		userId = window.localStorage.getItem("userId");
		userLogin = window.localStorage.getItem("userLogin");
		var $userLogin = $(".userLogin");
		var $totalPoints = $(".total-points");
		var $totalCash = $(".total-cash");
		$userLogin.text(userLogin);
		ajax.queryBalance(function(data){
			$totalPoints.text(data.points);
			$totalCash.text(data.cash);
		});
	};
	/*初始化准备执行信息*/
	function initExecuteTask(taskId){
		ajax.getTaskForBuyer(function(data){
			$('.executeTab .task-item li.curr-item').remove();
			$.each(data,function(i,n){			
				if(n.taskId == taskId){
					var $taskItem = $('.executeTab .task-item');						
					var $li = $taskItem.find('.task-item-template').clone();
					$li.removeClass('hide').removeClass('task-item-template').addClass('curr-item');
					var $pImage = $li.find('.product-image');
					var $pName= $li.find('.product-name');
					var $pDesc = $li.find('.product-desc');
					//$pImage.attr('src',n.productImage);					
					$pName.attr("taskid",n.taskId).text(n.productName);
					$pDesc.text('颜色：' + JSON.parse(n.productDesc).color + ' | 尺寸：' + JSON.parse(n.productDesc).size);						
					$taskItem.append($li);
					chrome.extension.sendRequest({command:"init",message: "",data:{"taskId":n.taskId}}, function(response) {
						setTimeout(function(){
							var flowDesc = flowStorage.getFlowDesc();	
							if(flowDesc==null&&flowDesc==undefined){
								/*准备开始执行任务，初始化flowitem*/
								chrome.extension.sendRequest({command:"getFlowDesc",message: "",data:""}, function(response) {
									/*获取流程的执行描述信息*/
									refreshFlowData();
								});
							}else{
								refreshFlowData();
							}
						},3000);														
					});
				}					
			});
		});
	};
	/*加载执行任务的步骤信息*/
	function refreshFlowData(){
		var flowDesc = flowStorage.getFlowDesc();		
		if(flowDesc!=null&&flowDesc!=undefined){
			var json = JSON.parse(flowDesc);
			if(json == undefined || json == null){
				return;
			}
			$(".execute-item").html("");
			$.each(json,function(i,n){
				$(".execute-item").append("<h2 id=\"" + n.index + "\">" + n.desc + "</h2>");
			});	
		}	  
		/*获取流程的执行步骤*/
		var flowData = flowStorage.getFlowData();		
		if(flowData!=null&&flowData!=undefined){
			jsonFlowData = JSON.parse(flowData);
			$(".execute-item h2[id='"+ jsonFlowData.currStepIndex +"']").addClass("active");
			$(".execute-item").scrollTop(parseInt(jsonFlowData.currStepIndex) * 20);					
		}
		/*根据流程状态控制按钮*/
		if(jsonFlowData!=null&&jsonFlowData!=undefined){
			$(".task-start-div").hide();
			$(".task-running-div").show();
			deactiveBtn($(".btn-execute"));
			if(jsonFlowData.status=='RUNNING'){
				activeBtn($(".btn-pause"));
				deactiveBtn($(".btn-continue"));
				activeBtn($(".btn-stop"));
			}else if(jsonFlowData.status=='ERROR' || jsonFlowData.status=='STOP'){
				$(".task-start-div").show();
				$(".task-running-div").hide();
				activeBtn($(".btn-execute"));
				deactiveBtn($(".task-running-div button"));
			}else if(jsonFlowData.status=='FINISH'){
				$(".task-start-div").show();
				$(".task-running-div").hide();
				deactiveBtn($(".btn-execute"));
				deactiveBtn($(".task-running-div button"));
			}else{
				deactiveBtn($(".btn-pause"));
				activeBtn($(".btn-continue"));
				deactiveBtn($(".btn-stop"));
			}			
		}else{
			$(".task-start-div").show();
			$(".task-running-div").hide();
			activeBtn($(".btn-execute"));
			deactiveBtn($(".task-running-div button"));
		}
		/*状态更新*/
		if(jsonFlowData!=null&&jsonFlowData!=undefined){
			if(jsonFlowData.status=='RUNNING'){
				$(".status-light").text('运行中');
				$(".status-desc").text(jsonFlowData.currStep.desc);
			}else if(jsonFlowData.status=='PAUSE'){
				$(".status-light").text('暂停');
				$(".status-desc").text(jsonFlowData.currStep.desc);
			}else if(jsonFlowData.status=='STOP'){
				$(".status-light").text('停止');
				$(".status-desc").text('流程已经停止。');
			}else if(jsonFlowData.status=='ERROR'){
				$(".status-light").text('错误');
				$(".status-desc").text('执行过程发生错误，流程已终止。');
			}else if(jsonFlowData.status=='FINISH'){
				$(".status-light").text('完成');
				$(".status-desc").text('任务已经完成。');
			}else{
				$(".status-light").text('未知');
				$(".status-desc").text('...');
			}
		}else{
			$(".status-light").text('准备');
			$(".status-desc").text('...');
		}
		setTimeout(function(){ refreshFlowData(); },1000);
	};
	function activeBtn(obj){
		$(obj).removeClass("bg-muted").addClass("bg-jzj").removeAttr("disabled");	
	};
	function deactiveBtn(obj){
		$(obj).removeClass("bg-jzj").addClass("bg-muted").attr("disabled","disabled");
	};
	/*执行任务*/
	/*{id : 1, name : "待付款"},*/
	/*{id : 2, name : "待发货"},*/
	/*{id : 3, name : "待收货"},*/
	/*{id : 4, name : "待退款"},*/
	/*{id : 5, name : "待评价"},*/
	/*{id : 6, name : "待评选"},*/
	/*{id : 7, name : "已完成"}*/
	$('.btn-execute').click(function(){
		var taskid = $(".task-item li.curr-item:first").find(".product-name").attr("taskid");
		ajax.canTakeTask(taskid,function(data){
			if(data.result){
				/*判断是否已经接手了，但还没有完成*/
				ajax.isExistTaskBuyer(userId,taskid,function(existBuyerTasks){
					if(existBuyerTasks.length > 0){
						/*
						if(existBuyerTasks[0].statusId == 1){
							ajax.updateTaskBuyerStatus(existBuyerTasks[0].taskBuyerId,1,function(taskBuyerData){
								//TODO: 需要这个taskBuyerId去提交数据
								chrome.extension.sendRequest({command:"start",message: "",data:{"taskId":taskid,"taskBuyerId":taskBuyerData.taskBuyerId}}, function(response) {
									deactiveBtn($('.btn-execute'));
								});
							},function(reason){
								alert(reason);
							});
						}else{
							alert("您已经做过次任务，并且还没完成，请完成后再继续！");
						}		
						*/
					
						ajax.updateTaskBuyerStatus(existBuyerTasks[0].taskBuyerId,1,function(taskBuyerData){
								//TODO: 需要这个taskBuyerId去提交数据
								chrome.extension.sendRequest({command:"start",message: "",data:{"taskId":taskid,"taskBuyerId":taskBuyerData.taskBuyerId}}, function(response) {
									deactiveBtn($('.btn-execute'));
								});
							},function(reason){
								alert(reason);
							});
											
					}else{
						ajax.addTaskBuyer({"userId":userId,"taskId":taskid,"statusId":1},function(taskBuyerData){
							//TODO: 需要这个taskBuyerId去提交数据
							chrome.extension.sendRequest({command:"start",message: "",data:{"taskId":taskid,"taskBuyerId":taskBuyerData.taskBuyerId}}, function(response) {
								deactiveBtn($('.btn-execute'));
							});
						},function(reason){
							alert(reason);
						});
					}
				});
				
			}else{
				alert('该任务已经全部被接手，请换一个试试！');
			}			
		},function(reason){
			alert(reason);
		});				
	});
	/*暂停任务*/
	$('.btn-pause').click(function(){
		chrome.extension.sendRequest({command:"pause",message: "",data:""}, function(response) {
			console.log(response);	
			deactiveBtn($('.btn-pause'));
		});
	});
	/*继续任务*/
	$('.btn-continue').click(function(){
		chrome.extension.sendRequest({command:"continue",message: "",data:{"currIndex":jsonFlowData.currStepIndex}}, function(response) {
			console.log(response);	
			deactiveBtn($('.btn-continue'));
		});
	});
	/*停止任务*/
	$('.btn-stop').click(function(){
		chrome.extension.sendRequest({command:"stop",message: "",data:""}, function(response) {
			console.log(response);	
			deactiveBtn($('.btn-stop'));
		});
	});
	/*注销*/
	$(".btn-logout").click(function(){
		clearSession();
		location.href = "index.html";
	});
	/*变现*/
	$(".btn-points2cash").click(function(){	
		window.open(getGlobalConfig().WEB.HOST + '/#/app/financial/cashout');
	});
	/*提现*/
	$(".btn-cashout").click(function(){
		window.open(getGlobalConfig().WEB.HOST + '/#/app/financial/cashout');
	});
	/*Tab切换操作*/
	$(".view-new-task").click(function(){
		$(".hTab").removeClass("active");
		$(this).addClass("active");
		$(".tab").hide();
		$(".taskTab").removeClass("hide").show();
		initTaskList();
	});
	$(".execute-task").click(function(){
		$(".hTab").removeClass("active");
		$(this).addClass("active");
		$(".tab").hide();
		$(".executeTab").removeClass("hide").show();
		initExecuteTask(getCurrExecuteTask());
	});
	$(".my-account").click(function(){
		$(".hTab").removeClass("active");
		$(this).addClass("active");
		$(".tab").hide();
		$(".accountTab").removeClass("hide").show();
		initAccount();
		initPendingTaskList();
	});
	/*关闭Iframe*/
	$(".closeSidebar").click(function(){
		chrome.extension.sendRequest({command:"closeIframe",message: "",data:""}, function(response) {
			console.log(response);		  
		});
	});
	/*缩小Iframe*/
	$(".hideSidebar").click(function(){
		chrome.extension.sendRequest({command:"hideIframe",message: "",data:""}, function(response) {
			console.log(response);		  
		});
	});
	/*自动执行任务*/
	$(".btn-autoExecute").click(function(){
		var autoExe = new autoExeService();
		autoExe.start();
		$(".btn-autoExecute").removeClass('show').addClass('hide');
		$(".btn-cancelAutoExecute").removeClass('hide').addClass('show');
	});
	/*取消自动执行任务*/
	$(".btn-cancelAutoExecute").click(function(){
		var autoExe = new autoExeService();
		autoExe.stop();
		$(".btn-autoExecute").removeClass('hide').addClass('show');
		$(".btn-cancelAutoExecute").removeClass('show').addClass('hide');
	});










	/*自动执行任务的定时器*/
	var exeInterval;
	var currUserIndex = 0;
	
	function autoExeService(){
		/*自动执行器，每隔10s扫描一次*/		
		var initInterval = function(){
			exeInterval = setInterval(function(){
				var flowData = flowStorage.getFlowData();		
				if(flowData){
					var jsonFlowData = JSON.parse(flowData);
					if(jsonFlowData == 'FINISH' || jsonFlowData == 'ERROR' || jsonFlowData == 'STOP'){
						exe();
					}else{
						console.log("任务正在执行中...");
					}				
				}else{
					exe();
				}
			},
			10*1000);
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
					break;
				}
			}
			ajax.login(currJzjAccount.loginName,currJzjAccount.password,
				function(data){					
					initTaskList();
					initAccount();
					initPendingTaskList();
					if(typeof callback == 'function'){
						callback(data);
					}
					console.log(currJzjAccount.loginName + " login success.");
				}
			);
		};
		/*swith proxy*/
		var swithProxy = function(callback){
			chrome.extension.sendRequest({command:"swith_proxy",message: "",data:""}, function(response) {
				function checkStatus(){
					if(window.localStorage.getItem("proxyIndex") == 1){
						setTimeout(function(){checkStatus();},3000);
					}else{
						if(typeof callback == 'function'){
							callback();
						}
					}
				};
				checkStatus();	  
			});
		};

		/*执行任务*/
		var exe = function(){
			swithProxy(function(){
				login(function(){
					ajax.getShop20TaskForBuyer(function(data){
						if(data){
							if(data.length>0){
								goToExecute(data[0].taskId);
								/*判断是否已经接手了，但还没有完成*/
								ajax.isExistTaskBuyer(userId,data[0].taskId,function(existBuyerTasks){
									if(existBuyerTasks.length > 0){					
										ajax.updateTaskBuyerStatus(existBuyerTasks[0].taskBuyerId,1,function(taskBuyerData){
											//TODO: 需要这个taskBuyerId去提交数据
											chrome.extension.sendRequest({command:"start",message: "",data:{"taskId":taskid,"taskBuyerId":taskBuyerData.taskBuyerId}}, function(response) {
												deactiveBtn($('.btn-execute'));
											});
										},function(reason){
											alert(reason);
										});															
									}else{
										ajax.addTaskBuyer({"userId":userId,"taskId":taskid,"statusId":1},function(taskBuyerData){
											//TODO: 需要这个taskBuyerId去提交数据
											chrome.extension.sendRequest({command:"start",message: "",data:{"taskId":taskid,"taskBuyerId":taskBuyerData.taskBuyerId}}, function(response) {
												deactiveBtn($('.btn-execute'));
											});
										},function(reason){
											alert(reason);
										});
									}
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
	
});
