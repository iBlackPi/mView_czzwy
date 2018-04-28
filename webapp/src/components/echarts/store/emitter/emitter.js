/**
 * 混合方法
 * since 2018/1/18
 * author cfw2157
 */
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                /*上一层不是要找的组件，就再向上找*/
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
        /**
         * 开启拖拽功能
         * data: 对传入的数据要求格式为数组，每一项又是数组
         *
         * */
        /*openDrag: function(data,myChart){
            let _this = this,
                symbolSize = 20;
            myChart.setOption({
                graphic: _this.$echarts.util.map(data,function(item,dataIndex){
                    return {
                        type: 'circle',
                        position: myChart.convertToPixel('geo',item),
                        shape: {
                            cx: 0,
                            cy: 0,
                            r:symbolSize / 2
                        },
                        invisible: true,
                        draggable: true,
                        ondrag: _this.$echarts.util.curry(this.onPointDragging, dataIndex,data,myChart),
                        onmousemove: _this.$echarts.util.curry(this.showTooltip, dataIndex,myChart),
                        onmouseout: _this.$echarts.util.curry(this.hideTooltip,myChart),
                        z: 100
                    }
                })
            });

            window.addEventListener('resize', function () {
                myChart.setOption({
                    graphic: _this.$echarts.util.map(data, function (item, dataIndex) {
                        return {
                            position: myChart.convertToPixel('geo', item)
                        };
                    })
                });
            });
        },

        showTooltip: function(dataIndex,chart) {
            chart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: dataIndex
            });
        },

        hideTooltip: function(chart) {
            chart.dispatchAction({
                type: 'hideTip'
            });
        },

        onPointDragging: function(dataIndex,data,chart) {
            data[dataIndex] = chart.convertFromPixel('geo', this.position);
            /!*改变data之后，需要把series重新set一下，把整个series传进来*!/
            chart.setOption({
                series: [{
                    id: 'a',
                    data: data
                }]
            });
        }*/
    }

};