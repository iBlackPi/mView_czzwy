/**
 * 混合方法
 * since 2018/1/18
 * author cfw2157
 */
//这里使用
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
        //todo 触发父组件事件，并传值
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
        //todo 触发子组件并传值
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }

};