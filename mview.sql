/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50638
Source Host           : localhost:3306
Source Database       : mview

Target Server Type    : MYSQL
Target Server Version : 50638
File Encoding         : 65001

Date: 2018-06-13 15:07:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for api
-- ----------------------------
DROP TABLE IF EXISTS `api`;
CREATE TABLE `api` (
  `type` varchar(255) DEFAULT NULL COMMENT 'api类型：方法、控制器',
  `id` varchar(50) NOT NULL,
  `apiname` varchar(255) DEFAULT NULL,
  `apisrc` varchar(255) NOT NULL DEFAULT '' COMMENT 'api路径 主键 不允许重复',
  `apidesc` varchar(255) DEFAULT NULL COMMENT 'api描述',
  `parentId` varchar(255) DEFAULT NULL COMMENT '父id',
  PRIMARY KEY (`apisrc`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api
-- ----------------------------
INSERT INTO `api` VALUES ('method', '6', '添加资源', 'addResource', '添加资源', '5');
INSERT INTO `api` VALUES ('method', '3', '添加用户', 'adduser', '添加用户', '2');
INSERT INTO `api` VALUES ('method', '4', '删除用户', 'deleteUser', '删除用户', '2');
INSERT INTO `api` VALUES ('', '1', '接口概览', 'null', '全部注册接口', 'null');
INSERT INTO `api` VALUES ('controll', '5', '资源控制器', 'resourceController', '资源管理', '1');
INSERT INTO `api` VALUES ('method', '7', '修改资源', 'updateResource', '修改资源', '5');
INSERT INTO `api` VALUES ('controll', '2', '用户控制器', 'userController', '用户管理', '1');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL COMMENT '主键,不能重复',
  `parentId` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '页面级别或者组件级别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '云管理', 'cloud-manage', '3', 'android-cloud-outline', 'leaf');
INSERT INTO `menu` VALUES ('10', '信息详情', '', '1', 'ios-list-outline', 'leaf');
INSERT INTO `menu` VALUES ('163eaee0-4e7f-11e8-8f3d-1f93c40e0187', '菜单守卫', 'cdsw', '6', '', 'comp');
INSERT INTO `menu` VALUES ('2', '全市总览', 'info-maintain', '1', 'grid', 'leaf');
INSERT INTO `menu` VALUES ('276f1940-59c2-11e8-a151-63b20ecb1bec', '原始数据', 'department-info', '1', 'map', 'leaf');
INSERT INTO `menu` VALUES ('28c112e0-63c1-11e8-b543-1789f37aadd7', '局委办总览', 'department-static', '1', 'ios-pricetags-outline', 'leaf');
INSERT INTO `menu` VALUES ('2b04e0a0-5745-11e8-97c4-cb368c44ae1b', '信息化系统详情', 'info-sys-maintain', '10', 'cube', 'leaf');
INSERT INTO `menu` VALUES ('3', '资源信息', 'root', 'null', 'grid', 'leaf');
INSERT INTO `menu` VALUES ('4', '系统管理', 'sys-manage', '3', 'gear-b', 'leaf');
INSERT INTO `menu` VALUES ('5', '用户管理', 'user-manage', '4', 'person-stalker', 'leaf');
INSERT INTO `menu` VALUES ('577bd640-4f7d-11e8-99f8-610f68266f78', '机房信息详情', 'computer-room', '10', 'ios-home-outline', 'leaf');
INSERT INTO `menu` VALUES ('6', '资源管理', 'resource-manage222', '4', 'grid', 'leaf');
INSERT INTO `menu` VALUES ('64f61950-5745-11e8-97c4-cb368c44ae1b', '资源目录汇总', 'resource-catalog-manage', '10', 'ios-list-outline', 'leaf');
INSERT INTO `menu` VALUES ('8', '修改资源', 'changeResource', '6', 'grid', 'comp');
INSERT INTO `menu` VALUES ('9', '增加用户', 'addUser', '5', null, 'comp');
INSERT INTO `menu` VALUES ('90262260-6289-11e8-b543-1789f37aadd7', '大屏1', 'bigMain', '1', '', 'comp');
INSERT INTO `menu` VALUES ('9b6c5590-6289-11e8-b543-1789f37aadd7', '大屏2', 'bigBenefit', '1', '', 'comp');
INSERT INTO `menu` VALUES ('b274a8e0-4791-11e8-ab97-a1500cbe3d2f', 'API管理', 'apiManage', '4', 'grid', 'comp');
INSERT INTO `menu` VALUES ('b704e200-6472-11e8-8858-87e88f1c67ea', '网络情况', 'net-info', '10', 'ios-world-outline', 'leaf');
INSERT INTO `menu` VALUES ('f6f3eeb0-6756-11e8-b4b0-6f08574d4ecb', '大屏3', 'bigOther', '3', '', 'comp');
INSERT INTO `menu` VALUES ('fb6304e0-6472-11e8-8858-87e88f1c67ea', '迁移详情', 'move-info', '10', 'ios-cloud-upload-outline', 'leaf');

-- ----------------------------
-- Table structure for menu_and_role
-- ----------------------------
DROP TABLE IF EXISTS `menu_and_role`;
CREATE TABLE `menu_and_role` (
  `id` varchar(50) DEFAULT NULL,
  `componentid` varchar(50) DEFAULT NULL,
  `roleid` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu_and_role
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `rolecode` varchar(255) DEFAULT NULL,
  `id` varchar(50) NOT NULL,
  `rolename` varchar(255) DEFAULT NULL,
  `roledesc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('0', '1', '管理员', null);
INSERT INTO `role` VALUES ('1', '2', '客户', null);
INSERT INTO `role` VALUES ('2', '3', '普通用户', null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'admin');
INSERT INTO `user` VALUES ('2', 'root', 'root');
INSERT INTO `user` VALUES ('909050f0-4721-11e8-a436-9b224ddbeb8a', 'c', 'c');
INSERT INTO `user` VALUES ('91ac7510-477e-11e8-9961-c5521d7df2e6', 'gg', 'gg');
INSERT INTO `user` VALUES ('93d325a0-477e-11e8-9961-c5521d7df2e6', 'gg', 'ggs');
INSERT INTO `user` VALUES ('956cff80-477e-11e8-9961-c5521d7df2e6', 'gg', 'ggs');
INSERT INTO `user` VALUES ('a3bb69a0-477e-11e8-9961-c5521d7df2e6', 'gg', 'ggs');

-- ----------------------------
-- Table structure for user_and_api
-- ----------------------------
DROP TABLE IF EXISTS `user_and_api`;
CREATE TABLE `user_and_api` (
  `id` varchar(50) NOT NULL,
  `userid` varchar(50) DEFAULT NULL,
  `apiid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_and_api
-- ----------------------------

-- ----------------------------
-- Table structure for user_and_resource
-- ----------------------------
DROP TABLE IF EXISTS `user_and_resource`;
CREATE TABLE `user_and_resource` (
  `id` varchar(50) NOT NULL,
  `userid` varchar(50) DEFAULT NULL,
  `resourceid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_and_resource
-- ----------------------------
INSERT INTO `user_and_resource` VALUES ('129818d0-479f-11e8-98e7-7fa4ca7136f6', '1', '5');
INSERT INTO `user_and_resource` VALUES ('129818d1-479f-11e8-98e7-7fa4ca7136f6', '1', '9');
INSERT INTO `user_and_resource` VALUES ('129818d2-479f-11e8-98e7-7fa4ca7136f6', '1', '8');
INSERT INTO `user_and_resource` VALUES ('c04a5470-4e7f-11e8-8f3d-1f93c40e0187', '2', '3');
INSERT INTO `user_and_resource` VALUES ('c04a5471-4e7f-11e8-8f3d-1f93c40e0187', '2', '1');
INSERT INTO `user_and_resource` VALUES ('c04a5472-4e7f-11e8-8f3d-1f93c40e0187', '2', '2');
INSERT INTO `user_and_resource` VALUES ('c04a5473-4e7f-11e8-8f3d-1f93c40e0187', '2', '10');
INSERT INTO `user_and_resource` VALUES ('c04a5474-4e7f-11e8-8f3d-1f93c40e0187', '2', '4');
INSERT INTO `user_and_resource` VALUES ('c04a5475-4e7f-11e8-8f3d-1f93c40e0187', '2', '5');
INSERT INTO `user_and_resource` VALUES ('c04a5476-4e7f-11e8-8f3d-1f93c40e0187', '2', '9');
INSERT INTO `user_and_resource` VALUES ('c04a5477-4e7f-11e8-8f3d-1f93c40e0187', '2', '6');
INSERT INTO `user_and_resource` VALUES ('c04a5478-4e7f-11e8-8f3d-1f93c40e0187', '2', '8');
INSERT INTO `user_and_resource` VALUES ('c04a5479-4e7f-11e8-8f3d-1f93c40e0187', '2', '163eaee0-4e7f-11e8-8f3d-1f93c40e0187');
INSERT INTO `user_and_resource` VALUES ('c04a547a-4e7f-11e8-8f3d-1f93c40e0187', '2', 'b274a8e0-4791-11e8-ab97-a1500cbe3d2f');

-- ----------------------------
-- Table structure for user_and_role
-- ----------------------------
DROP TABLE IF EXISTS `user_and_role`;
CREATE TABLE `user_and_role` (
  `id` varchar(50) NOT NULL,
  `userid` varchar(50) DEFAULT NULL,
  `roleid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_and_role
-- ----------------------------
