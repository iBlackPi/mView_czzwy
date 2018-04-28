export function activeFormat(value, trueParam, falseParam) {
    return value ? trueParam : falseParam;
}

export function treePathFormat(obj, id, path = []) {
    for (let i = 0, len = obj.length; i < len; i++) {
        let item = obj[i];
        if (item.id === id) {
            path.push(id);
            return {
                has: true,
                path
            }
        } else if (item.children && item.children) {
            path.push(item.id);
            let result = treePathFormat(item.children, id, path)
            if (result.has) return {has: true, path}
            path.pop()
        }
    }
    return {
        has: false
    }
}

export function treeSelectFormat(obj, id) {
    for (let i = 0; i < obj.length; i++) {
        let item = obj[i];
        if (item.id === id) {
            console.log(id);
            item.selected = true;
            item.expand = true;
        } else if (item.children && item.children) {
            treeSelectFormat(item.children, id);
        }
    }
}

/**
 * [将毫秒数转化为]
 * @param  {[Number]} data   [毫秒数]  required
 * @param  {[String]} hyphen   [连字符]
 */
export function dataFormat(data, hyphen) {
    let date = new Date(data),
        month = date.getMonth() + 1,
        strDate = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        currentdate, currentHours;

    if (hyphen) {
        //个数月、日前面添加0
        month >= 1 && month <= 9 ? month = '0' + month : '';
        strDate >= 0 && strDate <= 9 ? strDate = '0' + strDate : '';
        hours >= 0 && hours <= 9 ? hours = '0' + hours : '';
        minutes >= 0 && minutes <= 9 ? minutes = '0' + minutes : '';
        seconds >= 0 && seconds <= 9 ? seconds = '0' + seconds : '';

        currentdate = date.getFullYear() + hyphen + month + hyphen + strDate;
        currentHours = hours + ':' + minutes + ':' + seconds;

    } else {
        currentdate = date.getFullYear() + '年' + month + '月' + strDate + '日';
        currentHours = hours + '时' + minutes + '分' + seconds + '秒';
    }

    currentdate += ' ' + currentHours;

    return currentdate;
}
