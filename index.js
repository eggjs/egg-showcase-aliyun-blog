'use strict';

require('aliyun-egg').startCluster({
  baseDir: __dirname,
  workers: 1,
  port: process.env.PORT || 7001,
});
