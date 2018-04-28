let util = {};

/**
 * [判断一个字符串是否为空]
 * @str  {[String]} [字符串]
 * @return {[Boolean]}       [为空则返回true]
 */
util.isStrEmpty = function(str) {
    if (!Object.prototype.toString.call('') === '[object String]') {
        throw new Error('请输入一个字符串');
    } else {
        return !str || str === '';
    }
};

//设置页面的title
util.title = function(title) {
    if (this.isStrEmpty(title)) {
        throw new Error('参数不能为空');
    } else {
        window.document.title = title;
    }
};

/**
 * [将数组形式的菜单数据转化为树形式的菜单数据]
 * @param  {[Array]} menuArr   [数组格式的树形菜单数据]  required
 * @param  {[String]} orderBy   [排序规则]               required
 * @param  {[Function]} transform [数据转换函数]
 * @return {[Array]}           [树形菜单数据]
 */
export const buildTree = function(menuArr, orderBy, transform) {
    if(!menuArr || !orderBy) {
        throw new Error('menuArr or orderBy is required...');
    }

    let temp = {},
        menuData = [];
    //将数组转化为对象形式
    for (let i in menuArr) {
        temp[menuArr[i].id] = menuArr[i];
    }
    for (let i in temp) {
        //有parentId
        if (temp[i].parentId) {
            //根菜单
            if (!temp[temp[i].parentId]) {
                //将根菜单添加到数组中
                _insertArrByOrder(menuData, temp[i], orderBy);
                continue;
            }

            //没有children时,创建空数组
            if (!temp[temp[i].parentId].children) {
                temp[temp[i].parentId].children = [];
            }

            //添加子菜单
            _insertArrByOrder(temp[temp[i].parentId].children, temp[i], orderBy);
        }
    }
    typeof transform === 'function' && _transformArr(menuData, transform);
    return menuData;
};
//数组中有序的插入一个数据
const _insertArrByOrder = function(arr, item, orderBy) {
    arr.push(item);
    arr.sort((a, b) => {
        return a[orderBy] - b[orderBy];
    });
}

/*递归遍历数组,将数组中的数据按一定要求剔除*/
const _transformArr = function(arr, transform) {
    for(let i = 0, len = arr.length; i < len; ++i) {
        //如果有子数据,递归调用
        if(arr[i].children) {
            _transformArr(arr[i].children, transform);
        }
        //将当前的数据按要求剔除,该数据中如果有children则必须添加到转换的数据中
        arr[i] = Object.assign(
            arr[i].children ? {
                children: arr[i].children
            } : {}, transform(arr[i])
        );
    }
}

/*将时间戳格式的时间格式化*/
export const formatDate = (time, split = '-') => {
    let date = new Date(time);
    let year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate();
    month = month < 10 ? ('0' + month) : month;
    day = day < 10 ? ('0' + day) : day;
    return year + split + month + split + day;
};

export default util;