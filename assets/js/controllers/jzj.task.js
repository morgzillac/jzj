
'use strict';

/*
** 任务管理页面相关的Controller
*/

// 发布任务流程控制基础控制器
app.controller('TaskFlowCtrl',['$scope','$state','flowDatas','$stateParams','$location','tasks', function($scope,$state,flowDatas,$stateParams,$location,tasks){
	$scope.flowItem = [];
	$scope.prevItem = '';
	$scope.currItem = 'app.task.item1';
	$scope.currItemIndex = 0;
	$scope.platformId = -1;
	$scope.flowData = {}; 
	$scope.isFirstPost = true;
	$scope.$on('$viewContentLoaded',function(){						
		if($location.path() == '/app/taskflow/new' || $location.path() == '/app/taskflow/new/item1'){
			//如果是create,设置默认值
			$scope.platformId = 1;			
			$scope.flowData = flowDatas.create($scope.platformId);
			$scope.flowItem = $scope.flowData.taskDetail.flowItem;
			//SET status is 未发布
			$scope.flowData.status = 2;
			$scope.flowData.taskDetail.status = 2;
			$scope.currItemIndex = 0;			
			$state.go($scope.flowItem[0]);
			$scope.$broadcast('flow-ready',$scope.flowData);
		}else{			
			var id = $stateParams.id;
			if(id != 'new' && $scope.isFirstPost){
				$scope.isFirstPost = false;
				tasks.get(id).then(function(result){
					$scope.platformId = result.platformId;			
					$scope.flowData = result;
					$scope.flowData.taskDetail = angular.fromJson(result.taskDetail);
					$scope.flowItem = $scope.flowData.taskDetail.flowItem;
					$scope.currItem = $scope.flowData.taskDetail.currItem;
					$state.go($scope.currItem);
					$scope.$broadcast('flow-ready',$scope.flowData);
				});
			}else{
				$scope.$broadcast('flow-ready',$scope.flowData);
			}
		}		
	});
	$scope.$on('change-platform',function(event, platformId){
		$scope.platformId = platformId;		
		$scope.flowData = flowDatas.create($scope.platformId);	
		$scope.flowData.platformId = platformId;
		$scope.flowItem = $scope.flowData.taskDetail.flowItem;
		$scope.flowData.taskDetail.platformId = platformId;
	});
	$scope.$on('next-step',function(event,data){		
		var index = 0;
		angular.forEach($scope.flowItem,function(value,key){			
			if(value == data.item){				
				index = key+1;
			}
		});
		$scope.currItemIndex = index;
		$scope.prevItem = $scope.currItem;
		$scope.currItem = $scope.flowItem[index];
		$scope.flowData = data.flowData; 
		$scope.flowData.taskDetail.currItem = $scope.currItem;
		//把TaskDetails数据映射到上层的表结构的列里面
		mapData();
		$scope.flowData.taskDetail = angular.toJson($scope.flowData.taskDetail);		
		if($scope.flowData.taskId > 0){			
			tasks.save($scope.flowData.taskId,$scope.flowData).then(function(result){
				$scope.flowData = result;
				$scope.flowData.taskDetail = angular.fromJson($scope.flowData.taskDetail);
				$state.go($scope.flowItem[index]);
			});
		}else{	
			//if($scope.currItemIndex > 1){/*第一步不保存，暂时有点问题，shopid没有存下来，所以先注掉*/
				tasks.add($scope.flowData).then(function(result){
					$scope.flowData = result;
					$scope.flowData.taskDetail = angular.fromJson($scope.flowData.taskDetail);
					$state.go($scope.flowItem[index]);
				});

			//}else{
			//	$state.go($scope.flowItem[index]);
			//}
		}		
	});
	$scope.$on('prev-step',function(event,data){
		var index = 0;
		angular.forEach($scope.flowItem,function(value,key){
			if(value == data.item){
				index = key-1;
			}
		});
		$scope.currItemIndex = index;
		$scope.prevItem = $scope.currItem;
		$scope.currItem = $scope.flowItem[index];
		$scope.flowData = data.flowData;
		$scope.flowData.taskDetail.currItem = $scope.currItem;
		//把TaskDetails数据映射到上层的表结构的列里面
		mapData();
		$state.go($scope.flowItem[index]);
	});
	$scope.$on('pay-ok',function(event,data){
		$scope.flowData = data.flowData; 
		//重置会step1
		$scope.flowData.taskDetail.currItem = 'app.task.item1';
		//发布成功，加到已发布状态列表里
		$scope.flowData.status = 4;
		$scope.flowData.taskDetail.status = 4;
		//把TaskDetails数据映射到上层的表结构的列里面
		mapData();
		$scope.flowData.taskDetail = angular.toJson($scope.flowData.taskDetail);		
		tasks.save($scope.flowData.taskId,$scope.flowData).then(function(result){
			$scope.flowData = result;
			$scope.flowData.taskDetail = angular.fromJson($scope.flowData.taskDetail);
			//发布task
			var jsonFlowData = angular.toJson($scope.flowData);
			tasks.pubishTask(jsonFlowData).then(function(result){
				//TODO: 处理支付事件
				$location.url('/app/tasklist/4');
			});			
		});
	});
	$scope.$on('pay-cancel',function(event,data){
		$scope.flowData = data.flowData; 
		//重置会step1
		$scope.flowData.taskDetail.currItem = 'app.task.item1';
		//发布成功，加到已发布状态列表里
		$scope.flowData.status = 2;
		$scope.flowData.taskDetail.status = 2;
		//把TaskDetails数据映射到上层的表结构的列里面
		mapData();
		$scope.flowData.taskDetail = angular.toJson($scope.flowData.taskDetail);		
		tasks.save($scope.flowData.taskId,$scope.flowData).then(function(result){
			$scope.flowData = result;
			$scope.flowData.taskDetail = angular.fromJson($scope.flowData.taskDetail);
			//TODO: 处理支付事件
			$location.url('/app/tasklist/2');
		});
	});	
	var mapData = function(){
		$scope.flowData.platformId = $scope.flowData.taskDetail.platformId;
		$scope.flowData.shopId = $scope.flowData.taskDetail.shopId;
		$scope.flowData.taskTypeId = $scope.flowData.taskDetail.taskTypeId;
		$scope.flowData.productId = $scope.flowData.taskDetail.productId;
		$scope.flowData.productPrice = $scope.flowData.taskDetail.productPrice;
		if($scope.flowData.taskDetail.totalTasks){
			$scope.flowData.totalTasks = $scope.flowData.taskDetail.totalTasks;	
		}		
		if($scope.flowData.taskDetail.includeShipping){
			$scope.flowData.includeShipping = 1;
		}else{
			$scope.flowData.includeShipping = 0;
		}		
		$scope.flowData.bonus = $scope.flowData.taskDetail.bonus;
		
		if($scope.flowData.taskDetail.agreeApprovalPriority){
			$scope.flowData.approvalPriority = 5;
		}else{
			$scope.flowData.approvalPriority = 0;
		}		
		$scope.flowData.taskPriority = $scope.flowData.taskDetail.taskPriority;
	};
	$scope.setCurrIndex = function(index){
		$scope.currItemIndex = index;
	};
}]);
//选择任务类型
app.controller('TaskFlowItem1Ctrl',['$scope','flowDatas','sellerShops','taskTypes', 'platforms','tasks','$location','slidebox','toaster', function($scope,flowDatas,sellerShops,taskTypes,platforms,tasks,$location,slidebox,toaster){
	var userId = app.userSession.userId;
	$scope.thisItem = "app.task.item1";
	$scope.selectedPlatform = -1;
	$scope.platforms = [];
	$scope.selectedShop = -1;
	$scope.shops = [];
	$scope.selectedTaksType = -1;
	$scope.tasktypes = [];
	$scope.flowData = {}; 
	$scope.selectedShopName = "";
	$scope.shopOrderCount = 0;
	$scope.$on('flow-ready',function(event,flowData){
		$scope.flowData = flowData;
		$scope.platforms = platforms.getAllWithShopCount();		
		$scope.selectedPlatform = $scope.flowData.platformId;		
		$scope.selectedShop = $scope.flowData.shopId;	
		loadShop($scope.selectedPlatform);				
		$scope.tasktypes = taskTypes.query($scope.flowData.platformId);
		$scope.selectedTaksType = $scope.flowData.taskTypeId;
	});
	$scope.nextstep = function(){
		if($scope.selectedShop < 0){
			toaster.pop('error','错误','请选择店铺' );      		
			return;
		}
		$scope.$emit('next-step', { "item" : $scope.thisItem, "flowData" : $scope.flowData });	
	};
	$scope.changePlatform = function(platformId){
		$scope.selectedPlatform = platformId;
		$scope.flowData.platformId = platformId;
		$scope.flowData.platformName = platforms.getPlatformName(platformId);
		$scope.flowData.taskDetail.platformId = platformId;
		$scope.flowData.taskDetail.platformName = platforms.getPlatformName(platformId);;
		loadShop(platformId);
		$scope.$emit('change-platform', platformId);
	};
	$scope.changeShop = function(shopId,shopName){
		$scope.selectedShop = shopId;
		$scope.selectedShopName = shopName;
		$scope.flowData.shopId = shopId;
		$scope.flowData.taskDetail.shopName = shopName;
		$scope.flowData.taskDetail.shopId = shopId;
		statsShopOrder(shopId);
	};
	$scope.changeTaskType = function(taskTypeId){
		$scope.selectedTaksType = taskTypeId;
		$scope.flowData.taskTypeId = taskTypeId;
		$scope.flowData.taskDetail.taskTypeId = taskTypeId;
	};
	$scope.go2BindSellerShop = function(){
		$location.path('/app/seller/shop/' + $scope.selectedPlatform);
	};
	var statsShopOrder = function(shopId){
		$scope.shopOrderCount = 1;
	};
	var loadShop = function(platformId){
		sellerShops.query(platformId).then(function(result){
	      $scope.shops = result;
	      angular.forEach($scope.shops,function(value){
			  if(value.shopId == $scope.selectedShop){
				$scope.selectedShopName = value.wangwang;
			  }
		  });	
	    });
	};
	$scope.viewTaskRule = function () {
      slidebox.pop('tpl/slide/task_rule.html');
    };
}]);
app.controller('TaskRuleCtrl',['$scope','$modalInstance',function($scope,$modalInstance){
	
}]);
//填写商品信息
app.controller('TaskFlowItem2Ctrl',['$scope','products','$modal', function($scope,products,$modal){
	$scope.thisItem = "app.task.item2";
	$scope.flowData = {};
	$scope.product = {};	
	$scope.totalPrice = 0;
	$scope.$on('flow-ready',function(event,flowData){
		$scope.flowData = flowData;
		if(!angular.isObject($scope.flowData.taskDetail)){
			$scope.flowData.taskDetail = JSON.parse($scope.flowData.taskDetail);
		}
		if(angular.isObject($scope.flowData.taskDetail.productId)){			
			$scope.product = $scope.flowData.taskDetail.productId;	
			$scope.product.productDesc = angular.fromJson($scope.flowData.taskDetail.productId.productDesc);
			$scope.countProductTotalPrice();
		}else{
			$scope.product = products.newEmpty();	
			$scope.product.shopId = $scope.flowData.taskDetail.shopId;		
		}							
		$scope.setCurrIndex(1);
	});
	$scope.processProduct = function(){
		if($scope.product.productUrl.length > 0){
			console.log($scope.product.productUrl);
			//提取商品ID
			var productId = extractProductId($scope.flowData.platformId,$scope.product.productUrl);
			if(productId){
				$scope.product.productExtID = productId;
				//find product
				products.getExt(productId).then(function(result){
					if(result[0]){
						$scope.product = result[0];
						$scope.product.productDesc = angular.fromJson(result[0].productDesc);
						$scope.countProductTotalPrice();
					}
				});
			}
		}
	};
	var extractProductId = function(platformId,productUrl){
		var id = -1;
		switch(platformId){
			case 1: //淘宝
				id = getQueryString(productUrl,'id');
				break;
			case 2: //天猫
				id = getQueryString(productUrl,'id');
				break;
			case 3: //京东
				id = getProductIdByUrl1(productUrl);
				break;
			case 4: //当当
				id = getProductIdByUrl1(productUrl);
				break;
			case 5: //亚马逊
				id = getProductIdByUrl2(productUrl);
				break;
			case 6: //一号店
				id = getProductIdByUrl3(productUrl);
				break;			
			default:
				break;
		}
		return id;
	};
	/*jd,dangdang*/
	var getProductIdByUrl1 = function(url){
		var id = -1;
		var arrayStr = url.split('.htm');
		if(arrayStr[0]){
			var a = arrayStr[0].split('/');
			if(a[a.length-1]){
				id = a[a.length-1];
			}
		}
		return id;
	};
	/*yhd*/
	var getProductIdByUrl2 = function(url){
		var id = -1;
		var arrayStr = url.split('?');
		if(arrayStr[0]){
			var a = arrayStr[0].split('/');
			if(a[a.length-1]){
				id = a[a.length-1];
			}
		}
		return id;
	};
	/*amazon*/
	var getProductIdByUrl3 = function(url){
		var id = -1;
		var arrayStr = url.split('?');
		if(arrayStr[0]){
			var a = arrayStr[0].split('/');
			if(a[a.length-2]){
				id = a[a.length-2];
			}
		}
		return id;
	};
	$scope.countProductTotalPrice = function(){
		$scope.totalPrice = parseFloat($scope.product.productPrice) * parseInt($scope.flowData.taskDetail.productCount);
	};		
	$scope.nextstep = function(isValid){
		if (!isValid) {
		    toaster.pop('error','错误','表单填写不正确' );
		    return;
		}
		$scope.product.productDesc = angular.toJson($scope.product.productDesc);
		if($scope.product.productId > 0){			
			products.save($scope.product.productId,$scope.product).then(function(result){
				$scope.product = result;
				$scope.product.productDesc = angular.fromJson(result.productDesc);	
				$scope.flowData.taskDetail.productId = $scope.product;		
				$scope.product.productDesc = angular.toJson($scope.product.productDesc);
				$scope.flowData.taskDetail.productId = $scope.product;
				$scope.$emit('next-step', { "item" : $scope.thisItem, "flowData" : $scope.flowData });	
			});
		}else{
			products.add($scope.product).then(function(result){
				$scope.product = result;
				$scope.product.productDesc = angular.fromJson(result.productDesc);
				$scope.flowData.taskDetail.productId = $scope.product;
				$scope.product.productDesc = angular.toJson($scope.product.productDesc);
				$scope.flowData.taskDetail.productId = $scope.product;
				$scope.$emit('next-step', { "item" : $scope.thisItem, "flowData" : $scope.flowData });	
			});
		}			
	};
	$scope.prevstep = function(){
		$scope.product.productDesc = angular.toJson($scope.product.productDesc);
		$scope.flowData.taskDetail.productId = $scope.product;
		$scope.$emit('prev-step', { "item" : $scope.thisItem, "flowData" : $scope.flowData });
	};
	$scope.openUploadModel = function () {
	    var modalInstance = $modal.open({
	      templateUrl: 'tpl/modal/file_upload.html',
	      controller: 'FileUploadCtrl',
	      size: 'lg',
	      resolve: {
	        data: function () {
	          return { "title": "上传旺旺个人截图", "image": $scope.product.productImage, "type": 3};
	        }
	      }
	    });
	    modalInstance.result.then(function (data) {        
	      $scope.product.productImage = data;      
	    });
	};
	$scope.viewShotDetails = function(url){
	    var modalInstance = $modal.open({
		    templateUrl: 'tpl/modal/view_ori_img.html',
		    controller: 'ImgViewDetailsCtrl',
		    size: 'lg',
		    resolve: {
		        data: function () {
		          return { "url":url };
		        }
		    }
	    });
	};
}]);
/*上传产品截图*/
app.controller('FileUploadCtrl', ['$scope', 'FileUploader', '$modalInstance','$window','data', function($scope, FileUploader, $modalInstance,$window,data) {    
    $scope.title = data.title;
    $scope.fildPath = data.image;
    $scope.type = data.type;
    var uploader = $scope.uploader = new FileUploader({
        url: joinHost('/file/upload?type='+$scope.type),
        alias : "thefile",
        headers :{"token":$window.localStorage.getItem("token")}
    });
    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });
    // CALLBACKS     
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.log('upload success');
        $scope.fildPath = response.files[0].fd;
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.log('upload error');
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.log('upload cancel');
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.log('upload commplete item');
        $scope.fildPath = response.files[0].fd;
    };
    uploader.onCompleteAll = function() {
        console.log('Complete All');
    };
    $scope.ok = function () {
      $modalInstance.close($scope.fildPath);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);
//查看图片详细
app.controller('ImgViewDetailsCtrl',['$scope','data',function($scope,data){
  $scope.url = data.url;
}]);
//选择刷单数量
app.controller('TaskFlowItem3Ctrl',['$scope','platforms','sellerShops','productLocations', function($scope,platforms,sellerShops,productLocations){
	$scope.thisItem = "app.task.item3";
	$scope.flowData = {}; 
	$scope.productKeywords = [];
	$scope.orderMessages = [];
	$scope.productLocation = [];
	$scope.platformName = "";
	$scope.shopName = "";
	$scope.isCanBingProductKeyword = true;
	$scope.$on('flow-ready',function(event,flowData){
		$scope.flowData = flowData;
		transProductKeywords();
		transOrderMessages();
		$scope.countPoint();
		getPlatformName($scope.flowData.taskDetail.platformId);
		getShopName($scope.flowData.taskDetail.shopId);
		transProductKeywords();
		checkProductKeywordCount();	
		$scope.productLocation = productLocations.getAll();
		$scope.setCurrIndex(2);
	});
	$scope.nextstep = function(isValid){
		if (!isValid) {
		    toaster.pop('error','错误','表单填写不正确' );
		    return;
		}
		$scope.$emit('next-step', { "item" : $scope.thisItem, "flowData" : $scope.flowData });
	};
	$scope.prevstep = function(){
		$scope.$emit('prev-step', { "item" : $scope.thisItem, "flowData" : $scope.flowData });
	};
	$scope.totalTasks = 0;
	$scope.totalPoint = 0;
	$scope.countPoint = function(){
		$scope.totalTasks = 0;
		angular.forEach($scope.flowData.taskDetail.searchProductKeywords,function(value){
			$scope.totalTasks = $scope.totalTasks + parseInt(value.orderQuantity);
		});
		$scope.flowData.taskDetail.totalTasks = $scope.totalTasks;

		$scope.totalPoint = parseInt($scope.totalTasks) * 16.6;
	};
	$scope.addSearchKeyword = function(){		
		if($scope.flowData.taskDetail.searchProductKeywords.length < 4){
			var key = $scope.flowData.taskDetail.searchProductKeywords.length + 1;
			$scope.flowData.taskDetail.searchProductKeywords.push({"keyword":"", "totalTasks":"", "prodcutCategory1" : "", "prodcutCategory2" : "", "prodcutCategory3" : "", "prodcutCategory4" : ""});
			transProductKeywords();
		}
		checkProductKeywordCount();		
	};
	var transProductKeywords = function(){
		$scope.productKeywords = [];
		for (var i = 0; i<$scope.flowData.taskDetail.searchProductKeywords.length; i++) {
			$scope.productKeywords.push({i: $scope.flowData.taskDetail.searchProductKeywords[i]});
		};
	};
	var checkProductKeywordCount = function(){
		if($scope.flowData.taskDetail.searchProductKeywords.length >= 4){
			$scope.isCanBingProductKeyword = false;
		}
	};
	$scope.addOrderMessage = function(){
		$scope.flowData.taskDetail.orderMessages.push("");
		transOrderMessages();
	};
	var transProductKeywords = function(){
		$scope.productKeywords = [];
		for (var i = 0; i<$scope.flowData.taskDetail.searchProductKeywords.length; i++) {
			$scope.productKeywords.push({i: $scope.flowData.taskDetail.searchProductKeywords[i]});
		};
	};
	var transOrderMessages = function(){
		$scope.orderMessages = [];
		for (var i = 0; i<$scope.flowData.taskDetail.orderMessages.length; i++) {
			$scope.orderMessages.push({i: $scope.flowData.taskDetail.orderMessages[i]});
		};
	};
	var getPlatformName = function(platformId){
		$scope.platformName = platforms.getPlatformName(platformId);
	};
	var getShopName = function(shopId){		
		sellerShops.get(shopId).then(function(result){
			$scope.shopName = result.wangwang;	
		});
	};
}]);
//选择增值服务
app.controller('TaskFlowItem4Ctrl',['$scope','platforms','sellerShops','tasks', function($scope,platforms,sellerShops,tasks){
	$scope.thisItem = "app.task.item4";
	$scope.flowData = {}; 
	$scope.isBindPraiseKeyword = true;
	$scope.fastDoneOption = { "10" : false, "20" : false, "30" : false };
	$scope.platformName = "";
	$scope.shopName = "";
	$scope.$on('flow-ready',function(event,flowData){
		$scope.flowData = flowData;		
		$scope.setFaskDone($scope.flowData.taskDetail.taskPriority);
		transPraiseKeyword();
		checkPraiseKeywordCount();
		getPlatformName($scope.flowData.taskDetail.platformId);
		getShopName($scope.flowData.taskDetail.shopId);
		$scope.setCurrIndex(3);
	});
	$scope.nextstep = function(){
		$scope.$emit('next-step', { "item" : $scope.thisItem, "flowData" : $scope.flowData });
	};
	$scope.prevstep = function(){
		$scope.$emit('prev-step', { "item" : $scope.thisItem, "flowData" : $scope.flowData });
	};
	$scope.calcCost = {};
	$scope.countTotal = function(){		
		tasks.calcCost($scope.flowData).then(function(result){
			$scope.calcCost = result;
		});
	};
	// $scope.suiltPoint = 16.6;
	// $scope.fastRefundPoint = 0;
	// $scope.fastDonePoint = 0;
	// $scope.addtionPoint = 0;
	// $scope.priorityReviewPoint = 0;
	// $scope.qualityPraisePoint = 0;

	// $scope.countTotal = function(){
	// 	if($scope.flowData.taskDetail.agreeFastRefunds){
	// 		$scope.fastRefundPoint = 1 * $scope.flowData.productId.productPrice * 0.006;
	// 		$scope.flowData.taskDetail.totalPoint += (1 * parseFloat($scope.flowData.productId.productPrice) * 0.006);
	// 	}
	// 	if($scope.flowData.taskDetail.taskPriority > 0){
	// 		$scope.fastDonePoint = $scope.flowData.taskDetail.taskPriority;
	// 		$scope.flowData.taskDetail.totalPoint += parseFloat($scope.flowData.taskDetail.taskPriority);
	// 	}
	// 	if($scope.flowData.taskDetail.agreeBonus){
	// 		$scope.addtionPoint = $scope.flowData.taskDetail.bonusPoint;
	// 		$scope.flowData.taskDetail.totalPoint +=  parseFloat($scope.flowData.taskDetail.bonusPoint);
	// 	}
	// 	if($scope.flowData.taskDetail.agreeApprovalPriority){
	// 		$scope.priorityReviewPoint = 5;
	// 		$scope.flowData.taskDetail.totalPoint += 5;
	// 	}
	// 	if($scope.flowData.taskDetail.agreeQualityPraise){
	// 		$scope.qualityPraisePoint = 1 * $scope.flowData.totalTasks;
	// 		$scope.flowData.taskDetail.totalPoint += 1 * $scope.flowData.totalTasks;
	// 	}
	// 	$scope.flowData.taskDetail.totalCash = parseInt($scope.flowData.totalTasks) * parseFloat($scope.flowData.productId.productPrice);
	// };
	
	$scope.setFaskDone = function(point){
		angular.forEach($scope.fastDoneOption,function(value, key){
			if(point == key){
				$scope.fastDoneOption[key] = true;
			}else{
				$scope.fastDoneOption[key] = false;
			}
		});
		$scope.flowData.taskDetail.taskPriority = point;
		$scope.countTotal();
	};
	$scope.praiseKeyword = [];
	$scope.addPraiseKeyord = function(){
		if($scope.flowData.taskDetail.praiseKeywords.length < 10){
			$scope.flowData.taskDetail.praiseKeywords.push("");
		}		
		transPraiseKeyword();
		checkPraiseKeywordCount();
	};
	var transPraiseKeyword = function(){
		$scope.praiseKeyword = [];
		for (var i = 0; i<$scope.flowData.taskDetail.praiseKeywords.length; i++) {
			$scope.praiseKeyword.push({i: $scope.flowData.taskDetail.praiseKeywords[i]});
		};
	};
	var checkPraiseKeywordCount = function(){
		if($scope.flowData.taskDetail.praiseKeywords.length >= 10){
			$scope.isBindPraiseKeyword = false;
		}		
	};
	var getPlatformName = function(platformId){
		$scope.platformName = platforms.getPlatformName(platformId);
	};
	var getShopName = function(shopId){		
		sellerShops.get(shopId).then(function(result){
			$scope.shopName = result.wangwang;	
		});
	};
}]);
//支付
app.controller('TaskFlowItem5Ctrl',['$scope','balances','tasks', function($scope,balances,tasks){
	$scope.thisItem = "app.task.item5";
	$scope.flowData = {}; 

	$scope.$on('flow-ready',function(event,flowData){
		$scope.flowData = flowData;
		calcTotalCost();
		getMyBalance();		
		$scope.setCurrIndex(4);
	});
	$scope.nextstep = function(){
		$scope.$emit('next-step', { "item" : $scope.thisItem, "flowData" : $scope.flowData });
	};
	$scope.prevstep = function(){
		$scope.$emit('prev-step', { "item" : $scope.thisItem, "flowData" : $scope.flowData });
	};
	$scope.calcCost = {};
	var calcTotalCost = function(){
		tasks.calcCost($scope.flowData).then(function(result){
			$scope.calcCost = result;
		});
	};
	$scope.balance = {};
	var getMyBalance = function(){		
		balances.get().then(function(result){
			$scope.balance = result;
		});
	};

}]);
//发布成功
app.controller('TaskFlowItem6Ctrl',['$scope','$timeout', function($scope,$timeout){
	$scope.thisItem = "app.task.item6";
	$scope.flowData = {}; 
	$scope.timespan = 5;
	$scope.$on('flow-ready',function(event,flowData){
		$scope.flowData = flowData;
		timeout5();
	});
	var timer;
	var timeout5 = function(){
		timer = $timeout(function(){
			$scope.timespan--;
			if($scope.timespan <= 0){
				$scope.payOk();
			}else{
				timeout5();
			}
		},1000);
	};
	$scope.payOk = function(){
		$timeout.cancel(timer);
		$scope.$emit('pay-ok', { "item" : $scope.thisItem, "flowData" : $scope.flowData });
	};
	$scope.payCancel = function(){
		$timeout.cancel(timer);
		$scope.$emit('pay-cancel', { "item" : $scope.thisItem, "flowData" : $scope.flowData });
	};
}]);
//待处理的任务
app.controller('PendingTaskCtrl',['$scope','$stateParams','platforms','taskLists','slidebox',function($scope,$stateParams,platforms,taskLists,slidebox){
	$scope.platformName = "";
	$scope.platformId = -1;
	$scope.statusId = 4;
	$scope.taskList = [];
	$scope.$watch('$viewContentLoaded',function(){
		$scope.platformId = $stateParams.platformId;
		$scope.platformName = platforms.getPlatformName($scope.platformId);
		pendingTaskList(1,4);
		queryCount();
	});
	$scope.$on('pageChanged',function(event,data){
	    pendingTaskList(data.currentPage,data.pageSize);
	});
	var pendingTaskList = function(currentPage,pageSize){
		taskLists.pending($scope.platformId,currentPage,pageSize).then(function(result){
			$scope.taskList = result;
		});
	};
	var queryCount = function(){
		var condition = "{\"platformId\":" + $scope.platformId + ",\"status\":" + $scope.statusId + ",\"assigned\":{\">\":1}}";
	    taskLists.queryCount(condition).then(function(result){
	      $scope.$broadcast('resultsLoaded', result);
	    });
	};
	$scope.viewDetail = function (taskId) {
      slidebox.pop('tpl/slide/task_details.html',{"taskId":taskId});
    };
}]);
app.controller('TaskBuyerCtrl',['$scope','taskBuyers',function($scope,taskBuyers){
	$scope.statusId = 2;//待发货
	$scope.taskId = -1;
	$scope.expanded = false;
	$scope.taskBuyerList= [];
	$scope.toggleOpen = function(taskId){
		$scope.expanded = !$scope.expanded;
		$scope.taskId = taskId;
		filterTaskBuyer(1,4);
	};
	$scope.toggleClose = function(){
		$scope.expanded = !$scope.expanded;
	};
	$scope.filterTaskBuyer = function(statusId){
		$scope.statusId = statusId;
		filterTaskBuyer(1,4);
	};
	$scope.updateTaskBuyerStatus = function(taskBuyerId,statusId){		
		taskBuyers.updateStatus(taskBuyerId,statusId).then(function(result){
			filterTaskBuyer(1,4);
		});
	};
	var filterTaskBuyer = function(currentPage,pageSize){
		taskBuyers.filter($scope.taskId,$scope.statusId,currentPage,pageSize).then(function(result){
			$scope.taskBuyerList = result;
		});
	};
}]);
//进行中的任务
app.controller('VTaskListCtrl',['$scope','$stateParams','platforms','taskStatuss','taskLists','tasks','toaster','slidebox',function($scope,$stateParams,platforms,taskStatuss,taskLists,tasks,toaster,slidebox){
	$scope.statusId = 1;
	$scope.platformId = 1;
	$scope.statusName = "";
	$scope.taskList = [];
	$scope.condition = { platformId : -1,shopId : -1,taskTypeId : -1,terminalId : -1 };
	$scope.$watch('$viewContentLoaded',function(){
		$scope.statusId = $stateParams.status;
		var statuss = taskStatuss.getAll();
		angular.forEach(statuss,function(value){
			if(value.id == $scope.statusId){
				$scope.statusName = value.name;
			}
		});
		filterTasksByCondition($scope.condition,1,4);
		queryCount();
	});
	//查询已完成的任务
	var filterTasksByCondition = function(condition,currentPage,pageSize){		
		taskLists.filter($scope.statusId,condition,currentPage,pageSize).then(function(result){
			$scope.taskList = result;
		});
	};
	$scope.$on('filterTaskLoaded',function(event,data){
		$scope.condition = data;
		filterTasksByCondition(data,1,4);
	});
	var queryCount = function(){
		var condition = "{\"status\":" + $scope.statusId + "}";
	    taskLists.queryCount(condition).then(function(result){
	      $scope.$broadcast('resultsLoaded', result);
	    });
	};
	$scope.$on('pageChanged',function(event,data){
	    filterTasksByCondition($scope.condition,data.currentPage,data.pageSize);
	});
	$scope.publishTask = function(taskId){
		tasks.get(taskId).then(function(result){
			tasks.pubishTask(result).then(function(result){
				//TODO: 发布任务的返回值格式需要修改, 而且，在发布的时候应该也把任务的状态给改了
				toaster.pop('success', '一键发布', '任务发布成功！');
				filterTasksByCondition($scope.condition,1,4);
			});
		});		
	};
	$scope.viewDetail = function (taskId) {
		slidebox.pop('tpl/slide/task_details.html',{"taskId":taskId});
    };    
}]);
//查看任务详细 Ctrl
app.controller('TaskDetailCtrl',['$scope', 'tasks','slidebox',function($scope, tasks, slidebox){
	$scope.taskDetail = {};	
	$scope.load = function() {
		$scope.taskId = slidebox.config.data.taskId
		tasks.get($scope.taskId).then(function(result){
			$scope.taskDetail = result;
		});
	};
}]);
//查询任务
app.controller('TaskListCtrl',['$scope','$stateParams','taskStatuss','tasks',function($scope,$stateParams,taskStatuss,tasks){
	$scope.statusId = 1;
	$scope.platformId = 1;
	$scope.statusName = "";
	$scope.taskList = [];
	$scope.taskStats = { all : 8, doing : 2, finish : 6 };
	$scope.condition = { platformId : -1,shopId : -1,taskTypeId : -1,terminalId : -1 };
	$scope.$watch('$viewContentLoaded',function(){
		//TODO:统计不同状态下任务的数量
		$scope.taskStats = { all : 8, doing : 2, finish : 6 };	
	});
	$scope.initTaskByStatus = function(){
		$scope.statusId = $stateParams.status;
		var statuss = taskStatuss.getAll();
		angular.forEach(statuss,function(value){
			if(value.id == $scope.statusId){
				$scope.statusName = value.name;
			}
		});
		filterTasksByCondition($scope.condition,1,4);
		queryCount();
	};
	$scope.initTaskByPlatform = function(){
		$scope.platformId = $stateParams.platformId;
		queryTasksByPlatform($scope.platformId);
		queryCount();
	};
	//查询平台下所有任务
	var queryTasksByPlatform = function(platformId){
		tasks.queryByPlatform(platformId).then(function(result){
			$scope.taskList = result;
		});		
	};
	//根据状态查询任务
	var queryTasksByStatusId = function(statusId){
		tasks.queryByStatus(statusId).then(function(result){
			$scope.taskList = result;
		});
	};
	//TODO:查询已完成的任务
	var filterTasksByCondition = function(condition,currentPage,pageSize){		
		tasks.filter($scope.statusId,condition,currentPage,pageSize).then(function(result){
			$scope.taskList = result;
		});
	};
	$scope.getShopName = function(json){
		return angular.fromJson(json).shopName;
	};
	$scope.getTaskTotalCach = function(json){
		return angular.fromJson(json).totalCash;
	};
	$scope.getTaskTotalPoint = function(json){
		return angular.fromJson(json).totalPoint;
	};
	$scope.$on('filterTaskLoaded',function(event,data){
		$scope.condition = data;
		filterTasksByCondition(data,1,4);
		queryCount();
	});
	var queryCount = function(){
		var condition = "{\"status\":" + $scope.statusId + "}";
	    tasks.queryCount(condition).then(function(result){
	      $scope.$broadcast('resultsLoaded', result);
	    });
	};
	$scope.$on('pageChanged',function(event,data){
	    filterTasksByCondition($scope.condition,data.currentPage,data.pageSize);
	});
}]);
/*Buyer task list*/
app.controller('BuyerTaskListCtrl',['$scope','$stateParams','platforms','taskBuyers','subTaskStatuss','toaster','slidebox',
	function($scope,$stateParams,platforms,taskBuyers,subTaskStatuss,toaster,slidebox){
	$scope.taskList = [];
	$scope.platforms = [];
	$scope.condition = { platformId : -1, statusId : -1 };
	$scope.statusNames = [];
	$scope.platformNames = [];
	$scope.$watch('$viewContentLoaded',function(){
		$scope.platforms = platforms.getAll();
		angular.forEach($scope.platforms,function(value){
			$scope.platformNames[value.id] = value.name;
		});
		$scope.subStatus = subTaskStatuss.getAll();
		angular.forEach($scope.subStatus,function(value){
			$scope.statusNames[value.id] = value.name;
		});
		if($stateParams.status && $stateParams.status != -1){
			$scope.condition.statusId = $stateParams.status;
		}
		filterTaskBuyerByCondition(1,4);
		queryCount();
	});
	//查询已完成的任务
	var filterTaskBuyerByCondition = function(currentPage,pageSize){		
		taskBuyers.query($scope.condition,currentPage,pageSize).then(function(result){
			$scope.taskList = result;
		});
	};
	$scope.queryTaskBuyer = function(){
		filterTaskBuyerByCondition(1,4);
		queryCount();
	};
	var queryCount = function(){
		var condition = "";
		if($scope.condition.platformId != -1
			&& $scope.condition.statusId == -1){
			condition = "{\"platformId\":" + $scope.condition.platformId + "}";
		}
		if($scope.condition.platformId == -1
			&& $scope.condition.statusId != -1){
			condition = "{\"buyerStatusId\":" + $scope.condition.statusId + "}";
		}
		if($scope.condition.platformId != -1 
			&& $scope.condition.statusId != -1){
			condition = "{\"platformId\":" + $scope.condition.platformId + ",\"buyerStatusId\":" + $scope.condition.statusId + "}";
		}
	    taskBuyers.queryCount(condition).then(function(result){
	      $scope.$broadcast('resultsLoaded', result);
	    });
	};
	$scope.$on('pageChanged',function(event,data){
	    filterTaskBuyerByCondition(data.currentPage,data.pageSize);
	});
	$scope.processTaskStatus = function(taskBuyerId,statusId){
		taskBuyers.updateStatus(taskBuyerId,statusId).then(function(result){
			angular.forEach($scope.taskList,function(value){
				if(value.taskBuyerId == taskBuyerId){
					value.statusId = statusId;
				}
			});
		});
	};
	$scope.viewDetail = function (taskId) {
		slidebox.pop('tpl/slide/task_details.html',{"taskId":taskId});
    };
}]);
//筛选控制器
app.controller('TaskFilterCtrl',['$scope','$stateParams','platforms','sellerShops','taskTypes','terminals',function($scope,$stateParams,platforms,sellerShops,taskTypes,terminals){
	var userId = app.userSession.userId;
	$scope.platforms = [];
	$scope.shops = [];
	$scope.taskTypes = [];
	$scope.terminals = [];
	$scope.condition = {
		platformId : -1,
		shopId : -1,
		taskTypeId : -1,
		terminalId : -1
	};
	$scope.$watch('$viewContentLoaded',function(){
		//初始化平台下拉列表
		$scope.platforms = platforms.getAll();
		//初始化店铺
		if(angular.isUndefined($stateParams.platformId)){
			initSellerShopList();
		}else{
			initSellerShopListByPlatformId($stateParams.platformId);
		}		
		//初始化任务类型
		$scope.taskTypes = taskTypes.getAll();	
		//初始化终端
		$scope.terminals = terminals.getAll();
	});
	$scope.query = function(){
		//传递事件触发查询任务
		$scope.$emit('filterTaskLoaded', $scope.condition);
	};
	var initSellerShopList = function(){
	    sellerShops.getAllShops(userId).then(function(result){
	      $scope.shops = result;
	    });
	};
	var initSellerShopListByPlatformId = function(platformId){
		sellerShops.query(userId,platformId).then(function(result){
	      $scope.shops = result;
	    });
	};
}]);
//分页 controller
app.controller('TaskPaginationCtrl',['$scope', function($scope){
    $scope.pageSize = 4;
    $scope.maxSize = 10;
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function(pageNo) {
      $scope.$emit('pageChanged', {"currentPage" : pageNo, "pageSize" : $scope.pageSize});
    };
    $scope.$on('resultsLoaded',function(event,data){        
        $scope.totalItems = parseInt(data.count);
    });
}]);