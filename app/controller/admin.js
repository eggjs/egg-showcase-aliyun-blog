'use strict';

const loginRule = {
  email: 'email',
  password: 'password',
};

exports.login = function* () {
  this.validate(loginRule);
  const email = this.request.body.email;
  const password = this.request.body.password;
  const login = yield this.service.site.login(email, password);

  if (login) {
    this.session.login = true;
    this.redirect('/manager');
  } else {
    yield this.render('admin/login.html', {
      msg: 'email or password is wrong',
    });
  }

};

exports.editor = function* () {
  const articleID = parseInt(this.query.articleID);
  let article = null;
  let isNew = true;

  if (articleID) {
    article = yield this.service.article.find(articleID);
  }

  if (articleID && article) {
    isNew = false;
  }
  yield this.render('admin/editor.html', {
    article,
    isNew,
    login: this.session.login,
  });

};

exports.manager = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  const result = yield {
    articles: this.service.article.list(pageNum, pageSize),
    count: this.service.article.count(),
  };

  yield this.render('admin/manager.html', Object.assign({
    pageNum,
    pageSize,
    login: this.session.login,
  }, result));
};
