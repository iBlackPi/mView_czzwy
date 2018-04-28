(function () {
    var h3cBase = {
        trailingSpace: function (str) {
            return typeof str === 'string' ? str.replace(/\s*$/g, '') : false;//'数据类型错误'
        },
        check: {
            isNum: function (num) {
                return /^[0-9]*$/.test(num.toString());
            },

            user: function (str) {
                //用户名,包含大或小写字母或数字，6-20位。禁止中文（编码时可能出现兼容性问题） 
 
                return h3cBase.trailingSpace(str) ? /^[A-Za-z0-9]{6,20}$/.test(str) : false;//'数据类型错误'
            },
            password: function (str) {
                //密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在6-20之间。
                //return h3cBase.trailingSpace(str) ? /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(str) : false;//'数据类型错误'
                

                //密码规则：长度8-14位，首字符必须为字母，且至少包含数字、大写字母、小写字母和特殊字符中的三种类型（特殊字符不包括 %; #; ?; '; +; <; >; \; --;";）
                var isCount = 0;
                if(!h3cBase.trailingSpace(str)){
                    return false
                }
                if (str.length < 8 || str.length > 14) {
                    return false
                }

                if (/[\%\#\?\'\+\<\>\\\-]+/.test(str)) {
                    return false
                }

                if(/[^a-zA-Z]/.test(str.substring(0,1))){
                    return false
                }
               
                if (/([0-9])+/.test(str)) {
                    isCount++
                }
                if (/([A-Z])+/.test(str)) {
                    isCount++
                }
                if (/([a-z])+/.test(str)) {
                    isCount++
                }
                if (/[\~\`\!\@\$\^\&\*\(\)\_\=\{\}\|\[\]\:\;\,\.\/]+/.test(str)) {
                    isCount++
                }
                if (isCount >= 3) {
                    return true
                } else {
                    return false
                }


            },
            hasChinese: function (str) {
                //校验中文

                return h3cBase.trailingSpace(str) ? /^[\u4e00-\u9fa5]{0,}$/.test(str) : false;//'数据类型错误'
            },
            email: function (str) {
                //校验E-Mail 地址u
                return h3cBase.trailingSpace(str) ? /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(str) : false;//'数据类型错误'
            },
            idCard: function (idcard) {
                typeof idcard === 'number' ? idcarda = idcarda.toString() : '';
                idcard = h3cBase.trailingSpace(idcard);
                if (idcard) {
                    return false;//'数据类型错误'
                }

                //校验身份证号码(15 或 18位)
                idcard.replace(/\s*$/g, '');
                var Errors = ['验证通过!',
                    '身份证号码位数不对!',
                    '身份证号码出生日期超出范围或含有非法字符!',
                    '身份证号码校验错误!',
                    '身份证地区非法!'];

                var area = {
                    11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林',
                    23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西',
                    37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南',
                    50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃',
                    63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'
                };

                var idcard, Y, JYM;
                var S, M;
                var idcard_array = new Array();
                idcard_array = idcard.split('');
                /*地区检验*/

                /*身份号码位数及格式检验*/
                switch (idcard.length) {
                    case 15:
                        if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt

                            (idcard.substr(6, 2)) + 1900) % 4 == 0 )) {
                            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
                        } else {
                            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
                        }
                        if (ereg.test(idcard)) {
                            if (area[parseInt(idcard.substr(0, 2))] == null) {
                                console.log(Errors[4]);
                                return false;
                            } else {
                                console.log(Errors[0] + '(15)');
                                return false;
                                /*检测ID的校验位*/
                            }
                        }
                        else {
                            console.log(Errors[2]);
                            return false;
                        }
                        break;

                    case 18:
                        //18位身份号码检测
                        //出生日期的合法性检查
                        //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                        //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                        if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0 )) {
                            ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
                        } else {
                            ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
                        }
                        if (ereg.test(idcard)) {//测试出生日期的合法性
                            //计算校验位
                            S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                                + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                                + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                                + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                                + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                                + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                                + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                                + parseInt(idcard_array[7]) * 1
                                + parseInt(idcard_array[8]) * 6
                                + parseInt(idcard_array[9]) * 3;
                            Y = S % 11;
                            M = 'F';
                            JYM = '10X98765432';
                            M = JYM.substr(Y, 1);
                            /*判断校验位*/
                            if (M == idcard_array[17]) {
                                //alert(Errors[0]+'18');
                                if (area[parseInt(idcard.substr(0, 2))] == null) {
                                    console.log(Errors[4]);
                                    return false;
                                } else {
                                    console.log(Errors[0] + '(18)');
                                    return false;
                                    /*检测ID的校验位*/
                                }

                            }
                            else {
                                console.log(Errors[3]);
                                return false;
                            }
                        }
                        else {
                            console.log(Errors[2]);
                            return false;
                        }
                        break;

                    default:
                        console.log(Errors[1]);
                        return false;

                }

            },
            date: function (str, hyphen) {
                //校验日期 
                //hyphen为连字符且只对日期生效，时间连字符默认为':'，不传的话默认为'-' 
                //“yyyy  hyphen mm  hyphen dd” 或 “yyyy  hyphen mm  hyphen dd hh:mm:ss” 格式的日期校验，已考虑平闰年。

                hyphen === undefined ? hyphen = '-' : '';
                return h3cBase.trailingSpace(str) ? new RegExp('^(?:(?!0000)[0-9]{4}' + hyphen + '(?:(?:0[1-9]|1[0-2])' + hyphen + '(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$').test(str) : false;//'数据类型错误'

            },
            phone: function (str) {
                //校验手机号（下面是国内 13、15、18开头的手机号正则表达式。14是能接收短信的，可百度）
                typeof str === 'number' ? str = str.toString() : '';
                return h3cBase.trailingSpace(str) ? /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(str) : false;//'数据类型错误'
            },
            ipAdress: function (str) {
                //校验IP地址
                return h3cBase.trailingSpace(str) ? /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(str) : false;//'数据类型错误'
            },
            fileSize: function (fileId, maxsize) {
                //文件大小上传校验。maxsize为设置文件的最大大小,单位为KB
                fileId = h3cBase.trailingSpace(fileId);
                if (fileId) {
                    return false;//'数据类型错误'
                }
                //默认不传为2M
                maxsize === undefined ? maxsize = 2 * 1024 : '';

                var obj_file = document.getElementById(fileId),
                    errMsg = '上传的附件文件不能超过' + maxsize / 1024 + 'M！！！',
                    tipMsg = '您的浏览器暂不支持计算上传文件的大小，确保上传文件不要超过' + maxsize / 1024 + 'M，建议使用IE、FireFox、Chrome浏览器。',
                    browserCfg = {},
                    ua = window.navigator.userAgent;
                //由于js获取文件大小时单位为B。而设置的传参单位为KB 所以讲传入的maxsize转换为B
                maxsize = maxsize * 1024;

                if (ua.indexOf('MSIE') >= 1) {
                    browserCfg.ie = true;
                } else if (ua.indexOf('Firefox') >= 1) {
                    browserCfg.firefox = true;
                } else if (ua.indexOf('Chrome') >= 1) {
                    browserCfg.chrome = true;
                }

                try {

                    if (obj_file.value == '') {
                        return false;
                    }
                    var filesize = 0;
                    if (browserCfg.firefox || browserCfg.chrome) {
                        filesize = obj_file.files[0].size;
                    } else if (browserCfg.ie) {
                        var obj_img = document.getElementById('tempimg');
                        obj_img.dynsrc = obj_file.value;
                        filesize = obj_img.fileSize;
                    } else {
                        return false;//tipMsg
                    }
                    if (filesize == -1) {
                        return false;//tipMsg
                    } else if (filesize > maxsize) {
                        return false;//errMsg
                    } else {
                        return true;
                    }
                } catch (e) {
                    return e;
                }

            },
            fileKind: function (fileId, kind) {
                //文件格式上传

                fileId = h3cBase.trailingSpace(fileId);
                if (fileId) {
                    return false;//'数据类型错误'
                }
                if (kind === undefined) {
                    kind = ['doc', 'excel', 'ppt', 'txt'];
                }
                var fileName = document.getElementById(fileId).value, isRight = false, kindStr = '';
                if (fileName == '') {

                    return false;
                } else {
                    idx = fileName.lastIndexOf('.');
                    if (idx != -1) {
                        ext = fileName.substr(idx + 1).toUpperCase();
                        ext = ext.toLowerCase();
                        for (var i = 0; i < kind.length; i++) {
                            kindStr += kind[i];
                            if (ext == kind[i]) {
                                isRight = true;
                            }
                        }
                        if (isRight) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {

                        return false;

                    }
                }
            },
            quantity: function (quantity, range) {
                //range =[min,max] 
                //数量校验

                typeof quantity === 'number' ? quantity = quantity.toString() : '';

                quantity = h3cBase.trailingSpace(quantity);
                if (quantity) {
                    return false;//'数据类型错误'
                }

                if (/^[1－9]\d*$/.test(quantity)) {
                    return false;//'请输入正整数'
                }

                if (range === undefined) {
                    return true;
                }

                if (!range instanceof Array && range.length !== 2) {
                    return false//'请正确输入范围'
                }

                var min = Number(range[0]), max = Number(range[1]);

                if (quantity < min || quantity > max) {
                    return false//'超出大小限制'
                }

                return true;

            }
          
        },
        change: {
            decimal: function (num, n) {

                n === undefined ? n = 2 : '';
                if (n < 0) {
                    return '请正确输入保留N位';
                }
                typeof num === 'number' ? num = num.toString() : '';
                typeof n === 'number' ? n = n.toString() : '';
                num = h3cBase.trailingSpace(num);
                n = h3cBase.trailingSpace(n);
                if (!h3cBase.check.isNum(num)) {
                    return '数量格式错误';
                }
                if (!h3cBase.check.isNum(n)) {
                    return '位数格式错误';
                }
                return num && n ? Number(num.match(new RegExp('\\d+(\\.\\d{' + n + '})?'))[0]) : false;
            },

            date: function (str, before, after) {
                //日期格式替换
                return h3cBase.trailingSpace(str) && h3cBase.trailingSpace(before) && h3cBase.trailingSpace(after) ? str.split(before).join(after) : false;
            }
        },
        getDate: function (hasHours, hyphen) {
            //不传参默认为日期+时间（中文），
            //第一个参数为false 只显示日期，第二个参数设置日期的连字符

            hasHours === undefined ? hasHours = true : '';
            hyphen === undefined ? hyphen = false : '';

            if (!typeof hasHours === 'boolean') {
                return false;//规定第一个参数为boolean型
            }

            if (!typeof hyphen === 'string') {
                return false;//规定第二个参数为String型
            }

            var date = new Date(),
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

            hasHours ? currentdate += ' ' + currentHours : '';

            return currentdate;

        },

        unique: function (arr) {
            //数组去重
            if (!arr instanceof Array) {
                return false;
            }
            var res = [];
            var json = {};
            for (var i = 0; i < arr.length; i++) {
                if (!json[arr[i]]) {
                    res.push(arr[i]);
                    json[arr[i]] = 1;
                }
            }
            return res;
        },
        bubbleSort: function (arr) {
            if (!arr instanceof Array) {
                return false;
            }

            /*给每个未确定的位置做循环*/
            for (var unfix = arr.length - 1; unfix > 0; unfix--) {
                /*给进度做个记录，比到未确定位置*/
                for (var i = 0; i < unfix; i++) {
                    arr[i] = Number(arr[i]);
                    arr[i + 1] = Number(arr[i + 1]);
                    if (arr[i] > arr[i + 1]) {
                        var temp = arr[i];
                        arr.splice(i, 1, arr[i + 1]);
                        arr.splice(i + 1, 1, temp);
                    }
                }
            }
            return arr

        },
        firstUpperCase: function (str) {
            var array = str.toLowerCase().split(' ');
            for (var i = 0; i < array.length; i++) {
                array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
            }

            return array.join(' ');
        },
        getUrlData: function () {

            var url = location.search; //获取url中"?"符后的字串   
             var theRequest = {};   
             if (url.indexOf("?") != -1) {   
                var str = url.substr(1);   
                strs = str.split("&");   
                for(var i = 0; i < strs.length; i ++) {   
                   theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
                }   
             }   
             return theRequest;   
        },
        stopPropagation: function (e) {
            e = e || window.event;
            if (e.stopPropagation) { //W3C阻止冒泡方法
                e.stopPropagation();
            } else {
                e.cancelBubble = true; //IE阻止冒泡方法
            }
        },
        stopDefault:function(e) { 
            //阻止默认浏览器动作(W3C) 
            if ( e && e.preventDefault ) {
                e.preventDefault(); 
            }          
            //IE中阻止函数器默认动作的方式 
            else{
                 window.event.returnValue = false; 
            }      
            return false; 
        },
        canvasSupport: function () {
            if (!document.createElement('canvas').getContext) {
                return false;
            } else {
                return true;
            }
        },
        svgSupport: function (src) {
            SVG_NS = src;
            return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
        },
        isWeiXin: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        myBrowser: function () {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf('Opera') > -1;
            if (isOpera) {
                return 'Opera'
            } //判断是否Opera浏览器
            if (userAgent.indexOf('Firefox') > -1) {
                return 'Firefox';
            } //判断是否Firefox浏览器
            if (userAgent.indexOf('Chrome') > -1) {
                return 'Chrome';
            }
            if (userAgent.indexOf('Safari') > -1) {
                return 'Safari';
            } //判断是否Safari浏览器
            if (!-[1,]) {
                return 'IE';
            } //判断是否IE浏览器

            return isOpera ? 'Opera' : userAgent.indexOf('Firefox') > -1 ? 'FF' : userAgent.indexOf('Chrome') > -1 ? 'Chrome' : userAgent.indexOf('Safari') > -1 ? 'Safari' : !-[1,] ? 'IE' : '';
        },
        getClient: function () {
            //返回浏览器的可视区域位置 
            var l, t, w, h;
            l = document.documentElement.scrollLeft || document.body.scrollLeft;
            t = document.documentElement.scrollTop || document.body.scrollTop;
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
            return {left: l, top: t, width: w, height: h};
        },
        getSubClient: function (p) {
            //返回待加载资源位置 
            var l = 0, t = 0, w, h;
            w = p.offsetWidth;
            h = p.offsetHeight;
            while (p.offsetParent) {
                l += p.offsetLeft;
                t += p.offsetTop;
                p = p.offsetParent;
            }
            return {left: l, top: t, width: w, height: h};
        }
    };
    typeof(window) == 'undefined' ? module.exports = h3cBase : window.h3cBase = h3cBase;

})();