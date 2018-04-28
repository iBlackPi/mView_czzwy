<template>
	<div id="main" style="height: 100%">
		<ve-pie id="pieTest" title="饼图默认样式" >

		</ve-pie>
		<!--<div id="test" style="width: 500px;height: 500px;">
		</div>-->
		<!--<ve-pie id="bbb" title="饼状图" style="height:100%" :data="pieData" :center="center1" :radius="radius1" :rippleAnimation=true>
		&lt;!&ndash;<ve-pie id="bbb" title="饼状图" style="height:100%" :data="pieData" :center="center1" :radius="radius1" :rippleAnimation=true>&ndash;&gt;
		&lt;!&ndash;<ve-pie id="bbb" title="饼状图" :showLegend=true style="height: 50%" @click-series="clickFun1" @mouseover-series="clickFun2">&ndash;&gt;
			<ve-sub-pie :data="pieData" :center="center1" :radius="radius1" roseType="radius" ref="pie-bbb-1" :rippleAnimation=true></ve-sub-pie>
			<ve-sub-pie :data="pieData" :center="center2" :radius="radius2" ref="pie-bbb-2" :rippleAnimation=false></ve-sub-pie>
			<ve-sub-pie :data="pieData1" :center="center3" :radius="radius3" roseType="area" ref="pie-bbb-3" :rippleAnimation=false></ve-sub-pie>
		</ve-pie>-->

		<!--:yAxisData="yArray0"-->
		<!--<ve-rect-coordinate
                @click-series="clickFun1"
                @mouseover-series="clickFun2"
                id="ccc" title="直角坐标系"
				:xAxisData="yArray0"
                :showLegend=true
                rendererType="svg"
                style="height: 50%"
                :dataZoom="dataZoom">-->
            <!--<ve-bar :data="yArray" ref="bar-ccc-1" name="柱状图" barWidth="30%"></ve-bar>-->
		<!--</ve-rect-coordinate>-->
            <!--<ve-bar :data="yArray1" ref="bar-ccc-4" name="柱状图2" barWidth="50%" gradientDirection="bottom-top" :linearGradient="linearArray"></ve-bar>-->
            <!--<ve-line :data="yArray1" ref="line-ccc-2" name="折线图" :smooth=true :symbolSize=15 step="true"></ve-line>
            <ve-scatter :data="yArray1" ref="scatter-ccc-3" name="散点图"></ve-scatter>-->
        <!--</ve-rect-coordinate>-->
        <!--<ve-map id="eee"
						 style="height: 50%"
						 title="地图"
						 placeName="china"
						 :scatterData="mapData2"
						 :lineData="mapData1"
						 scatterColor="green"
						 brushType="stroke"
			>
	</ve-map>
		<ve-map id="eeeee"
				style="height: 50%"
				title="地图"
				placeName="浙江"
				scatterColor="green"
				brushType="stroke"
				>
		</ve-map>-->
		<!--<ve-test style="height: 100%"></ve-test>-->
		<!--<ve-gauge id="fff" style="height: 100%" :data="gaugeData" rendererType="svg">
            <ve-sub-gauge ref="gauge-fff-1" :data="gaugeData1" :center=guageCenter1 :radius=gaugeRadius1 :clockwise=false></ve-sub-gauge>
            <ve-sub-gauge ref="gauge-fff-2" :data="gaugeData2" :center=guageCenter2 :radius=gaugeRadius2></ve-sub-gauge>
            <ve-sub-gauge ref="gauge-fff-3" :data="gaugeData3" :center=guageCenter3 :radius=gaugeRadius3></ve-sub-gauge>
        </ve-gauge>-->
            <!--<ve-radar id="ggg" style="height: 100%" :showLegend=true @mouseover-series="clickFun2" shape="circle">
                <ve-sub-radar ref="radar-ggg-1" :indicator="indicator" :data="radarData" :center="radarCenter1" :startAngle=30 shape="polygon"></ve-sub-radar>
                <ve-sub-radar ref="radar-ggg-2" :indicator="indicator" :data="radarData" :center="radarCenter2" radius="50%" shape="circle"></ve-sub-radar>
            </ve-radar>-->
	</div>
</template>

<script>
	export default {
		data (){
		return {
            linearArray:  [{
                    offset: 0,
                    color: '#FB1E26'
                },
                {
                    offset: 0.5,
                    color: '#D01B22'
                },
                {
                    offset: 1,
                    color: '#9B151A'
                }
            ],
			show: true,
			dataZoom: {x: true,y: true},
			/*迁徙图数据*/
			mapData1: [
				[{name:'广州'},{name:'福州'}],
				[{name:'广州'},{name:'太原'}],
				[{name:'广州'},{name:'长春'}],
				[{name:'广州'},{name:'重庆'}],
				[{name:'广州'},{name:'西安'}],
				[{name:'广州'},{name:'成都'}],
				[{name:'广州'},{name:'常州'}],
				[{name:'广州'},{name:'北京'}],
				[{name:'广州'},{name:'北海'}],
				[{name:'广州'},{name:'海口'}]
			],
			/*涟漪特效动画的散点（气泡）图数据*/
			mapData2: [
				{name:'福州',value:95},
				{name:'太原',value:90},
				{name:'长春',value:80},
				{name:'重庆',value:70},
				{name:'西安',value:60},
				{name:'成都',value:50},
				{name:'常州',value:40},
				{name:'北京',value:30},
				{name:'北海',value:20},
				{name:'海口',value:10}
			],
			radarCenter1: ['45%', '50%'],
			radarCenter2: ['75%', '50%'],
			indicator: [
				{ name: '销售（sales）', max: 6500},
				{ name: '管理（Administration）', max: 16000},
				{ name: '信息技术（Information Techology）', max: 30000},
				{ name: '客服（Customer Support）', max: 38000},
				{ name: '研发（Development）', max: 52000},
				{ name: '市场（Marketing）', max: 25000}
			],
			radarData: [
				{
					value : [4300, 10000, 28000, 35000, 50000, 19000],
					name : '预算分配（Allocated Budget）'
				},
				{
					value : [5000, 14000, 28000, 31000, 42000, 21000],
					name : '实际开销（Actual Spending）'
				}
			],
			gaugeRadius1: '40%',
			gaugeRadius2: '60%',
			gaugeRadius3: '80%',
			guageCenter1: ['10%', '55%'],
			guageCenter2: ['40%', '50%'],
			guageCenter3: ['80%', '50%'],
			gaugeData: [{value: 40, name: 'km/h'}],
			gaugeData3: [{value: 80, name: 'km/h'}],
			gaugeData2: [{value: 10, name: 'km/h'}],
			gaugeData1: [{value: 30, name: 'km/h'},{value: 40, name: 'km/h'}],
			clickFun1: function(params){
				alert('点击chart1');
			},
			clickFun2: function(params){
				alert('点击chart2');
			},
			/*直角坐标系配置*/
			xArray: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			yArray0: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			yArray: [10, 52, 200, 334, 390, 330, 220],
			yArray1: [-10, -52, -200, -334, -390, -330, -220],
			color: ['red','blue'],
			pieOption: {
				series: [
					{
						name:'访问来源',
						type:'pie',
						center:['60%','60%'],
						selectedMode: 'single',
						radius: ['20%', '50%'],
						markPoint: {
							symbol: 'circle',
							symbolSize: 50,

						},
						label: {
							normal: {
								show: true,
								position: 'outside'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: true
							}
						},
						data:[
							{value:335, name:'直达', selected:true},
							{value:679, name:'营销广告'},
							{value:1548, name:'搜索引擎'}
						]
					}

				]
			},
			/*饼状图配置*/
			pieData:
					[   {value:335, name:'aaaa'},
						{value:310, name:'bbbb'},
						{value:274, name:'cccc'},
						{value:235, name:'dddd'},
						{value:400, name:'eeee'}
					],
			pieData1:
					[   {value:324, name:'a'},
						{value:23, name:'b'},
						{value:75, name:'c'},
						{value:4, name:'d'},
						{value:7, name:'d'}
					],
			pieColor: [],//color传入undefined/null/空数组时按照默认颜色
			center1: ['20%','50'],
			center2: ['50%','50%'],
			center3: ['80%','50%'],
			radius1: ['10%','85%'],
			radius2: [0,'25%'],
			radius3: ['30%','55%']
		}
	},
	mounted: function(){
		let _this = this;
		/*let myChart = _this.$echarts.init(document.getElementById('test'),null);
		let option = {
			series: [{
				type: 'liquidFill',
				data: [0.6, 0.5, 0.4, 0.3]
			}]
		};
		myChart.setOption(option);*/
		setInterval(function(){
			let array1 = [],
					array2 = [],
					arr1 = [],
					arr2 = [];
			for(let i=0;i<7;i++){
				let num = Math.floor(Math.random()*100);
				let _num = num + Math.floor((Math.random()*10));
				let _num_ = num - Math.floor((Math.random()*100));
				arr1.push({name: _num+'',value: _num});
				arr2.push({name: num+'',value: num});
				array1.push(num);
				array2.push(_num_);
			}
			_this.pieData = arr1;
			_this.pieData1 = arr2;
			_this.yArray = array1;
			_this.yArray1 = array2;
		},3000);
	},
	directives: {
		addRef: {
			bind: function(el,binding,vnode) {
				let id = vnode.elm.id;
				let chartType = vnode.componentOptions.tag;
				vnode.componentOptions.children.forEach(function(value,key,array){
					if(value.tag != undefined){
						value.data.ref = chartType+id;
					}
				});
			}
		}
	}



	}
</script>
<style lang="less" scoped>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
	#main {
		width:100%;
	}

	#bbb {
		width:100%;
	}

	#ccc {
		width:100%;
	}


</style>