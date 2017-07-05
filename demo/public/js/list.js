/* !
 *  菜单列表
 *  author: lingweifeng
 *  date: 2016-03-24 
 */

// 菜单列表
var List = {

	$shopping: $( '#shopping' ), // 购物菜单
	$shoppingCar: $( '#shoppingCar' ), // 购物车

	/** 
	 * 实时结算清单
	 * @param num 数量(+1,-1...)
	 * @param price 价格
	 */
	calculation: function( num, price ){

		var self = this;

		var $num = self.$shoppingCar.find( '.shoppingcar sub' ),
			$price = self.$shoppingCar.find( '.car-main>span>b' );

		var newNum = parseInt( $num.text() ) + num,
			newPrice = parseInt( $price.text() ) + price;

		$num.text( newNum );
		$price.text( newPrice );

	},
	/** 
	 * 滚动tab
	 */
	stab: function(){

		var $stabMain = $( '.stab-main' ),
			$stabItem = $( '.stab-item' ),
			$stabList = $( '.stab-list' ),
			topHeight = $stabMain.offset().top,
			scrollTops = [];

		$stabItem.each(function( index, item ){
			scrollTops.push( $(item).offset().top - topHeight );
		});

		// 点击滚动定位
		$(document).on( 'click', '.stab-list>li>a', function(e){

			var $li = $(this).parent( 'li' ),
				index = $li.index(),
				oScrollTop = $stabMain.scrollTop();

			$li.addClass( 'active' ).siblings().removeClass( 'active' );

			$stabMain.scrollTop( $stabItem.eq(index).offset().top + oScrollTop - topHeight );

			return false;
		});

		// 滚动标记当前tab
		$stabMain.on( 'scroll', function(e){

			var $self = $(this);

			$.each( scrollTops, function( index, scrollTop ){
				if( $self.scrollTop() >= scrollTop ){
					$stabList.find( 'li' ).eq(index+1).addClass( 'active' ).siblings().removeClass( 'active' );
					return;
				}
			});

			if( $(this).scrollTop() == 0 ) $stabList.find( 'li' ).eq(0).addClass( 'active' ).siblings().removeClass( 'active' );

			return false;
		});

	},
	init: function(){

		var self = this;

		// stab
		self.stab();

		// 添加
		self.$shopping.on( 'click', '.add-round-fill', function( e ){

			var $parent = $(this).parent( 'em' ),
				$b = $(this).siblings( 'b' ),
				num = parseInt( $b.text() ),
				price = parseInt( $(this).closest( 'a' ).find( '.money-thin' ).text() );

			// 最大值
			if( num === 99 ){ alert('最多可添加99件'); return; }

			$b.text( ++num );
			self.calculation( 1, price );
			if( !$parent.hasClass( 'active' ) ) $parent.addClass( 'active' );

			e.preventDefault();

		});

		// 删除
		self.$shopping.on( 'click', '.minus', function( e ){

			var $parent = $(this).parent( 'em' ),
				$b = $(this).siblings( 'b' ),
				num = parseInt( $b.text() ),
				price = parseInt( $(this).closest( 'a' ).find( '.money-thin' ).text() );

			// 最大值
			if( num === 0 ){ alert('请先添加'); return; }

			$b.text( --num );
			self.calculation( -1, -price );

			// 缩起来
			if( num === 0 ){ $parent.removeClass( 'active' ) };

			e.preventDefault();

		});
		
	}

};

$(function(){
	//初始化
	List.init();
});
