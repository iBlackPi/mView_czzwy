import PieChart from './store/pie';
import RectCoordinate from './store/scatter-bar-line';
import Map from './store/map';
import GaugeChart from './store/gauge';
import RadarChart from './store/radar';
import Echarts from 'echarts';

const echart = {
    /*'ve-test': Map.test,*/
    've-pie': PieChart,
    've-sub-pie': PieChart.subPie,
    've-gauge': GaugeChart,
    've-sub-gauge': GaugeChart.subGauge,
    've-rect-coordinate': RectCoordinate,
    've-line': RectCoordinate.line,
    've-bar': RectCoordinate.bar,
    've-scatter': RectCoordinate.scatter,
    've-map': Map,
    've-svgMap': Map.svgMap,
    've-radar': RadarChart,
    've-sub-radar': RadarChart.subRadar
};

const install = function(Vue, opts = {}){
    Vue.prototype.$echarts = Echarts;
    Object.keys(echart).forEach(key => {
        Vue.component(key, echart[key]);
    });
};

const API = {
    install
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default API;