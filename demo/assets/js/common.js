/* !
 *  Dicos公用类
 *  author: lingweifeng
 *  date: 2016-06-03 
 */

// Dicos公用类
var Dicos = {

	// 屏幕适配
	_resize: function(){
		var wW = $(window).width();
		//if( wW < 640 )
		$('html').css( 'fontSize', 20*wW/375 );
	},
	// show mask
	showMask: function(){
		if( $('.mask').length == 0 ) $( 'body' ).append( '<div class="mask" data-pop-hidepop></div>' ).addClass( 'overflow-hidden' );
		$('.mask').show();
		$( '.mask' )[0].addEventListener( 'touchmove', function (e) {
	        e.preventDefault();
	    }, false);
	},
	// hide mask
	hideMask: function(){
		if( $('.mask').length > 0 ){
			$('.mask').hide();
			$( 'body' ).removeClass( 'overflow-hidden' );
		}
	},
	Msg: function( txt, time, fn ){
	    var callback = ( $.isFunction(fn) && fn ) ? fn : $.noop;
		if( $( '#Msg' ).length == 0 ){
			$( 'body' ).append( '<div id="Msg" class="msg"><span class="mask"></span><span class="content"></span></div>' );
		}
		var $alert = $( '#Msg' );
		$alert.find( '.content' ).text( txt );
		$alert.show().find( '.mask' ).show();
		$alert.show().addClass( 'bounceIn animated' );
		var time = time || 1000;
		// 动画
		setTimeout( function(){
			$alert.hide();
	        callback.call( this );
		}, time );
	},
	// pop
	showModal: function( $obj, fn ){
		var callback = ( $.isFunction(fn) && fn ) ? fn : $.noop;
		var scrollTop = $(window).scrollTop();
		var wH = $(window).height();
		this.showMask();
		$obj.css( 'top', wH/2 + scrollTop ).show();
		// 弹窗禁止滚动
		$obj[0].addEventListener( 'touchmove', function (e) {
	        e.preventDefault();
	    }, false);
	    /*$( '.mask' )[0].addEventListener( 'touchmove', function (e) {
	        e.preventDefault();
	    }, false);*/
		callback.call( this );
	},
	// pop
	hideModal: function( fn ){
		var callback = ( $.isFunction(fn) && fn ) ? fn : $.noop;
		$('.modal').hide();
		Dicos.hideMask();
		callback.call( this );
	},	
	// 初始化
	init: function(){
		
		var self = this;

		// 屏幕自适应
		self._resize();
		
		// choice
		$(document).on( 'click', '[data-choice-from]', function(){

			var $val = $(this).find( '[data-choice-value]' ),
				$to = $( $(this).attr( 'data-choice-to' ) ),
				val = $val.text() || $val.val();

			$to.val( val );

		});

		// 菜单
		var $top = $( '#top' ),
			$menuMark = $top.find( '.menu-drop-mark' ),
			$menuDrop = $top.find( '.menu-drop' );
		$top.on( 'click', '.menubtn', function(){
			if( $top.hasClass( 'on' ) ){
				$menuMark.hide();
				$menuDrop.hide();
				$top.removeClass( 'on' );
				self.hideMask();
			}else{
				$menuMark.show();
				$menuDrop.show();
				$top.addClass( 'on' );
				self.showMask();
			};
			return false;
		});

		$(document).on( 'click', '[data-pop-hidepop]', function(){
			$menuMark.hide();
			$menuDrop.hide();
			$top.removeClass( 'on' );
			self.hideMask();
			return false;
		});
		
	}

};

$(function(){
	//初始化
	Dicos.init();
});
