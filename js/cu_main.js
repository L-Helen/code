//动态设置移动端像素比 ，动态插入<meta>配视口
var iScale = 1;
	iScale = iScale / window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=' + iScale + ',minimum-scale=' + iScale + ',maximum-scale=' + iScale + '">');

//2、动态设置html字体大小 便于rem计算
var iWidth = document.documentElement.clientWidth;//获得设备的可视宽度
  //  iHeight=document.documentElement.clientHeight;
    iWidth = iWidth > 1620 ? 1620 : iWidth;//控制可视宽度过大，如太大则等于1620px
	document.getElementsByTagName('html')[0].style.fontSize = iWidth / 16 + 'px';
//	document.body.style.height=iHeight+"px";
//设置页面中的状态跳转开始



var app =angular.module('CU',['ionic']);
app.config(function ($stateProvider,$ionicConfigProvider,$urlRouterProvider) {
	//$stateProvider,$ionicConfigProvider, $urlRouterProvider
	$stateProvider.state('start',{url:'/start',templateUrl:'tpl/start.html'})
				  .state('login',{url:'/login',templateUrl:'tpl/login.html'})
				  .state('info',{
					  url:'/info',
					   templateUrl:'tpl/info.html',
					    controller:'infoCtrl'
				  })
				  .state('apply',{
					  url:'/apply',
					  templateUrl:'tpl/apply.html',controller:'applyCtrl'
				  })
				  .state('footmark',{
					  url:'/footmark',
					  templateUrl:'tpl/footmark.html',
					  controller:'footMctrl'
				  })
				  .state('user',{url:'/user',templateUrl:'tpl/user.html'});
	$urlRouterProvider.otherwise('start')			  
				 
});
//父控制器里设置的是全局的作用域，每个页面都能用到
app.controller("parentCtrl",['$scope','$state','$timeout','$ionicSlideBoxDelegate','$ionicTabsDelegate','$ionicSideMenuDelegate','$ionicBackdrop',
	function($scope,$state,$timeout,$ionicSlideBoxDelegate,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicBackdrop) {
	$scope.jump=function (state) {
		$state.go(state)

	}
	//页面轮播点击效果
	$scope.pageClick=function(index){
		$ionicSlideBoxDelegate.slide(index)
	}
	//选项卡点击高亮
	$scope.selectWith= function(index) {
		$ionicTabsDelegate.select(index);
	}
	//粗暴模拟下拉刷新功能
	$scope.hasData=true;
	$scope.doRefresh=function(){
		$scope.hasData=false;
		$scope.$broadcast('scroll.refreshComplete');
	}
	//粗暴模拟上拉加载功能
	$scope.hasMore=true;
	$scope.loadMore=function(){
		$timeout(function(){
			$scope.hasMore=false;
			$scope.$broadcast('scroll.infiniteScrollComplete');

		},1000);
	}

	$scope.c = function (arg) {
		$ionicSideMenuDelegate.toggleLeft(arg);
	}
		//$ionicBackdrop.release()
		//$scope.action = function() {
		//	$ionicBackdrop.retain();
        //
		//};
	}])
		//.run(function($ionicPlatform) {
		//	$ionicPlatform.ready(function() {
		//		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		//		// for form inputs)
		//		if(window.cordova && window.cordova.plugins.Keyboard) {
		//			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		//		}
		//		if(window.StatusBar) {
		//			StatusBar.styleDefault();
		//		}
		//	});
		//})
		.controller("infoCtrl",['$scope','$ionicBackdrop',function($scope,$ionicBackdrop){
		$ionicBackdrop.release()
		$scope.infolist=[
			{'img':"img/infoList_img.jpg", title:'学校通知',text:"关于学校通知及资讯信息"	},
			{'img':"img/infoList_img.jpg", title:'年级通知',text:"关于学校各年级的相关通告"	},
			{'img':"img/infoList_img.jpg", title:'班校通知',text:"关于各年级的通知消息"	}
		]

}]).controller('applyCtrl',['$scope',function($scope){
	$scope.applylist=[
		[{img:"ion-checkjob.png",title:'查看作业'},
		 {img:"ion-recordjob.png",title:'布置作业'},
		 {img:"ion-lookleave.png",title:'记录作业情况'}
		],
		[{img:"ion-checkscore.png",title:'查看成绩'},
			{img:"ion-xuanke.png",title:'查看选课统计'},
			{img:"ion-lookclassbehavior.png",title:'选课'}
		],
		[{img:"ion-checkperf.png",title:'在校表现'},
			{img:"ion-createorg.png",title:'生成课表'},
			{img:"ion-lookorg.png",title:'查看课表'}
		],
		[{img:"ion-recordclassattendance.png",title:'在校表现'},
			{img:"ion-lookclassattendance.png",title:'生成课表'},
			{img:"ion-recordleave.png",title:'查看课表'}
		],
		[{img:"ion-pubjob.png",title:'在校表现'},
			{img:"ion-pubnotific.png",title:'生成课表'},
			{img:"ion-recordclassbehavior.png",title:'查看课表'}
		],

	]
}]).controller('footMctrl',['$scope',function($scope){
		$scope.hasData=true;
		$scope.doRefresh=function(){
			$scope.hasData=false;
			$scope.$broadcast('scroll.refreshComplete');
		}
}])


