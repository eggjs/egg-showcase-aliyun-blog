'use strict';

const should = require('should');
const request = require('supertest');
const mm = require('egg-mock');
const utility = require('utility');
const crypto = require('crypto');

describe('test/admin.test.js', function() {
  let app;
  const uid = utility.randomString();
  const tempName = `hacke2's blog ${uid}`;
  const tempEmail = 'hacke2cn_admin.test.js@gmail.com';
  const tempPassword = '123456';

  before(function* () {

    app = mm.app();

    yield app.ready();

    should.exist(app.mysql);

    const md5Password = crypto.createHash('md5').update(tempPassword).digest('hex');

    yield app.mysql.insert('site', {
      name: tempName,
      email: tempEmail,
      password: md5Password,
    });

  });

  after(function* () {
    yield app.mysql.delete('site', {
      name: tempName,
    });
  });

  afterEach(mm.restore);

  it('管理员登陆成功应该跳到Manager', done => {
    app.mockCsrf();
    request(app.callback())
      .post('/login')
      .send({
        email: tempEmail,
        password: tempPassword,
      })
      .expect(res => {
        res.text.should.be.exactly('Redirecting to <a href="/manager">/manager</a>.');
      })
      .expect(302, done);
  });

  it('管理员登陆失败应该跳到login', done => {
    app.mockCsrf();
    request(app.callback())
      .post('/login')
      .send({
        email: tempEmail,
        password: tempPassword + utility.randomString(),
      })
      .expect(res => {
        // 提示报错
        res.text.should.match(/email or password is wrong/i);
      })
      .expect(200, done);
  });

  it('管理员登陆用户名不能为空', done => {
    app.mockCsrf();
    request(app.callback())
      .post('/login')
      .send({
        password: tempPassword,
      })
      .expect(422, done);
  });

  it('管理员登陆用户名必须为邮箱', done => {
    app.mockCsrf();
    request(app.callback())
      .post('/login')
      .send({
        email: 'this is a string',
        password: tempPassword,
      })
      .expect(422, done);
  });

});
