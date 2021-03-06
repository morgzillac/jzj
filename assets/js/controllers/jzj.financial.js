
'use strict';

/*
** 资金管理页面相关的Controller
*/
//交易历史 controller
app.controller('TransHistoryCtrl',['$scope','transactions',function($scope,transactions){
  var userId = app.userSession.userId;
  $scope.transList = [];
  $scope.$watch('$viewContentLoaded',function(){  
    loadTransHistory(1,15);
    queryCount();
  });
  $scope.downloadCSV = function(){
    transactions.downloadCSV(userId);
  };
  $scope.$on('pageChanged',function(event,data){
      loadTransHistory(data.currentPage,data.pageSize);
  });
  var loadTransHistory = function(currentPage,pageSize){    
    transactions.get(currentPage,pageSize).then(function(result){
      $scope.transList = result;
      //$scope.$broadcast('resultsLoaded', result);
    });
  };
  var queryCount = function(){
    transactions.queryCount().then(function(result){
      $scope.$broadcast('resultsLoaded', result);
    });
  };
}]);
//变现历史 controller
app.controller('Points2cashHistoryCtrl',['$scope','points2cashs',function($scope,points2cashs){
  var userId = app.userSession.userId;
  $scope.points2cashList = [];
  $scope.$watch('$viewContentLoaded',function(){  
    loadPoints2cashHistory(1,15);
    queryCount();
  });
  $scope.$on('pageChanged',function(event,data){
      loadPoints2cashHistory(data.currentPage,data.pageSize);
  });
  var loadPoints2cashHistory = function(currentPage,pageSize){    
    points2cashs.get(currentPage,pageSize).then(function(result){
      $scope.points2cashList = result;
    });
  };
  var queryCount = function(){
    points2cashs.queryCount().then(function(result){
      $scope.$broadcast('resultsLoaded', result);
    });
  };
}]);
//充值历史 controller
app.controller('RechargeHistoryCtrl',['$scope','recharges',function($scope,recharges){
  var userId = app.userSession.userId;
  $scope.rechargeList = [];
  $scope.$watch('$viewContentLoaded',function(){  
    loadRechargeHistory(1,15);
    queryCount();
  });
  $scope.$on('pageChanged',function(event,data){
      loadRechargeHistory(data.currentPage,data.pageSize);
  });
  var loadRechargeHistory = function(currentPage,pageSize){    
    recharges.get(currentPage,pageSize).then(function(result){
      $scope.rechargeList = result;
    });
  };
  var queryCount = function(){
    recharges.queryCount().then(function(result){
      $scope.$broadcast('resultsLoaded', result);
    });
  };
}]);
//提现现金记录
app.controller('CashoutHistoryCtrl',['$scope','cashouts',function($scope,cashouts){
  var userId = app.userSession.userId;
  $scope.cashoutList = [];
  $scope.$watch('$viewContentLoaded',function(){  
    loadCashoutHistory(1,15);
    queryCount();
  });
  $scope.$on('pageChanged',function(event,data){
      loadCashoutHistory(data.currentPage,data.pageSize);
  });
  var loadCashoutHistory = function(currentPage,pageSize){    
    cashouts.get(currentPage,pageSize).then(function(result){
      $scope.cashoutList = result;
    });
  };
  var queryCount = function(){
    cashouts.queryCount().then(function(result){
      $scope.$broadcast('resultsLoaded', result);
    });
  };
}]);
//充值 controller
app.controller('RechargeCtrl',['$scope','recharges','bankTypes','toaster','userBanks','$stateParams','$modal','pointsPackages','$window',function($scope,recharges,bankTypes,toaster,userBanks,$stateParams,$modal,pointsPackages,$window){

  $scope.token = '';
  $scope.transType = 3;

  $scope.packages = {};
  $scope.depositAmount = 0;
  $scope.points = 0;
  $scope.amount = 0;
  $scope.isSelectPackage = false;
  $scope.selectedPackage = {};
  $scope.selectPackage = function(packageId){
    angular.forEach($scope.packages,function(item){
      if(item.id == packageId){
        $scope.selectedPackage = item;
        $scope.points = item.points;
        $scope.amount = item.amount;
        $scope.isSelectPackage = true;
      }
    });
  };

  $scope.$watch('$viewContentLoaded',function(){  
    if($stateParams.transType){
      $scope.transType = $stateParams.transType;  
    }
    $scope.token = $window.localStorage.getItem("token");
    $scope.packages = pointsPackages.getAll();

  });

  $scope.openConfirmModal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/modal/recharge_confirm.html',
        controller: 'RechargConfirmCtrl',
        resolve: {
          data: function () {
            return { "title": ""};
          }
        }
      });
  };


}]);
//确定充值成功对话框
app.controller('RechargConfirmCtrl',['$scope','$modalInstance','data',function($scope,$modalInstance,data){
  $scope.close = function () {
      $modalInstance.dismiss('cancel');
    };
}]);
//提现现金 controller
app.controller('CashoutCtrl',['$scope','cashouts','points2cashs','userBanks','bankTypes','balances','toaster',function($scope,cashouts,points2cashs,userBanks,bankTypes,balances,toaster){
	var userId = app.userSession.userId;
  $scope.cashout = {}; 
  $scope.points2cash = {}; 
  $scope.isBindUserBank = false; 
  $scope.bankTypeList = [];
  $scope.userBankList = [];
  $scope.userBankId = -1;
  $scope.payPassword = "";
  $scope.totalCashs = 0;
  $scope.totalPoints = 0;
  $scope.transPoints = 0;
  $scope.transCashs = 0;
  $scope.isVisibelPoints2cash = false;
  $scope.$watch('$viewContentLoaded',function(){  
    $scope.cashout = cashouts.newEmpty(); 
    $scope.points2cash = points2cashs.newEmpty(); 
    //TODO: 获取所有的用户银行类型    
    $scope.bankTypeList = bankTypes.getAll();
    //TODO: 获取提现账号绑定信息
    userBanks.query(userId).then(function(result){
      $scope.userBankList = result;
      if($scope.userBankList.length > 0){
        $scope.isBindUserBank = true; 
      }
    });
    getBalance();
  });
  var getBalance = function(){
    //TODO: 获取可提现金额
    balances.get().then(function(result){
      $scope.totalCashs = result.cash;
      $scope.totalPoints = result.points;
    });    
  };
  $scope.getBankName = function(bankType){
    var bankName = "";
    angular.forEach($scope.bankTypeList,function(value){
      if(value.id == bankType){
        bankName = value.name;
      }
    });
    return bankName;
  };
  $scope.showPoints2cash = function(){
    $scope.isVisibelPoints2cash = true;
  };
  $scope.countPoints2cashFee = function(){
    if($scope.transPoints.length<3){
      $scope.points2cash.fee = 0;
      $scope.points2cash.amount = 0;       
    }else{
      $scope.points2cash.points = parseInt($scope.transPoints);
      $scope.points2cash.fee = parseInt($scope.points2cash.points) * 0.05;
      $scope.points2cash.amount = parseInt($scope.points2cash.points) * (1 - 0.05);  
    }    
  };  
  $scope.submitPoints2cash = function(isValid){
    if (!isValid) {
      toaster.pop('error','错误','表单填写不正确' );
      return;
    }
    //验证最大转换点数
    if($scope.points2cash.points > $scope.totalPoints){
      toaster.pop('error','错误','最大变现赚点数为' + $scope.totalPoints);
      return;
    }
    $scope.points2cash.userId = userId;
    $scope.points2cash.type = 5; //变现
    points2cashs.add($scope.points2cash).then(function(result){
      getBalance();
      $scope.isVisibelPoints2cash = false;
      toaster.pop('success', '申请变现', result);
    },function(reason){
      toaster.pop('error', '申请变现', reason);
    });
  };
  $scope.cancelPoints2cash = function(){
    $scope.isVisibelPoints2cash = false;
  };
  $scope.countCashoutFee = function(){
    if($scope.transCashs.length<3){
      $scope.cashout.fee = 0;
      $scope.cashout.amount = 0;
    }else{
      $scope.cashout.points = $scope.transCashs;
      $scope.cashout.fee = parseInt($scope.cashout.points) * 0.003;
      $scope.cashout.amount = parseInt($scope.cashout.points) * (1 - 0.05);
    }    
  };
  $scope.submitCashout = function(isValid){
    if($scope.payPassword == ''){
      toaster.pop('error', '申请提现', '请填写支付密码');
      return;
    }
    if (!isValid) {
      toaster.pop('error','错误','表单填写不正确' );
      return;
    }
    if (!$scope.userBankId || $scope.userBankId<0) {
      toaster.pop('error','错误','请先选择提现账号。如果未绑定，请先绑定提现账号。' );
      return;
    }
    //验证最大提现额
    if($scope.cashout.points > $scope.totalCashs){
      toaster.pop('error','错误','最大提现额为' + $scope.totalCashs);
      return;
    }
    balances.checkPayPassword($scope.payPassword).then(function(result){
      if(angular.isObject(result) && result.result == true){
        $scope.cashout.userId = userId;
        $scope.cashout.userBankId = $scope.userBankId;
        $scope.cashout.type = 1; //提现
        cashouts.add($scope.cashout).then(function(result){
          getBalance();
          toaster.pop('success', '申请提现', result);
        },function(reason){
          toaster.pop('error', '申请提现', reason);
        });
      }else{
        toaster.pop('error', '申请提现', '支付密码不正确');
      }
    });    
  };
}]);
//分页 controller
app.controller('PaginationCtrl',['$scope', function($scope){
    $scope.pageSize = 15;
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