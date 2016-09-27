'use strict';

const should = require('should');
const request = require('supertest');
const mm = require('egg-mock');
const utility = require('utility');
const pedding = require('pedding');

describe('test/article.test.js', function() {
  let app;
  let tempID = 0;
  const uid = utility.randomString();
  const tempTitle = `深入浅出Node.js ${uid}`;
  const tempSubTitle = '深入Node.js的模块机制';
  const tempContent = 'This is a article';

  before(function* () {

    app = mm.app();

    yield app.ready();

    const tempArticle = yield app.mysql.insert('article', {
      title: tempTitle,
      sub_title: tempSubTitle,
      content: tempContent,
      create_time: app.mysql.literals.now,
      modified_time: app.mysql.literals.now,
    });

    tempID = tempArticle.insertId;

    should.exist(app.mysql);
  });

  after(function* () {
    // 清空测试数据
    yield app.mysql.delete('article', {
      title: tempTitle,
    });
  });

  afterEach(mm.restore);

  it('新增一篇文章', done => {
    app.mockCsrf();
    request(app.callback())
      .post('/article')
      .send({
        title: tempTitle,
        sub_title: tempSubTitle,
        content: tempContent,
      })
      .expect(res => {
        res.text.should.be.exactly('Redirecting to <a href="/login">/login</a>.');
      })
      .expect(302, done);
  });

  it('删除一篇文章', done => {
    app.mockCsrf();
    app.mockSession({
      login: true,
    });
    request(app.callback())
      .delete('/article')
      .send({
        id: tempID,
      })
      .expect('true')
      .expect(200, done);
  });

  it('上传文件', done => {
    done = pedding(2, done);
    app.mockCsrf();
    request(app.callback())
      .post('/upload')
      .attach('avatar', 'app/public/images/home-bg.jpg')
      .expect(res => {
        const url = res.body.url;
        url.should.be.a.String;
        done();
      })
      .expect(200, done);
  });

});
