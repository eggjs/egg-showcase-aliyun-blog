'use strict';
const env = process.env;

exports.mysql = {
  client: {
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: '',
    database: 'test',
  },
};

exports.oss = {
  client: {
    accessKeyId: env.ALI_SDK_OSS_ID,
    accessKeySecret: env.ALI_SDK_OSS_SECRET,
    endpoint: env.ALI_SDK_OSS_ENDPOINT,
    bucket: 'ali-oss-test-bucket-test99',
  },
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
