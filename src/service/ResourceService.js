/**
 * 资源管理
 */
//生成记录的ID,根据时间生成
const genUuid = require('uuid/v1');
const resourceDao = require('../dao/ResourceDao');

const resourceService = {};

//查询返回所有资源
resourceService.findResource = (fn) => {
    resourceDao.find(fn);
};

//更新资源信息
resourceService.updateResource = (resourceContent, where, fn) => {
    resourceDao.update(resourceContent, where, fn);
};

//增加资源信息
resourceService.addResource = (addContent, fn) => {
    addContent.id = genUuid();
    //如果保存的类型是comp组件类型，那么要判断其是否是父菜单下唯一的组件
    //如果是，那么应当再保存一个与其平级的菜单守卫组件
    if(addContent.type === 'comp'){
        resourceDao.findPart({location: addContent.location}, res => {
            if(res.length === 0){
                resourceDao.findPart({parentId: addContent.parentId}, res => {
                    if(res.length === 0){
                        resourceDao.create({
                            id: genUuid(),
                            title: '菜单守卫',
                            parentId: addContent.parentId,
                            type: 'menuGuard'
                        }, (res) => {
                            if(res){
                                console.log('保存菜单守卫成功！');
                            }else{
                                console.error('保存菜单守卫失败！');
                            }
                        });
                    }
                    resourceDao.create(addContent, fn);
                });
            }else{
                fn(false);
            }
        })
    }else{
        resourceDao.create(addContent, fn);
    }
};

//删除资源信息
resourceService.deleteResource = (data, fn) => {
    //如果删除的菜单类型是comp组件，那么判断该组件兄弟有几个
    //如果兄弟只有一个，那明显只有菜单守卫和当前选中的菜单选项，如果菜单被删除，那么守卫也应该清除
    if(data.currentResource.type === 'comp'){
        resourceDao.findPart({parentId: data.currentResource.parentId}, (res) => {
            if(res.length <= 2){
                resourceDao.delete({
                    type: 'menuGuard'
                }, (res) => {
                    if(res){
                        console.log('删除菜单守卫成功！');
                    }else{
                        console.error('删除菜单守卫失败！');
                    }
                });
            }
            resourceDao.delete(data.where, fn);
        });
    }else{
        resourceDao.delete(data.where, fn);
    }
};

module.exports = resourceService;