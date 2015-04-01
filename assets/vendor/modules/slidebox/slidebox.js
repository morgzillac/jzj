'use strict';


angular.module('slidebox', ['ngAnimate'])
.service('slidebox', ['$rootScope', function ($rootScope) {
    this.pop = function (url,data) {
        this.config = {
            "url": url,
            "data":data
        };
        $rootScope.$broadcast('slidebox-new');
    };

    this.close = function () {
        $rootScope.$broadcast('slidebox-close');
    };
}])
.directive('slideboxContainer', ['$compile', '$sce', 'slidebox','$animate',
function ($compile, $sce, slidebox,$animate) {
    return {
        replace: true,
        restrict: 'EA',
        scope: true, // creates an internal scope for this directive
        link: function (scope, elm, attrs) {

            scope.config = { 
                visible:false, 
                url: '',
                width: 0,
                height: 0
            };

            scope.$on('slidebox-new', function () {

                elm.animate({height:'0px',width:'0px'},0.1);
                scope.config.visible = true;
                scope.config.url = slidebox.config.url;
                elm.animate({height:document.documentElement.clientHeight + 'px',width:(document.documentElement.clientWidth/2) + 'px'},'fast');
            });
            
            scope.$on('slidebox-close', function () {
                $scope.config.url = '';
                $element.animate({height:'0px',width:'0px'});
            });
        },
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
            $scope.closeSlide = function () {                
                $scope.config.url = '';
                $element.animate({height:'0px',width:'0px'});
            };
        }],
        template:
        '<div id="slide-container" class="right-slide-box bg-light lter" style="width:{{config.width}}px;height{{config.height}}px;">' +
            '<div class="panel panel-default" style="height:100%;">' +
                '<div class="panel-heading">' +
                    '<div><button class="btn btn-jzj btn-sm" ng-click="closeSlide()">关闭</button></div>' +
                '</div>' +
                '<div class="panel-body">' +                    
                    '<div data-ng-include="config.url"></div>' +                
                '</div>' +
            '</div>' +
        '</div>'
    };
}]);
