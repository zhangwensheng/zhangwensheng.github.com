var myscroll1 = new IScroll("#rule_wrapper", {click: true});
var myscroll2 = new IScroll("#phb_wrapper", {click: true});
var myscroll3 = new IScroll("#rule_wrapper_1", {click: true});
var myScrollRpi = new IScroll("#id_wrapper_rpi_2", {click: true});

setTimeout(
	function(){
		myscroll1.refresh();
		myscroll2.refresh();
		myscroll3.refresh();
		myScrollRpi.refresh();
	},300);
// var TOOL;
// (function(){
// 	var _this;
//     var tool = function(){
//         _this = this;
//     };
// 	/**
//     *显示某个弹窗
//     *@dom string dom节点
//     *@aniClass string 动画类
//     *@callFun function 回调
//     */
//     tool.prototype.showDialog = function(dom, aniClass, callFUn){
//         $(dom).removeClass('hide');
//         $(dom).addClass('animated ' + aniClass);
//         _this.endAni(dom, callFUn)
//     };
//     /**
//     *动画结束时事件
//     *@dom string dom节点
//     *@callFun function 回调
//     */
//     tool.prototype.endAni = function(dom, callFUn){
//         var middleDom = $(dom)[0];
//         middleDom.addEventListener("webkitAnimationEnd", function(){
//             if(typeof(callFUn) === 'function'){
//                 callFUn();
//             }
//         }, false); 
//     };

//     TOOL = new tool();
// })();

//活动详情
$('.info_btn').off().on('touchstart', function(){
	$('.logo_img').css({'zIndex' : 10});
	$('.rulePage .ruleContent').css({'top' : '273px'});
	myscroll1.refresh();
	$('.rulePage').css({'visibility' : 'visible'});
});
$('.rule_close_btn').off().on('touchstart', function(){
	$('.logo_img').css({'zIndex' : 0});
	$('.rulePage').css({'visibility' : 'hidden'});
	$('.rulePage .ruleContent').css({'top' : '-1000px'});
});
//活动显示三重好礼
$('.rule-page-info-2 .rule-page-info-2-btn-close').off().on('touchstart',pageActivityInfoHide2);

function pageActivityInfoShow2(){
	$('.logo_img').css({'zIndex' : 10});
	$('.rule-page-info-2 .ruleContent').css({'top' : '273px'});
	myScrollRpi.refresh();
	$('.rule-page-info-2').css({'visibility' : 'visible'});
};
function pageActivityInfoHide2(){
	$('.logo_img').css({'zIndex' : 0});
	$('.rule-page-info-2').css({'visibility' : 'hidden'});
	$('.rule-page-info-2 .ruleContent').css({'top' : '-704px'});
};
//挑战榜规则
$('.rule_btn').off().on('touchstart', function(){
	$('.phbContent').css({'visibility' : 'hidden'});
	$('.rulePage_1').css({'visibility' : 'visible'});
	$('.ruleContent_1').css({'top' : '115px'});
	myscroll3.refresh();
});
$('.rule_close_btn_1').off().on('touchstart', function(){
	$('.phbContent').css({'visibility' : 'visible'});
	$('.rulePage_1').css({'visibility' : 'hidden'});
	$('.ruleContent_1').css({'top' : '-1000px'});
});