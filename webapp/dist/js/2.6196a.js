webpackJsonp([2],{"1008":function(e,t,a){var o=a(1009);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,a(1001).default)("185d134c",o,!0,{})},"1009":function(e,t,a){(e.exports=a(1e3)(!1)).push([e.i,".resource-manage[data-v-495e3d1c]{display:flex;width:100%;height:99%;margin-top:-5px;flex-flow:row nowrap;justify-content:space-between}.resource-manage-common[data-v-495e3d1c]{background-color:#fff;flex-grow:1}.resource-manage-asider[data-v-495e3d1c]{flex-basis:20%}.resource-manage-main[data-v-495e3d1c]{margin-left:.5rem;flex-basis:80%}.resource-manage-main .button-container[data-v-495e3d1c]{position:absolute;right:17px;top:8px}",""])},"1010":function(e,t,a){var o=a(1011);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,a(1001).default)("7fda1ac2",o,!0,{})},"1011":function(e,t,a){(e.exports=a(1e3)(!1)).push([e.i,"",""])},"1012":function(e,t,a){var o=a(1013);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,a(1001).default)("93be1dc4",o,!0,{})},"1013":function(e,t,a){(e.exports=a(1e3)(!1)).push([e.i,"",""])},"1065":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{"value":!0});var o={"name":"resource-detail","props":{"resourceDetailData":{"type":Object,"default":function(){return{"id":"请选择具体资源","title":"请选择具体资源","location":"请选择具体资源","parentId":"请选择具体资源","type":"请选择具体资源","icon":"请选择具体资源"}}},"disabled":{"type":Boolean,"default":!1}},"mounted":function(){var t=this;this.$bus.$on("updateResourceInfo",function(){t.$http.post("/resourceController.do?m=updateResource",t.resourceDetailData).then(function(e){e.data.success?(t.$Notice.success({"title":"修改资源成功！"}),"leaf"===t.resourceDetailData.type&&t.$store.dispatch("menu/getMenu",t)):t.$Notice.error({"title":"修改资源失败！"})}).catch(function(e){throw t.$Notice.error({"title":"修改资源失败！"}),new Error(e)})})}},r={"render":function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Form",{"attrs":{"model":t.resourceDetailData,"label-width":80}},[a("FormItem",{"attrs":{"label":"资源ID"}},[a("Input",{"attrs":{"placeholder":"请输入资源名称","disabled":""},"model":{"value":t.resourceDetailData.id,"callback":function(e){t.$set(t.resourceDetailData,"id",e)},"expression":"resourceDetailData.id"}})],1),t._v(" "),a("FormItem",{"attrs":{"label":"资源名称"}},[a("Input",{"attrs":{"placeholder":"请输入资源名称","disabled":t.disabled},"model":{"value":t.resourceDetailData.title,"callback":function(e){t.$set(t.resourceDetailData,"title",e)},"expression":"resourceDetailData.title"}})],1),t._v(" "),a("FormItem",{"attrs":{"label":"资源路径"}},[a("Input",{"attrs":{"placeholder":"请输入资源路径","disabled":t.disabled},"model":{"value":t.resourceDetailData.location,"callback":function(e){t.$set(t.resourceDetailData,"location",e)},"expression":"resourceDetailData.location"}})],1),t._v(" "),a("FormItem",{"attrs":{"label":"父资源"}},[a("Input",{"attrs":{"placeholder":"请输入父资源","disabled":t.disabled},"model":{"value":t.resourceDetailData.parentId,"callback":function(e){t.$set(t.resourceDetailData,"parentId",e)},"expression":"resourceDetailData.parentId"}})],1),t._v(" "),a("FormItem",{"attrs":{"label":"类型"}},[a("Input",{"attrs":{"placeholder":"请输入菜单类型（leaf/comp）","disabled":t.disabled},"model":{"value":t.resourceDetailData.type,"callback":function(e){t.$set(t.resourceDetailData,"type",e)},"expression":"resourceDetailData.type"}})],1),t._v(" "),a("FormItem",{"attrs":{"label":"图标"}},[a("Input",{"attrs":{"placeholder":"请输入图标","disabled":t.disabled},"model":{"value":t.resourceDetailData.icon,"callback":function(e){t.$set(t.resourceDetailData,"icon",e)},"expression":"resourceDetailData.icon"}})],1)],1)},"staticRenderFns":[]};var s=a(3)(o,r,!1,function(e){a(1010)},"data-v-3f3ee886",null).exports,n={"name":"add-resource-modal","data":function(){return{"modal":!1,"newResource":{"parentId":"","title":"","location":"","type":"","icon":""}}},"methods":{"ok":function(){var t=this;this.modal=!1,this.$http.post("/resourceController.do?m=addResource",this.newResource).then(function(e){e.data.success?(t.$Notice.success({"title":"添加资源成功！"}),"leaf"===t.newResource.type&&t.$store.dispatch("menu/getMenu",t),t.$emit("freshResource")):t.$Notice.error({"title":"添加资源失败！","desc":e.data.message})}).catch(function(e){throw new Error(e)})},"cancel":function(){this.modal=!1}},"mounted":function(){var t=this;this.$bus.$on("showModal",function(e){t.modal=!0,t.newResource.parentId=e})}},c={"render":function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Modal",{"attrs":{"title":"新增资源"},"on":{"on-ok":t.ok,"on-cancel":t.cancel},"model":{"value":t.modal,"callback":function(e){t.modal=e},"expression":"modal"}},[a("Form",{"attrs":{"model":t.newResource,"label-width":80}},[a("FormItem",{"attrs":{"label":"资源名称"}},[a("Input",{"attrs":{"placeholder":"请输入资源名称"},"model":{"value":t.newResource.title,"callback":function(e){t.$set(t.newResource,"title",e)},"expression":"newResource.title"}})],1),t._v(" "),a("FormItem",{"attrs":{"label":"资源路径"}},[a("Input",{"attrs":{"placeholder":"请输入资源路径"},"model":{"value":t.newResource.location,"callback":function(e){t.$set(t.newResource,"location",e)},"expression":"newResource.location"}})],1),t._v(" "),a("FormItem",{"attrs":{"label":"父资源"}},[a("Input",{"attrs":{"placeholder":"请输入父资源"},"model":{"value":t.newResource.parentId,"callback":function(e){t.$set(t.newResource,"parentId",e)},"expression":"newResource.parentId"}})],1),t._v(" "),a("FormItem",{"attrs":{"label":"类型"}},[a("Input",{"attrs":{"placeholder":"请输入菜单类型"},"model":{"value":t.newResource.type,"callback":function(e){t.$set(t.newResource,"type",e)},"expression":"newResource.type"}})],1),t._v(" "),a("FormItem",{"attrs":{"label":"图标"}},[a("Input",{"attrs":{"placeholder":"请输入图标"},"model":{"value":t.newResource.icon,"callback":function(e){t.$set(t.newResource,"icon",e)},"expression":"newResource.icon"}})],1)],1)],1)},"staticRenderFns":[]};var i=a(3)(n,c,!1,function(e){a(1012)},"data-v-ba4f5514",null).exports,l=a(114),u={"name":"resource-manage","data":function(){return{"isShowDelete":!1,"modalInfo":{},"disabled":!0,"isSave":!1,"resourceDetailData":{},"treeData":[],"rawData":[]}},"components":{"ResourceDetail":s,"AddResourceModal":i},"watch":{"$route":function(e,t){this.getResource()}},"mounted":function(){this.getResource()},"methods":{"getResource":function(){var a=this,o=this;this.$nextTick(function(){a.$http.get("/resourceController.do?m=findResource").then(function(e){if(!e.data.success)throw new Error("未获取到资源数据");a.rawData=e.data.data;var t=Object(l["a"])(e.data.data,"type",function(e){var t={"id":e.id,"title":e.title,"icon":e.icon,"parentId":e.parentId,"location":e.location,"type":e.type};return"menuGuard"===e.type&&(t.disabled=!0,t.expand=!0,t.render=function(e){return e("span",{"style":{"display":"inline-block","width":"100%","color":"#ddd"}},[e("span",{"style":{"padding-left":"4px"}},"菜单守卫")])}),t});t[0].expand=!0,t[0].selected=!0,o.treeData=t,o.resourceDetailData=t[0]})})},"freshResource":function(){this.getResource()},"selectResource":function(e){this.resourceDetailData=e[0]},"edit":function(){this.isSave=!0,this.disabled=!1},"save":function(){this.isSave=!1,this.disabled=!0,this.$bus.$emit("updateResourceInfo")},"cancelUpdate":function(){this.isSave=!1,this.disabled=!0},"showAddModal":function(){this.$bus.$emit("showModal",this.resourceDetailData.id)},"confirmDelete":function(){var t=this,a=[];a.push(this.resourceDetailData.id),this.rawData.filter(function(e){return e.parentId===t.resourceDetailData.id}).forEach(function(e){a.push(e.id)}),this.$http.post("/resourceController.do?m=deleteResource",{"where":{"id":a},"currentResource":this.resourceDetailData}).then(function(e){e.data.success?(t.$Notice.success({"title":"删除资源成功！"}),t.getResource(),"leaf"===t.resourceDetailData.type&&t.$store.dispatch("menu/getMenu",t)):t.$Notice.error({"title":"删除资源失败！"})}).catch(function(e){throw new Error(e)})}}},d={"render":function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{"staticClass":"resource-manage"},[a("aside",{"staticClass":"resource-manage-common resource-manage-asider"},[a("Card",{"staticStyle":{"height":"100%"}},[a("p",{"staticStyle":{"font-weight":"normal"},"attrs":{"slot":"title"},"slot":"title"},[t._v("资源概览")]),t._v(" "),a("a",{"attrs":{"slot":"extra","href":"#"},"on":{"click":function(e){return e.preventDefault(),t.getResource(e)}},"slot":"extra"},[a("Icon",{"attrs":{"type":"ios-loop-strong"}})],1),t._v(" "),a("Input",{"attrs":{"placeholder":"输入资源名称"}},[a("Button",{"attrs":{"slot":"append","icon":"ios-search"},"slot":"append"})],1),t._v(" "),a("Tree",{"attrs":{"data":t.treeData},"on":{"on-select-change":t.selectResource}})],1)],1),t._v(" "),a("section",{"staticClass":"resource-manage-common resource-manage-main"},[a("Card",{"staticStyle":{"height":"100%"}},[a("p",{"staticStyle":{"font-weight":"normal"},"attrs":{"slot":"title"},"slot":"title"},[t._v("资源详情")]),t._v(" "),a("resource-detail",{"attrs":{"resourceDetailData":t.resourceDetailData,"disabled":t.disabled}})],1),t._v(" "),a("div",{"staticClass":"button-container"},[-1!==this.$store.state.validateInfo.resourceList.indexOf("changeResource")?[t.isSave?t._e():a("Button",{"attrs":{"type":"primary","shape":"circle","icon":"edit"},"on":{"click":t.edit}}),t._v(" "),a("Button",{"directives":[{"name":"show","rawName":"v-show","value":t.isSave,"expression":"isSave"}],"attrs":{"type":"warning","shape":"circle"},"on":{"click":t.cancelUpdate}},[t._v("取消")]),t._v(" "),a("Button",{"directives":[{"name":"show","rawName":"v-show","value":t.isSave,"expression":"isSave"}],"attrs":{"type":"primary","shape":"circle"},"on":{"click":t.save}},[t._v("保存")])]:t._e(),t._v(" "),a("Button",{"attrs":{"type":"primary","shape":"circle","icon":"plus-round"},"on":{"click":t.showAddModal}}),t._v(" "),a("Button",{"attrs":{"type":"primary","shape":"circle","icon":"ios-trash-outline"},"on":{"click":function(e){t.isShowDelete=!0}}})],2)],1),t._v(" "),a("add-resource-modal",{"attrs":{"modalInfo":t.modalInfo},"on":{"freshResource":t.freshResource}}),t._v(" "),a("Modal",{"attrs":{"title":"确认提示"},"on":{"on-ok":t.confirmDelete},"model":{"value":t.isShowDelete,"callback":function(e){t.isShowDelete=e},"expression":"isShowDelete"}},[a("p",[t._v("确定要删除 "),a("span",{"staticStyle":{"color":"#f90","font-weight":"bold","font-size":".9rem"}},[t._v(t._s(t.resourceDetailData?t.resourceDetailData.title:"")),t.resourceDetailData&&t.resourceDetailData.children?a("span",[t._v("及其子菜单")]):t._e()]),t._v(" 么？")])])],1)},"staticRenderFns":[]};var p=a(3)(u,d,!1,function(e){a(1008)},"data-v-495e3d1c",null);t["default"]=p.exports}});