'use strict';

// forgot pwd controller
app.controller('ForgotpwdController', ['$scope', '$state','users', function($scope, $state, users) {
    $scope.user = {};
    $scope.isCollapsed = true;
    $scope.authError = "";
    $scope.email = "";
    $scope.send = function() {      
      //发送邮件
      users.resetPasswordRequest($scope.email).then(function(result){
        if(angular.uppercase(result) == "OK"){
          $scope.isCollapsed = !$scope.isCollapsed;
        }else{
          $scope.authError = "邮件发送失败！";
        }
      });
    };
}]);

// signin controller
app.controller('SigninFormController', ['$scope', 'users', '$state', '$window','$http', function($scope, users, $state, $window, $http) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      var para = { "login" : $scope.user.email, "password" : $scope.user.password };
      var api = app.global.host + '/user/login';
      $http.post(api, para).success(function(result, status, headers, config) {
          $window.localStorage.setItem("userSession", angular.toJson(result));
          app.userSession = result;
          $window.localStorage.setItem("token", headers('token'));
          //$window.localStorage.setItem("token", 'UZHTO');
          $state.go('app.dashboard-v1');          
      }).error(function(reason, status, headers, config) {
          $scope.authError = reason.message;
      });
    };
  }]);

// signup controller
app.controller('SignupFormController', ['$scope', '$state','users', function($scope, $state, users) {
    $scope.user = {};
    $scope.authError = null;
    $scope.$watch('$viewContentLoaded',function(){  
      $scope.user = users.newEmpty();
      //设置默认用户类型为商家
      $scope.user.userTypeId = 1;
    });
    $scope.signup = function() {
      $scope.authError = null;      
      users.add($scope.user).then(function(result){
        $state.go('access.signin');
      },function(reason){   
        if(angular.isDefined(reason)){
          $scope.authError = reason.message;  
        }        
      });      
    };
    $scope.selectUserType = function(userTypeId){
      $scope.user.userTypeId = userTypeId;
    };

    /*add test account */

    $scope.jzjAccounts = [
      {"loginName":"lnYnUm","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13530717501"},{"loginName":"UYGWZH","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15016844854"},{"loginName":"zAV5Db","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15712069557"},{"loginName":"X8MiG1","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13621497945"},{"loginName":"Rsa0ea","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13421813249"},{"loginName":"5m9yZE","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18219520922"},{"loginName":"ABvvCm","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15113392275"},{"loginName":"iGb2FR","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13662695102"},{"loginName":"ncawO5","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18320916492"},{"loginName":"1vStjQ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18825275451"},{"loginName":"8aeuow","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13528759909"},{"loginName":"qOapR1","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15712156746"},{"loginName":"tJSvah","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13544126439"},{"loginName":"6RXS7D","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13686595126"},{"loginName":"jp6ymp","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13528713796"},{"loginName":"0wrS0g","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13794017454"},{"loginName":"Ml3umi","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18719274551"},{"loginName":"Cu0hOS","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13640938051"},{"loginName":"IjN8eU","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13686541812"},{"loginName":"Hd4f5p","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13530670627"},{"loginName":"8xB7Xq","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17817552215"},{"loginName":"nbuvbM","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15989570735"},{"loginName":"tOX3kL","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15876084841"},{"loginName":"WY1234","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13427008363"},{"loginName":"WR1LpF","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18719273265"},{"loginName":"qhea5N","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13715260909"},{"loginName":"KPqecj","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13530317568"},{"loginName":"qwN7DB","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13430848571"},{"loginName":"bSag8h","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450728247"},{"loginName":"yrXsWo","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13538248904"},{"loginName":"KKxSf7","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18219526945"},{"loginName":"1KAcgz","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15914101686"},{"loginName":"Y0gOML","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18218429789"},{"loginName":"1aFFbY","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18200907361"},{"loginName":"ZtXt13","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15816813760"},{"loginName":"opOSKv","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15813848647"},{"loginName":"jQRTQv","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510899217"},{"loginName":"JlrxF8","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18718931002"},{"loginName":"HMTYiM","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13420333705"},{"loginName":"jraCYO","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13543320372"},{"loginName":"Uwep6f","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15766265367"},{"loginName":"8TyOuv","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18316628644"},{"loginName":"h96L4K","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13724388141"},{"loginName":"wkqFv0","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450782682"},{"loginName":"qhGFc2","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13686473805"},{"loginName":"IfBQfQ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15712165035"},{"loginName":"lcysas","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13425103612"},{"loginName":"Lft34b","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13417586164"},{"loginName":"mpja45","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510170261"},{"loginName":"qZwH1Y","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15118525042"},{"loginName":"cVsejw","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13435717497"},{"loginName":"jDHvJM","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15815547334"},{"loginName":"ieMnYG","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13530597445"},{"loginName":"MgToXk","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15712065494"},{"loginName":"qMLehW","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13538323217"},{"loginName":"vIQItb","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15889661477"},{"loginName":"FEZqbc","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13528715440"},{"loginName":"6vSt5C","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510962007"},{"loginName":"VOwmd8","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18814473180"},{"loginName":"AEPfy0","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13423167423"},{"loginName":"SikRV1","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15814050260"},{"loginName":"BCUIkG","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15728538825"},{"loginName":"X5jxBe","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13528714020"},{"loginName":"0McObL","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13535687991"},{"loginName":"AKAMMf","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13798713014"},{"loginName":"kKWfGK","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13620127769"},{"loginName":"wd4lMo","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15814405447"},{"loginName":"fIk3B1","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13713543056"},{"loginName":"5nFYwC","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13531330458"},{"loginName":"BSy19P","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15917253734"},{"loginName":"lDSLun","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450764859"},{"loginName":"XxYGXo","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15875119265"},{"loginName":"iY2T3u","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450940364"},{"loginName":"Sx03x6","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15013705637"},{"loginName":"2Z3Tob","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13418725722"},{"loginName":"LdYtCs","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13430723105"},{"loginName":"IFTPW8","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13790444378"},{"loginName":"ykHEU1","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18320815254"},{"loginName":"wICGTL","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15820657360"},{"loginName":"06WJpt","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15016787944"},{"loginName":"R6FLEc","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18211494564"},{"loginName":"BP9Ngg","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13544183239"},{"loginName":"vtzyxS","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13714883442"},{"loginName":"QCKufX","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18719443121"},{"loginName":"zRz9yW","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13421831532"},{"loginName":"LY1MjM","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13714947878"},{"loginName":"fbkg9Y","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18344140124"},{"loginName":"Vao3T5","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510874408"},{"loginName":"FAFodW","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13690782320"},{"loginName":"pRckMZ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13686477023"},{"loginName":"yKvzcQ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17875819811"},{"loginName":"FhLYcm","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510895307"},{"loginName":"x0M1Om","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13715689066"},{"loginName":"0Q4xb3","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13724396364"},{"loginName":"zOskoP","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18320952755"},{"loginName":"ujRem1","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13713851378"},{"loginName":"CGNUg7","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18476635328"},{"loginName":"ZD29LR","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450770308"},{"loginName":"SrPrg5","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15889575761"},{"loginName":"9Wnjna","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17875434311"},{"loginName":"OhRcFT","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13714774683"},{"loginName":"olgYW6","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13428755570"},{"loginName":"lX3Ruy","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13620107549"},{"loginName":"0c9zej","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18218416115"},{"loginName":"0HLXUZ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15989540454"},{"loginName":"J9vXkk","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13531839274"},{"loginName":"15YeKy","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510175307"},{"loginName":"1gAeMY","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13690249525"},{"loginName":"ZoObsF","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17875816107"},{"loginName":"sD2Cdf","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15814406137"},{"loginName":"cm5RDP","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13715090100"},{"loginName":"mHImQw","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13415492746"},{"loginName":"JXGi9z","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13431649220"},{"loginName":"sD9KSx","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13418780592"},{"loginName":"Zpsjet","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17817399831"},{"loginName":"pXzS5L","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13727323147"},{"loginName":"DQ7Kii","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15820622857"},{"loginName":"AFgFLw","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13530742466"},{"loginName":"3Ibupf","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13714852687"},{"loginName":"ZH58Xq","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13554954457"},{"loginName":"XYisMQ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13642884813"},{"loginName":"J1vedb","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15999618411"},{"loginName":"o0aUN1","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13714169796"},{"loginName":"kfuCvL","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13798224792"},{"loginName":"6yNszu","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15019460119"},{"loginName":"q8Wbvp","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15920720835"},{"loginName":"44aRrk","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13530456053"},{"loginName":"TIfBY2","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13798334865"},{"loginName":"gqJ1O4","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13751077739"},{"loginName":"kC56on","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15012899341"},{"loginName":"Sosaxx","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510683846"},{"loginName":"9T8MuB","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18475527837"},{"loginName":"UmD75k","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15816912737"},{"loginName":"E5mCdi","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13500275741"},{"loginName":"xNg1Kb","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13612856682"},{"loginName":"T4V8C1","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17817398617"},{"loginName":"aYQeVG","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15913467013"},{"loginName":"gb6IMk","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510797269"},{"loginName":"w1UIeg","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450703544"},{"loginName":"OyBveU","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15012953410"},{"loginName":"cu98Up","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13411658437"},{"loginName":"TvR8qz","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15914649807"},{"loginName":"dCV5qj","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15916881460"},{"loginName":"zNiOjh","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15813151232"},{"loginName":"CvGgWi","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450753248"},{"loginName":"csGpje","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15112468981"},{"loginName":"kkIP6G","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15813492344"},{"loginName":"OE8v1d","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13760231672"},{"loginName":"0ykbMY","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15807653057"},{"loginName":"nqalpm","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18200653296"},{"loginName":"6mieSF","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13686653648"},{"loginName":"9Qc8JV","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18719444927"},{"loginName":"Ff5ixZ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15012882007"},{"loginName":"6lc9yV","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13538283429"},{"loginName":"PDC8te","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18826538470"},{"loginName":"u0vPRZ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13544033670"},{"loginName":"08ngdN","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13427002251"},{"loginName":"YiIfNG","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15217372675"},{"loginName":"XvJTFo","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15814020575"},{"loginName":"F4FyeX","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13538228972"},{"loginName":"wI1lIZ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15013705535"},{"loginName":"GmDh4W","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13417391497"},{"loginName":"y23hW4","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17817394836"},{"loginName":"mBN5Sg","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15820617030"},{"loginName":"zHzinP","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13554734020"},{"loginName":"iTSY6J","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13423847914"},{"loginName":"NeOJ7v","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13527965956"},{"loginName":"AgC2gM","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13432061924"},{"loginName":"C8kXqB","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17817551630"},{"loginName":"cit7TE","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15712104535"},{"loginName":"ESruQd","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510894424"},{"loginName":"fCBJmm","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15728560630"},{"loginName":"rHEWAG","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15900093243"},{"loginName":"I68pnk","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13689558752"},{"loginName":"8THCO7","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450750468"},{"loginName":"yoA3dl","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15099917604"},{"loginName":"eTrthi","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15815979616"},{"loginName":"ULPcYE","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17817399280"},{"loginName":"KC1IPS","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13590248727"},{"loginName":"vMbef8","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13590479309"},{"loginName":"CKEXx2","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18320917958"},{"loginName":"9ZkP9m","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18316494223"},{"loginName":"E1BtSU","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13670281471"},{"loginName":"FI61t6","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13417515947"},{"loginName":"ONE6CS","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13686533696"},{"loginName":"YAJOCo","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13538251147"},{"loginName":"HDrN73","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13410323228"},{"loginName":"zF9xtW","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17817391973"},{"loginName":"eZ3Lcn","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450306437"},{"loginName":"iTw0kB","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13530518695"},{"loginName":"OP3FNB","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13642810013"},{"loginName":"uNynRq","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13427014595"},{"loginName":"SUoCjr","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15975228072"},{"loginName":"8DzML0","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15919085985"},{"loginName":"gyBOtB","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15989584316"},{"loginName":"fo3wqP","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13680166249"},{"loginName":"8bfL8w","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18316854965"},{"loginName":"8fEeMf","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15813171754"},{"loginName":"Gp6oSC","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15112708079"},{"loginName":"XC0D9P","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510972995"},{"loginName":"sce4nd","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18719454034"},{"loginName":"YrMica","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13430549874"},{"loginName":"Rl8De0","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13622703253"},{"loginName":"9iY9JE","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13420270244"},{"loginName":"5RcdfJ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18818560242"},{"loginName":"KSElTq","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510780105"},{"loginName":"TuVIp2","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18218547148"},{"loginName":"IKkIMQ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510738757"},{"loginName":"mREfUy","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18318332610"},{"loginName":"Hr0yvW","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13528760105"},{"loginName":"kS5lHj","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15712056576"},{"loginName":"zF0hTX","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13415481969"},{"loginName":"dEdzv1","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13642931059"},{"loginName":"OwqSDX","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18719174891"},{"loginName":"yJfMvs","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15994811264"},{"loginName":"IZPlZC","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510744575"},{"loginName":"ph64La","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13431649469"},{"loginName":"1FmpCM","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13535640935"},{"loginName":"vPlTtT","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13544115476"},{"loginName":"Td5AVV","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18218367387"},{"loginName":"oRLB10","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18318737620"},{"loginName":"2lsMLe","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18718103571"},{"loginName":"l7o9yP","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13538373273"},{"loginName":"YtBlOV","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13682310206"},{"loginName":"eelXR0","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13538499497"},{"loginName":"kTpO31","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13760411485"},{"loginName":"fdTOgh","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13543322307"},{"loginName":"KqOLIG","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17817397498"},{"loginName":"bw1M7S","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15814433356"},{"loginName":"I9gdrG","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510993245"},{"loginName":"tR5HXI","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15816935387"},{"loginName":"ZhpyUs","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13713993445"},{"loginName":"u7mQze","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15728538781"},{"loginName":"eUCKcf","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450787428"},{"loginName":"zDeFfo","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18824667493"},{"loginName":"ffM8xR","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13686061643"},{"loginName":"FNIiMp","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15012668039"},{"loginName":"JEDcZW","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13528235509"},{"loginName":"yosSrI","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15814418921"},{"loginName":"C23nsp","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15989571060"},{"loginName":"5gO922","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15112778367"},{"loginName":"qzmNCn","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18218148596"},{"loginName":"i6EBsL","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18207675550"},{"loginName":"8UgKLe","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510891512"},{"loginName":"4R0Hpm","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450776416"},{"loginName":"Hk8X7W","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15002071539"},{"loginName":"ooocMr","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13543619791"},{"loginName":"PHNtCu","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15012686441"},{"loginName":"wQ8xuu","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13537157529"},{"loginName":"HdqfFS","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13631120754"},{"loginName":"greWgM","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15915428774"},{"loginName":"XFpVKD","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13642884134"},{"loginName":"ofzuak","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15819976467"},{"loginName":"c3KzH3","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15914864794"},{"loginName":"eQshvf","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18898361914"},{"loginName":"7kj0IW","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13631156015"},{"loginName":"qvvqSU","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15218716998"},{"loginName":"GSya4p","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15889371364"},{"loginName":"J4W3NN","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13760410822"},{"loginName":"W4BoGi","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15018532617"},{"loginName":"QqzXrI","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13450773795"},{"loginName":"HLPJVV","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18200839010"},{"loginName":"QfDrPP","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15914877731"},{"loginName":"6kSzqa","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15813140594"},{"loginName":"blP8IY","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13427914442"},{"loginName":"69YMpm","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18825248438"},{"loginName":"4drRqU","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13728643389"},{"loginName":"o7Duyw","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18316536837"},{"loginName":"H2VWIG","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18211300519"},{"loginName":"6MhtjN","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13510245375"},{"loginName":"n46PlY","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13421392347"},{"loginName":"vb7yF2","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15112733179"},{"loginName":"LFYJhi","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18344255519"},{"loginName":"Rfa4Pn","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18719443192"},{"loginName":"FbCAj7","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15019146442"},{"loginName":"N6Nf2S","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13528715616"},{"loginName":"yQnDId","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15920652647"},{"loginName":"ZHEJd2","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15817235683"},{"loginName":"4BYCaR","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13728720094"},{"loginName":"n3k7Y3","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15915316647"},{"loginName":"ehUUWX","email":"jzj@saimonet.com","password":"zouxiu123","phone":"18475440881"},{"loginName":"rc9aQw","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13528793664"},{"loginName":"Xy6ZXp","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15019518051"},{"loginName":"I4yBdl","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13411636018"},{"loginName":"RQlqY7","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17807656645"},{"loginName":"Qz3IrE","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13680161550"},{"loginName":"r58d9H","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13713045962"},{"loginName":"idlDkI","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13530126187"},{"loginName":"wwl4sn","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13537266082"},{"loginName":"uzAp9D","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13621444173"},{"loginName":"94XTBo","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13411692504"},{"loginName":"YhfVh1","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13554933724"},{"loginName":"il6GRd","email":"jzj@saimonet.com","password":"zouxiu123","phone":"17817395846"},{"loginName":"mcnnvh","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15915316376"},{"loginName":"n0ICqV","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15820465749"},{"loginName":"HWTrvd","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15889380947"},{"loginName":"9LlBcZ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15813496747"},{"loginName":"Zgqubo","email":"jzj@saimonet.com","password":"zouxiu123","phone":"13544299839"},{"loginName":"StliYZ","email":"jzj@saimonet.com","password":"zouxiu123","phone":"15217635473"}
    ];



    $scope.forAddUser = function(){

      var index = 0;

      function next(index){
        return $scope.jzjAccounts[index];
      }
      
      function addAccount(index){
        var t_user = users.newEmpty();
        t_user.userTypeId = 2;
        t_user.userLogin = next(index).loginName;
        t_user.password = next(index).password;
        t_user.email = next(index).loginName + '_' + next(index).email;
        t_user.mobile = next(index).phone;

        users.add(t_user).then(function(result){
          if(index<$scope.jzjAccounts.length-1){
            index++;
            addAccount(index);  
          }          
        });  
      }
       
      addAccount(index);

    };

    /*add test account */

  }]);

// reset pwd controller
app.controller('ResetPwdController', ['$scope', '$state','users','$location', function($scope, $state, users,$location) {
    $scope.email = "";
    $scope.password = "";
    $scope.thecode = "";
    $scope.authError = "";    
    $scope.$watch('$viewContentLoaded',function(){
      $scope.thecode = $location.search().code;
    });
    $scope.resetPwd = function() {      
      //发送邮件
      users.resetPassword($scope.email,$scope.password,$scope.thecode).then(function(result){
        if(angular.uppercase(result) == "OK"){
          $state.go('access.signin');
        }else{
          $scope.authError = "密码重置失败！";
        }
      });
    };
}]);