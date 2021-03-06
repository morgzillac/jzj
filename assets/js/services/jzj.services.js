'use strict';

function joinHost(url){
	return app.global.host + '' + url;
}

//request 拦截器，为http请求加上header信息
app.factory('sessionInjector', ['toaster','$location','$q','$window', function(toaster,$location,$q,$window){
	return {
      request: function (config) {
          //如果User Session信息已经保存了，包在request的header发回去给服务器
          if (angular.isObject(app.userSession)) {         
          	if($window.localStorage.getItem("token")){
          		config.headers['token'] = $window.localStorage.getItem("token");
          	}else{
          		//JUST FOR TEST
          		config.headers['token'] = '123';
          	}            
          }                    
          return config;
      },
      requestError: function(reason) {
            toaster.pop('error', '请求失败', reason);
      },
      response:function(response) {     
            switch (response.status) {            	
                case (200):
                    //TODO: 保存session token
                    break;
                case (500):
                    toaster.pop('error', '响应错误', "错误码：500，服务器系统内部错误");
                    break;
                case (401):
                    toaster.pop('error', '响应错误', "错误码：401，未登录");
                    break;
                case (403):
                    toaster.pop('error', '响应错误', "错误码：403，无权限执行此操作");
                    break;
                case (408):
                    toaster.pop('error', '响应错误', "错误码：408，请求超时");
                    break;
                case (404):
                    toaster.pop('error', '响应错误', "错误码：404，服务没找到");
                    break;
                default:
                    toaster.pop('error', '响应错误', "未知错误, 错误消息：" + reason);
            }
            return response;
        },
        responseError : function(reason){
        	var deferred = $q.defer();

        	if(angular.isDefined(reason.data.code) && reason.data.code == 'login_password_wrong'){
        		deferred.reject(reason);
        	}else if(angular.isDefined(reason.data.code) && reason.data.code == 'access_notloggedin'){
        		$location.path("/access/signin");
        	}else if(angular.isDefined(reason.data.message)){
        		deferred.reject(reason);
        	}else{
        		switch (reason.status) {            	
	                case (500):
	                	toaster.pop('error', '响应错误', "错误码：500，服务器系统内部错误");
	                    break;
	                case (401):
	                    toaster.pop('error', '响应错误', "错误码：401，未登录");
	                    break;
	                case (403):
	                    toaster.pop('error', '响应错误', "错误码：403，无权限执行此操作");
	                    break;
	                case (408):
	                    toaster.pop('error', '响应错误', "错误码：408，请求超时");
	                    break;
	                case (404):
	                    toaster.pop('error', '响应错误', "错误码：404，服务没找到");
	                    break;
	                default:
	                    toaster.pop('error', '响应错误', "未知错误, 错误消息：" + angular.toJson(reason));
	            }
        	}      	
			return deferred.promise;
        }
    };
}]);
//Promise Get的公共请求方式
app.factory('promiseGet', ['$http','$q', function($http,$q){
	return function(url){
		var deferred = $q.defer();
		var api = joinHost(url);
		$http.get(api)
		.success(function(result){
			if(angular.isObject(result)){
				deferred.resolve(angular.fromJson(result));	
			}else{			
				deferred.resolve(result);
			}
		})
		.error(function(reason){					
			deferred.reject(reason);
		});
		return deferred.promise;
	};
}]);
//Promise Post的公共请求方式
app.factory('promisePost', ['$http','$q', function($http,$q){
	return function(url,para){
		var deferred = $q.defer();
		var api = joinHost(url);
		$http.post(api,para)
		.success(function(result){
			if(angular.isObject(result)){
				deferred.resolve(angular.fromJson(result));	
			}else{			
				deferred.resolve(result);
			}
		})
		.error(function(reason){
			deferred.reject(reason);
		});
		return deferred.promise;
	};
}]);
//Promise Put的公共请求方式
app.factory('promisePut', ['$http','$q', function($http,$q){
	return function(url,para){
		var deferred = $q.defer();
		var api = joinHost(url);
		$http.put(api,para)
		.success(function(result){
			if(angular.isObject(result)){
				deferred.resolve(angular.fromJson(result));	
			}else{			
				deferred.resolve(result);
			}
		})
		.error(function(reason){
			deferred.reject(reason);
		});
		return deferred.promise;
	};
}]);
//restAPI Get的公共请求方式
app.factory('restAPIGet', ['$resource', function($resource){
	return function(url){
		var api = joinHost(url);
		return $resource(api).get();
	};
}]);
//restAPI Post的公共请求方式
app.factory('restAPIPost', ['$resource', function($resource){
	return function(url,para){
		var api = joinHost(url);
		return $resource(api, para);
	};
}]);
//平台操作Service
app.factory('platforms', ['promisePost','promiseGet',function(promisePost,promiseGet){
	var platformList = [
			    {id : 1, name: '淘宝', filter:'taobao', color:'#23b7e5', active : false},
			    {id : 2, name: '天猫', filter:'tmall', color:'#7266ba', active : false},
			    {id : 3, name: '京东', filter:'jd', color:'#fad733', active : false},
			    {id : 4, name: '当当', filter:'dangdang', color:'#27c24c', active : false},
			    {id : 5, name: '亚马逊', filter:'amazon', color:'#fad733', active : false},
			    {id : 6, name: '一号店', filter:'yhd', color:'#23b7e5', active : false},
			    {id : 7, name: '0010', filter:'0010', color:'#23b7e5', active : false}
			  ];
	return {
		getAll : function(){
			//TODO: 获取所有平台，这个需要跟数据库对应，写死的就好
			return platformList;
		},
		getDefault : function(){
			return {id : 1, name: '淘宝', filter:'taobao', color:'#23b7e5', active : false};
		},
		getPlatform : function(platformId){
			var platform = {};
			angular.forEach(platformList,function(value){
				if(value.id == platformId){
					platform = value;
				}
			});
			return platform;
		},
		getAllWithShopCount : function(){
			//TODO: 需要从后台的API来获取
			return [
			    {id : 1, name: '淘宝', count : 3},
			    {id : 2, name: '天猫', count : 2},
			    {id : 3, name: '京东', count : 1},
			    {id : 4, name: '当当', count : 0},
			    {id : 5, name: '亚马逊', count : 0},
			    {id : 6, name: '一号店', count : 0},
			    {id : 7, name: '0010', count : 0}
			  ];
		},
		getPlatformName : function(platformId){
			var name = "";
			angular.forEach(platformList,function(value){
				if(value.id == platformId){
					name = value.name;
				}
			});
			return name;
		}		
	};
}]);
//不同平台的任务类型
app.factory('taskTypes',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		//TODO: 根据平台查询任务类型
		query : function(platformId){
			return [
				{id : 1, name : "文字好评订单", point : 10.5}
				// {id : 2, name : "图文好评订单", point : 14.5},
				// {id : 3, name : "聚划算", point : 10.5},
				// {id : 4, name : "直通车订单", point : 10.5}
			];
		},
		//获取所有的任务类型
		getAll : function(){
			return [
				 {id : 1, name : "文字好评订单", point : 10.5}
				// {id : 2, name : "图文好评订单", point : 14.5},
				// {id : 3, name : "聚划算", point : 10.5},
				// {id : 4, name : "直通车订单", point : 10.5}
			];
		}
	};
}]);
//终端
app.factory('terminals',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		getAll : function(){
			return [
				{id : 1, name : "电脑"},
				{id : 2, name : "手机/Pad"}
			];
		}
	};
}]);
//大任务状态
app.factory('taskStatuss',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		getAll : function(){
			return [
				{id : 1, name : "已完成"},
				{id : 2, name : "未发布"},
				{id : 3, name : "待处理"},
				{id : 4, name : "进行中"}
			];
		}	
	};
}]);
//子任务状态
app.factory('subTaskStatuss',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		getAll : function(){
			return [
				{id : 1, name : "待付款"},
				{id : 2, name : "待发货"},
				{id : 3, name : "待收货"},
				{id : 4, name : "待退款"},
				{id : 5, name : "待好评"},
				{id : 6, name : "待评选"},
				{id : 7, name : "已完成"}				
			];
		}	
	};
}]);
//任务流程 Service
app.factory('flowDatas',function(){
	var flowData = null;
	return {
		create : function(platformId){
			var taobao = { 		
					"taskId" : -1,	
					"status" : 2,		
					"platformId" : 1, 
					"platformName" : "淘宝",
					"shopId" : -1, 
					"taskTypeId" : 1,
					"productId" : -1,
					"productPrice" : 0,
					"totalTasks" : 1,					
				    "commission": 0,
				    "bonus": 0,
				    "terminal": null,
				    "approvalPriority": 0,
				    "taskPriority": 0,
				    "includeShipping": 1,
					"taskDetail" : {
						"currItem" : "app.task.item1",
						"flowItem" : ['app.task.item1','app.task.item2','app.task.item3','app.task.item4','app.task.item5','app.task.item6'],
						"taskId" : -1,
						"status" : 2,
						"platformId" : 1, 
						"platformName" : "淘宝",
						"shopId" : -1, 
						"shopName" : "",
						"taskTypeId" : 1,
						"productId" : -1,
						"productPrice" : 0, 
						"productCount" : 1,
						"searchProductKeywords" : [{"keyword":"", "totalTasks":"", "prodcutCategory1" : "", "prodcutCategory2" : "", "prodcutCategory3" : "", "prodcutCategory4" : "", "orderQuantity":null }],
						"searchMinPrice" : "",
						"searchMaxPrice" : "",
						"searchProductLocation" : "",
						"includeShipping" : true,
						"totalTasks" : "",					
						"orderMessages" : [""],
						"agreeFastRefunds" : false,
						"taskPriority" : -1,
						"agreeBonus" : false,
						"bonus" : 0,
						"agreeApprovalPriority" : false,
						"agreeQualityPraise" : false,
						"praiseKeywords" : ["","",""],
						"paymentPiont" : false,
						"paymentDeposit" : false,
						"paymentBank" : false
					}					
				};
			var tmall = { "platformId" : 2, "shopId" : -1, "taskTypeId" : 1 };
			var jd = { "platformId" : 3, "shopId" : -1, "taskTypeId" : 1 };
			var yhd = { "platformId" : 4, "shopId" : -1, "taskTypeId" : 1 };
			var dangdang = { "platformId" : 5, "shopId" : -1, "taskTypeId" : 1 };
			var amazon = { "platformId" : 6, "shopId" : -1, "taskTypeId" : 1 };
			var p0010 = { 		
					"taskId" : -1,	
					"status" : 2,		
					"platformId" : 7, 
					"platformName" : "0010",
					"shopId" : 25, 
					"taskTypeId" : 1,
					"productId" : -1,
					"productPrice" : 0,
					"totalTasks" : 1,					
				    "commission": 0,
				    "bonus": 0,
				    "terminal": null,
				    "approvalPriority": 0,
				    "taskPriority": 0,
				    "includeShipping": 1,
					"taskDetail" : {
						"currItem" : "app.task.item1",
						"flowItem" : ['app.task.item1','app.task.item2','app.task.item3','app.task.item5','app.task.item6'],
						"taskId" : -1,
						"status" : 2,
						"platformId" : 1, 
						"platformName" : "0010",
						"shopId" : -1, 
						"shopName" : "shop_0010",
						"taskTypeId" : 1,
						"productId" : -1,
						"productPrice" : 0, 
						"productCount" : 1,
						"searchProductKeywords" : [{"keyword":"", "totalTasks":"", "prodcutCategory1" : "", "prodcutCategory2" : "", "prodcutCategory3" : "", "prodcutCategory4" : "", "orderQuantity":null }],
						"searchMinPrice" : "",
						"searchMaxPrice" : "",
						"searchProductLocation" : "",
						"includeShipping" : true,
						"totalTasks" : "",					
						"orderMessages" : [""],
						"agreeFastRefunds" : false,
						"taskPriority" : -1,
						"agreeBonus" : false,
						"bonus" : 0,
						"agreeApprovalPriority" : false,
						"agreeQualityPraise" : false,
						"praiseKeywords" : ["","",""],
						"paymentPiont" : false,
						"paymentDeposit" : false,
						"paymentBank" : false
					}					
				};
			var model;
			switch(platformId){
				case 1:
					model = taobao;
					break;
				case 2:
					model = taobao;
					break;
				case 3:
					model = taobao;
					break;
				case 4:
					model = taobao;
					break;
				case 5:
					model = taobao;
					break;
				case 6:
					model = taobao;
					break;				
				case 7:
					model = p0010;
					break;	
				default:
					model = taobao;
					break;
			}
			return model;
		},
		get : function(){
			return flowData;
		},
		set : function(data){
			flowData = data;
		}
	};
});
//ShopTast 对象数据交互 Service
app.factory('tasks', ['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		add : function(shopTask){
			return promisePost('/shopTask', shopTask);	
		},
		pubishTask : function(shopTask){
			return promisePost('/shopTask/publish', { taskJson : shopTask });
		},
		save : function(taskId,shopTask){
			return promisePost('/shopTask/' + taskId, shopTask);
		},
		queryByStatus : function(statusId){
			return promiseGet('/shopTask/?status=' + statusId);
		},
		queryByPlatform : function(platformId){
			return promiseGet('/shopTask/?PlatformId=' + platformId);
		},
		filter : function(statusId,condition,currentPage,pageSize){
			var queryPara = '?sort=createdAt DESC&status=' + statusId;
			if(angular.isDefined(condition.platformId) && condition.platformId != -1){
				queryPara += '&platformId=' + condition.platformId;
			}
			if(angular.isDefined(condition.shopId) && condition.shopId != -1){
				queryPara += '&shopId=' + condition.shopId;
			}
			if(angular.isDefined(condition.taskTypeId) && condition.taskTypeId != -1){
				queryPara += '&taskTypeId=' + condition.taskTypeId;
			}
			var skip = pageSize * (currentPage - 1);
			queryPara += '&limit=' + pageSize + '&skip=' + skip;
			return promiseGet('/VWShopTask/' + queryPara);
		},
		get : function(taskId){
			return promiseGet('/shopTask/' + taskId);
		},
		statsShopOrderCount : function(shopId){
			//TODO: 统计店铺最近发布任务的单数
			return 1;
		},
		queryCount : function(condition){
			return promiseGet('/query/count/?model=task&where=' + condition);
		},
		calcCost : function(shopTask){
			return promisePost('/trans/calcCost', {"taskJson": angular.toJson(shopTask)});
		}		
	};
}]);
//TaskList Service 
app.factory('taskLists',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		queryByStatus : function(statusId){
			return promiseGet('/VWShopTask/?status=' + statusId);
		},
		queryByPlatform : function(platformId){
			return promiseGet('/VWShopTask/?PlatformId=' + platformId);
		},
		filter : function(statusId,condition,currentPage,pageSize){
			var queryPara = '?sort=createdAt DESC&status=' + statusId;
			if(angular.isDefined(condition.platformId) && condition.platformId != -1){
				queryPara += '&platformId=' + condition.platformId;
			}
			if(angular.isDefined(condition.shopId) && condition.shopId != -1){
				queryPara += '&shopId=' + condition.shopId;
			}
			if(angular.isDefined(condition.taskTypeId) && condition.taskTypeId != -1){
				queryPara += '&taskTypeId=' + condition.taskTypeId;
			}
			var skip = pageSize * (currentPage - 1);
			queryPara += '&limit=' + pageSize + '&skip=' + skip;
			return promiseGet('/VWShopTask/' + queryPara);
		},
		pending : function(platformId,currentPage,pageSize){
			//TODO: 按平台来过滤，暂时没有实现
			var queryPara = "where={\"platformId\":" + platformId + "}";
			var skip = pageSize * (currentPage - 1);
			queryPara += '&limit=' + pageSize + '&skip=' + skip;
			return promiseGet('/VWShopTask/pending/?sort=createdAt DESC&' + queryPara);
		},
		queryCount : function(condition){
			return promiseGet('/query/count/?model=task&where=' + condition);
		}
	};
}]);
//TaskBuyer 买手接单子任务 Service
app.factory('taskBuyers',['promisePost','promiseGet','promisePut',function(promisePost,promiseGet,promisePut){
	return {
		filter : function(taskId,statusId,currentPage,pageSize){
			var queryPara = '?sort=createdAt DESC&taskId=' + taskId + '&buyerStatusId=' + statusId;
			var skip = pageSize * (currentPage - 1);
			queryPara += '&limit=' + pageSize + '&skip=' + skip;
			return promiseGet('/VWTaskBuyer/' + queryPara);
		},
		queryCount : function(condition){
			return promiseGet('/query/count/?model=TaskBuyer&where=' + condition);
		},
		updateStatus : function(taskId,statusId){
			return promisePut('/TaskBuyer/' + taskId, {"statusId":statusId});
		},
		query : function(condition,currentPage,pageSize){
			var queryPara = '?sort=createdAt DESC';
			if(angular.isDefined(condition.platformId) && condition.platformId != -1){
				queryPara += '&platformId=' + condition.platformId;
			}
			if(angular.isDefined(condition.statusId) && condition.statusId != -1){
				queryPara += '&buyerStatusId=' + condition.statusId;
			}			
			var skip = pageSize * (currentPage - 1);
			queryPara += '&limit=' + pageSize + '&skip=' + skip;
			return promiseGet('/VWTaskBuyer/' + queryPara);
		}
	};
}]);
//ShopProduct 对象数据交互 Service
app.factory('products', ['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		add : function(product){
			return promisePost('/shopProduct', product);	
		},
		get : function(productId){
			return promiseGet('/shopProduct?id=' + productId);
		},
		save : function(productId,product){
			return promisePost('/shopProduct/' + productId, product);
		},
		getExt: function(productExtID){
			return promiseGet('/shopProduct?productExtID=' + productExtID);	
		},
		newEmpty : function(){
			return {
				"productId" : -1,
				"shopId" : -1,
				"productName" : "",
				"productUrl" : "",
				"productDesc" : { "color" : "", "size" : ""},
				"productPrice" : 0,
				"productPrice2" : "",
				"productImage" : "",
				"productExtID" : -1
			};
		}		
	};
}]);
//User Type Service
app.factory('userTypes',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		getAll : function(){
			return [
				{id : 1, name : '商家'},
				{id : 2, name : '买手'}
			];
		}
	};
}]);
//User 对象数据交互 Service
app.factory('users', ['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		// login : function(email, password){
		// 	//TODO: 用户登录, 返回USERID, SESSIONTOTAN
		// 	var para = { "login" : email, "password" : password };
		// 	return promisePost('/user/login',para);
		// },
		logout : function(){
			//TODO: 退出登录
								
		},
		get : function(userId){
			//TODO: 获取用户信息，根据userid
			return promiseGet('/user?id=' + userId);			
		},
		save : function(userId, user){
			//TODO: 保存用户编辑信息
			return promisePost('/user/update/' + userId, user);
		},		
		add : function(user){
			//TODO: 添加一个用户
			return promisePost('/user/', user);	
		},
		resetPasswordRequest : function(email){
			return promisePost('/user/resetPasswordRequest', {"email" : email});
		},
		resetPassword : function(email,password,thecode){
			return promisePost('/user/resetPassword', { "email" : email, "password" : password, "thecode" : thecode });
		},
		newEmpty : function(){
			return {
		        "userId": -1, 
		        "userTypeId": 1, 
		        "userLogin": "", 
		        "password": "", 
		        "payPassword": "", 
		        "image": "", 
		        "qq": "", 
		        "email": "", 
		        "mobile": "",
		        "wechat": ""
		    };
		}
	};
}]);
//UserBank Type 定义
app.factory('bankTypes',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		getAll : function (){
			return [
				{id : 1, name : "支付宝"},
				{id : 2, name : "财富通"},
				{id : 3, name : "中国工商银行"},
				{id : 4, name : "中国建设银行"},
				{id : 5, name : "中国农业银行"},
				{id : 6, name : "中国银行"}
			];
		},
		getZFB : function(){
			return {id : 1, name : "支付宝"};
		},
		getCFT : function(){
			return {id : 2, name : "财富通"};
		},
		getYHKTypes: function(){
			return [
				{id : 3, name : "中国工商银行"},
				{id : 4, name : "中国建设银行"},
				{id : 5, name : "中国农业银行"},
				{id : 6, name : "中国银行"}
			];
		}
	};
}]);
//UserBank 对象数据交互 Service
app.factory('userBanks',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		get : function(userId, bankType){
			//TODO: 获取一条User Bank记录，根据userid 和 banktype
			//return promiseGet('/userBank/?userId=' + userId + '&bankType=' + bankType);
			return promiseGet('/userBank/?bankType=' + bankType);
		},
		getAllYHKBanks : function(userId){
			//TODO: 获取一条User Bank记录，根据userid 和 banktype
			//return promiseGet('/userBank/?userId=' + userId);
			return promiseGet('/userBank');
		},
		query : function(userId){
			//return promiseGet('/userBank/?userId=' + userId);	
			return promiseGet('/userBank');	
		},
		add : function(userBank){
			//TODO: 添加一条User Bank记录，可以是支付宝，财付通，银行卡等
			return promisePost('/userBank', userBank);	
		},
		newEmpty : function(bankType){
			//新建一个空对象
			return {
			      "userId": -1, 
			      "userBankId": -1, 
			      "bankType": bankType, 
			      "accountName": "", 
			      "accountNumber": "", 
			      "branch": "", 
			      "city": "", 
			      "screenshot": ""
			};
		}
	};
}]);
//BuyerAccount 对象数据交互 Service
app.factory('buyerAccounts', ['promisePost','promiseGet','promisePut',function(promisePost,promiseGet,promisePut){
	return {
		get : function(buyerAccountId){
			return promiseGet('/buyerAccount/'+buyerAccountId);
		},
		query : function(platformId){
			//TODO: 获取买号绑定信息，根据userid和platformid，返回的是一个数组
			return promiseGet('/buyerAccount/?platformId=' + platformId);			
		},
		add : function(buyerAccount){
			//TODO: 添加买号信息
			return promisePost('/buyerAccount', buyerAccount);
		},
		update : function(buyerAccountId,buyerAccount){
			//TODO: 添加买号信息
			return promisePut('/buyerAccount/'+buyerAccountId, buyerAccount);
		},
		checkAccount : function(platformId,accountLogin){
			var para = { "platformId" : platformId, "accountLogin" : accountLogin };
			//TODO: 检查买号信息
			return promisePost('/buyerAccount/checkAccount/', para);
		},
		checkww : function(platformId,wangwang){
			var para = { "platformId" : platformId, "wangwang" : wangwang };
			//TODO: 检查买号信息
			return promisePost('/buyerAccount/checkww/', para);
		},
		count : function(userId, platformId){
			//TODO: 统计某个平台下的买号绑定数量，不能拿超过3个
			var para = { "userId" : userId, "platformId" : platformId };
			return 2;
		},
		newEmpty : function(){
			return {
					    "buyerAccountId": -1, 
					    "userId": -1, 
					    "platformId": -1, 
					    "accountLogin": "", 
					    "wangwang": "", 
					    "addressId" : null,
					    "wwScreenshot": ""
					};
		}
	};
}]);
//买手收货地址 Service
app.factory('userAddresses',['promisePost','promiseGet','promisePut',function(promisePost,promiseGet,promisePut){
	return {
		get : function(addressId){
			return promiseGet('/useraddress/'+addressId);
		},
		query : function(userId){
			//return promiseGet('/useraddress/?userId'+userId);	
			return promiseGet('/useraddress');	
		},
		add : function(userAddress){
			return promisePost('/useraddress/', userAddress);
		},
		update : function(userAddress){
			return promisePut('/useraddress/'+userAddress.addressId, userAddress);
		},
		newEmpty : function(){
			return {
		        "recipient": "",
		        "province": null,
		        "city": null,
		        "district": null,
		        "phone": null,
		        "addressId": -1,
		        "userId": -1,
		        "addressTypeId": null,
		        "streetAddress": "",
		        "postalCode": ""
		    };
		}
	};
}]);
//SellerShop 对象数据交互 Service
app.factory('sellerShops', ['promisePost','promiseGet','promisePut',function(promisePost,promiseGet,promisePut){
	return {
		get : function(shopId){
			return promiseGet('/sellerShop/'+shopId);
		},
		query : function(platformId){
			//TODO: 获取店铺绑定信息, 返回的是一个数组
			return promiseGet('/sellerShop/?platformId=' + platformId);	
		},
		getAllShops : function(userId){
			//TODO: 获取店铺绑定信息, 返回的是一个数组
			//return promiseGet('/sellerShop/?userId=' + userId);	
			return promiseGet('/sellerShop');	
		},
		add : function(sellerShop){
			//TODO: 添加店铺绑定信息
			return promisePost('/sellerShop', sellerShop);
		},
		update : function(shopId,sellerShop){
			return promisePut('/sellerShop/'+shopId, sellerShop);
		},
		count : function(userId, platformId){
			//TODO: 统计某个平台下的店铺绑定数量，不能拿超过3个
			var para = { "userId" : userId, "platformId" : platformId };
			return 2;
		},
		newEmpty : function(){
			return {
					    "shopId": -1, 
					    "userId": -1, 
					    "platformId": -1, 
					    "url": "", 
					    "wangwang": "", 
					    "province": "", 
					    "city": "", 
					    "street": ""
					} ;
		}
	};
}]);
//商品所在地 Service
app.factory('productLocations',function(){
	return {
		getAll : function(){
			return [ "全国"
					,"北京"
					,"上海"
					,"广州"
					,"深圳"
					,"杭州"
					,"海外"
					,"江浙沪"
					,"珠三角"
					,"京津冀" 
					,"东三省"
					,"港澳台"
					,"江浙沪皖"
					,"长沙"
					,"长春"
					,"成都"
					,"重庆"
					,"大连"
					,"东莞"
					,"佛山"
					,"福州"
					,"贵阳"
					,"合肥"
					,"金华"
					,"济南"
					,"嘉兴"
					,"昆明"
					,"宁波"
					,"南昌"
					,"南京"
					,"青岛"
					,"泉州"
					,"沈阳"
					,"苏州"
					,"天津"
					,"温州"
					,"无锡"
					,"武汉"
					,"西安"
					,"厦门"
					,"郑州"
					,"中山"
					,"石家"
					,"哈尔"
					,"安徽"
					,"福建"
					,"广东"
					,"广西"
					,"贵州"
					,"海南"
					,"河北"
					,"河南"
					,"湖北"
					,"湖南"
					,"江苏"
					,"江西"
					,"吉林"
					,"辽宁"
					,"宁夏"
					,"青海"
					,"山东"
					,"山西"
					,"陕西"
					,"云南"
					,"四川"
					,"西藏"
					,"新疆"
					,"浙江"
					,"澳门"
					,"香港"
					,"台湾"
					,"内蒙古"
					,"黑龙江"];
		}
	};
});
//交易状态配置
app.factory('transStatus',function(){
	return {
		getAll : function(){
			return [
				{id : 1, name : "成功"},
				{id : 2, name : "失败"},
				{id : 3, name : "处理中"}
			];
		}
	};
});
//交易状态配置
app.factory('transType',function(){
	return {
		getAll : function(){
			return [
				{id : 1, name : "提现"},				
				{id : 2, name : "充值现金"},
				{id : 3, name : "充值押金"},
				{id : 4, name : "充值赚点"},
				{id : 5, name : "变现"}
			];
		}
	};
});
//提现 Service
app.factory('cashouts',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		get : function(currentPage,pageSize){	
			var skip = pageSize * (currentPage - 1);		
			return promiseGet('/cashout/?sort=createdAt DESC&limit=' + pageSize + '&skip=' + skip);
		},
		add : function(cashout){
			return promisePost('/trans/cashout', cashout);
		},
		queryCount : function(){
			return promiseGet('/query/count/?model=cashout');
		},
		newEmpty : function(){
			return {
			    "amount": 0,
			    "points": 0,
			    "fee": 0,
			    "comment": "",
			    "status": 3,
			    "cashoutId": -1,
			    "userId": -1,
			    "cashoutTypeId": 3,
			    "type": 1
			};
		}
	};
}]);
//充值 Service
app.factory('recharges',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		get : function(currentPage,pageSize){	
			var skip = pageSize * (currentPage - 1);		
			return promiseGet('/recharge/?sort=createdAt DESC&limit=' + pageSize + '&skip=' + skip);
		},
		add : function(recharge){
			return promisePost('/trans/recharge', recharge);
		},
		queryCount : function(){
			return promiseGet('/query/count/?model=recharge');
		},
		newEmpty : function(){
			return {
			    "amount": 0,
			    "points": 0,
			    "comment": "",
			    "rechargeId": -1,
			    "userId": -1,
			    "rechargeTypeId": 2,
			    "type" : 1,
			    "isFrozen" : false
			};
		}
	};
}]);
//变现 Service
app.factory('points2cashs',['promisePost','promiseGet',function(promisePost,promiseGet){
	return {
		get : function(currentPage,pageSize){
			var skip = pageSize * (currentPage - 1);
			return promiseGet('/points2cash/?sort=createdAt DESC&limit=' + pageSize + '&skip=' + skip);
		},
		add : function(points2cash){
			return promisePost('/trans/points2cash', points2cash);
		},
		queryCount : function(){
			return promiseGet('/query/count/?model=points2cash');
		},
		newEmpty : function(){
			return {
			    "amount": 0,
			    "points": 0,
			    "fee": 0,
			    "comment": "",
			    "cashoutId": -1,
			    "userId": -1
			};
		}
	};
}]);
//变现 Service
app.factory('transactions',['promisePost','promiseGet','restAPIGet',function(promisePost,promiseGet,restAPIGet){
	return {
		get : function(currentPage,pageSize){
			var skip = pageSize * (currentPage - 1);
			return promiseGet('/transaction/?sort=createdAt DESC&limit=' + pageSize + '&skip=' + skip);
		},
		downloadCSV : function(userId){
			window.open("/transaction/csv/?token=" + window.localStorage.getItem("token"));
		},
		queryCount : function(){
			return promiseGet('/query/count/?model=transaction');
		}
	};
}]);
//余额查询 Service 
app.factory('balances', ['promiseGet','promisePost',function(promiseGet,promisePost){
	return {
		get : function(){
			return promiseGet('/query/balance');
		},
		checkPayPassword : function(payPassword){
			return promisePost('/service/checkPayPassword',{"password":payPassword});
		}
	};
}]);
/*赚点套餐定义*/
app.factory('pointsPackages',['promiseGet',function(promiseGet){
	return {
		getAll : function(){
			return [
				{id:1,name:"1赚点迷你包",amount:0.01,points:1,remark:"接手任务时会被冻结，完成后自动解冻"},
				{id:2,name:"20赚点标准包",amount:20,points:20,remark:"接手任务时会被冻结，完成后自动解冻"},
				{id:3,name:"50赚点高级包",amount:50,points:50,remark:"接手任务时会被冻结，完成后自动解冻"},
				{id:4,name:"100赚点豪华包",amount:100,points:100,remark:"接手任务时会被冻结，完成后自动解冻"}
			];
		}
	}; 
}]);
/*附件类型*/
app.factory('attachmentType',['promiseGet',function(promiseGet){
	return {
		getAll : function(){
			return [
				{id:1,name:"userImg",remark:"头像信息和账号截图信息"},
				{id:2,name:"taskImg",remark:"任务截图信息"},
				{id:3,name:"productImg",remark:"产品截图信息"},
				{id:4,name:"otherImg",remark:"其他"}
			];
		}
	};
}]);
/*网站公告状态定义*/
app.factory('postStatus',['promiseGet',function(promiseGet){
	return {
		getAll : function(){
			return [
				{id:1,name:"正常"},
				{id:2,name:"过期"}
			];
		}
	};
}]);
/*网站公告类型定义*/
app.factory('postType',['promiseGet',function(promiseGet){
	return {
		getAll : function(){
			return [
				{id:1,name:"商家网站公告"},
				{id:2,name:"商家常见问题"},
				{id:3,name:"买手网站公告"},
				{id:4,name:"买手常见问题"}
			];
		}
	};
}]);
/*网站公告*/
app.factory('posts',['promiseGet',function(promiseGet){
	return {
		get : function(postType){
			return promiseGet('/post?sort=createdAt ASC&limit=8&postType=' + postType + '&statusId=1');
		}
	};
}]);
