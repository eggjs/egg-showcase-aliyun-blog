'use strict';

const crypto = require('crypto');

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(name, email, password, about, sub_name) {
      // const md5Password = crypto.createHash('md5').update(password).digest('hex');

      const result = yield app.mysql.insert('site', {
        name,
        email,
        password,
        about,
        sub_name,
      });

      return result.affectedRows === 1;
    }

    // 获取站点信息
    * getSite() {
      const site = yield app.mysql.select('site', {
        limit: 1,
        offset: 0,
      });

      return site;
    }

    // 登陆
    * login(email, password) {
      const md5Password = crypto.createHash('md5').update(password).digest('hex');

      const user = yield app.mysql.select('site', {
        where: {
          email,
          password: md5Password,
        },
      });

      return user.length;
    }

    * count() {
      const count = yield app.mysql.query('select count(*) from site');

      return count[0]['count(*)'];
    }
  }
  return MonthServer;
};
