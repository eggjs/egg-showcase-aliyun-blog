'use strict';

exports.mysql = {
  // host
  host: '10.101.81.18',
  // 端口号
  port: '3306',
  // 用户名
  user: 'vytphpkj6g',
  // 密码
  password: 'l0ig9mwean',
  // 是否启用加密密码
  encryptPassword: false,
  // 数据库名
  database: 'aplpc94mfv212fe09uav',
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};

exports.oss = {
  accessKeyId: 'FpocUe4WzyL78acf',
  accessKeySecret: 'bUGh56j5lrmhAbN5ezEnF0XYxDNtw0',
  bucket: 'egg-showcase-aliyun-blog-test',
  endpoint: 'oss-cn-hangzhou-zmf.aliyuncs.com',
  timeout: '60s',
};

exports.userrole = {
  failureHandler(action) {
    switch (action) {
      case 'admin':
        this.status = 403;
        this.redirect('/login');
        break;
      default:
        break;
    }
  },
};

exports.onerror = {
  errorPageUrl: '/500',
};
