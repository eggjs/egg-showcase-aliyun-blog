/*
 Navicat MySQL Data Transfer

 Source Server         : aliyun-egg-blog
 Source Server Version : 50619
 Source Host           : 10.101.81.18
 Source Database       : aplpc94mfv212fe09uav

 Target Server Version : 50619
 File Encoding         : utf-8

 Date: 09/18/2016 14:40:57 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `create_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  `sub_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '子标题',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('1', '深入浅出Node.js A5VbqsKPmA6r3Wxd', 'This is a article', '2016-05-06 17:46:19', '2016-05-06 17:46:19', '1'), ('27', '这是一篇技术文章1', '### Hello world!\r\n\r\n## 更新文章测试\r\n\r\n### 写写markdown\r\n\r\n\r\n```js\r\nvar i = 0;\r\n```', '2016-05-12 20:55:14', '2016-05-12 20:55:14', ''), ('28', 'asdsa ', '### Hello world!\r\n\r\n## 谢', '2016-05-12 20:56:23', '2016-05-12 20:56:23', ''), ('29', 'adasdsadsadsa', '### Hello world!', '2016-05-12 21:13:30', '2016-05-12 21:13:30', ''), ('119', 'test', '### Hello world!', '2016-05-18 14:18:17', '2016-05-18 14:18:17', '');
COMMIT;

-- ----------------------------
--  Table structure for `site`
-- ----------------------------
DROP TABLE IF EXISTS `site`;
CREATE TABLE `site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `about` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `sub_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `site`
-- ----------------------------
BEGIN;
INSERT INTO `site` VALUES ('4', 'hacke2\'s blog', 'hacke2@qq.com', 'e3ebc59501204a4a6b994df3889d81a2', '', '');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
