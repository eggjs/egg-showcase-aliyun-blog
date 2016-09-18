'use strict';

const should = require('should');
const request = require('supertest');
const mm = require('egg-mock');
const utility = require('utility');

describe('test/site.test.js', function() {
  let app;
  const uid = utility.randomString();

  const tempName = `hacke2's blog ${uid}`;
  const tempEmail = 'hacke2cn_site.test.js@gmail.com';
  const tempPassword = '123456';

  before(function* () {

    app = mm.app();

    yield app.ready();

    should.exist(app.mysql);
  });

  after(function* () {
    // 清空测试数据
    yield app.mysql.delete('site', {
      name: tempName,
    });
  });

  afterEach(mm.restore);

  it('新增管理员', done => {
    app.mockCsrf();
    request(app.callback())
      .post('/install')
      .send({
        name: tempName,
        email: tempEmail,
        password: tempPassword,
      })
      .expect(res => {
        res.text.should.be.exactly('Redirecting to <a href="/manager">/manager</a>.');
      })
      .expect(302, done);
  });

  it('没有设置网站名会验证失败', done => {
    app.mockCsrf();
    request(app.callback())
      .post('/install')
      .send({
        email: tempEmail,
        password: tempPassword,
      })
      .expect(422, done);
  });

  it('500错误', done => {
    request(app.callback())
      .get('/article?id=null')
      .expect(500, done);
  });

  it('页面找不到404', done => {
    request(app.callback())
      .get('/nullPage')
      .expect(404, done);
  });

});
