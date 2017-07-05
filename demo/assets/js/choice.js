/* !
 *  选择门店
 *  author: lingweifeng
 *  date: 2016-03-24 
 */

// 选择门店
var Choice = {

	$commandShop: $( '#commandShop' ), // 推荐门店
	$posName: $( '#posName' ),
	renderCommondList: function( shops ){
		var self =  this;

		$.each( shops, function( index, obj ){

			self.$commandShop.append( '<a href="'+ obj.url +'" class="item">'+
	            '<h3><i style="background-color:'+ obj.color +'"></i><b>'+ obj.name +'</b></h3>'+
	            '<p><i class="icon pos"></i>'+ ( index === 0 ? '推荐前往' : '距您' + obj.distance + '公里' ) +'</p>'+
	        '</a>' );

		});

	},
	init: function(){

		// 屏幕自适应
		var self = this;

		// 获取当前地点到各店距离
		var distances = [];

		var Map = new BMap.Map( "Map" );  // 创建Map实例                
      	Map.enableScrollWheelZoom();  //启用滚轮放大缩小，默认禁用
      	Map.enableContinuousZoom();  //启用地图惯性拖拽，默认禁用

      	// 各个店信息集合
      	var shops = [
      		{ name: '德克士（江宁店）', color: '#f66bb1', lng: 121.461792, lat: 31.236026, url: '#' },
      		{ name: '德克士（七宝店）', color: '#5fc0f8', lng: 121.353822, lat: 31.162626, url: '#' },
      		{ name: '德克士（锦绣路店）', color: '#eb711c', lng: 121.547724, lat: 31.186031, url: '#' },
      		{ name: '德克士（南站店）', color: '#5ce8c4', lng: 121.435221, lat: 31.158786, url: '#' }
      	];

      	// 在地图标记各个店
      	$.each( shops, function( index, shop ){

      		// 地理坐标转换成百度坐标
      		var point = new BMap.Point( shop.lng, shop.lat );
      		// 创建圆点
		    var circle = new BMap.Circle( point, 800, { strokeColor: shop.color, fillColor: shop.color, strokeWeight: 1, strokeOpacity: 1, fillOpacity: 1 });
		    // 增加地图标志点
		    Map.addOverlay( circle );

      	});

        Map.centerAndZoom( new BMap.Point( shops[0].lng, shops[0].lat ), 11 );  // 默认地图中心为德克士七宝店

        // 百度地图浏览器定位
        var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition( function( r ){
			if( this.getStatus() == BMAP_STATUS_SUCCESS ){
				var mk = new BMap.Marker( r.point );
				Map.addOverlay( mk );
				mk.setAnimation( BMAP_ANIMATION_BOUNCE );
				Map.panTo( r.point );
				//alert( '您的位置：' + r.point.lng+','+r.point.lat );

				$.each( shops, function( index, shop ){
					// 计算直线距离
					var distance = Map.getDistance( r.point, new BMap.Point( shop.lng, shop.lat ) );
					var fixDistance = (distance/1000).toFixed(2);
					// 放进数组
					distances.push( fixDistance );
					shop.distance = fixDistance;
				});

				// 根据距离对门店数组进行排序
				var sortShops = shops.sort( function( a, b ){ return a.distance - b.distance });
				console.log( sortShops );

				// 渲染列表
				self.renderCommondList( sortShops );

			}
			else {
				alert( 'failed'+this.getStatus() );
			}        
		},{enableHighAccuracy: true});
		
	}

};

$(function(){
	//初始化
	Choice.init();
});
